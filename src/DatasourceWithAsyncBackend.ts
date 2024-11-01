import {
  DataFrame,
  DataQuery,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceInstanceSettings,
  DataSourceJsonData,
} from '@grafana/data';
import {
  BackendDataSourceResponse,
  DataSourceWithBackend,
  config,
  getBackendSrv,
  toDataQueryResponse,
} from '@grafana/runtime';
import { merge, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getRequestLooper } from './requestLooper';

export interface CustomMeta {
  queryID: string;
  status: string;
}

export interface RunningQueryInfo {
  queryID?: string;
  shouldCancel?: boolean;
}

interface DataQueryMeta {
  meta?: { queryFlow?: 'async' | 'sync' };
}

const RUNNING_STATUSES = ['started', 'submitted', 'running'];
const isRunning = (status = '') => RUNNING_STATUSES.includes(status);
const isCustomMeta = (meta: unknown): meta is CustomMeta => {
  return !!(typeof meta === 'object' && meta?.hasOwnProperty('queryID') && meta?.hasOwnProperty('status'));
};

export class DatasourceWithAsyncBackend<
  TQuery extends DataQuery = DataQuery,
  TOptions extends DataSourceJsonData = DataSourceJsonData,
> extends DataSourceWithBackend<TQuery, TOptions> {
  private runningQueries: { [hash: string]: RunningQueryInfo } = {};
  private requestCounter = 100;
  private requestIdPrefix: number;

  constructor(instanceSettings: DataSourceInstanceSettings<TOptions>) {
    super(instanceSettings);
    this.requestIdPrefix = instanceSettings.id;
  }

  query(request: DataQueryRequest<TQuery>): Observable<DataQueryResponse> {
    const targets = this.filterQuery ? request.targets.filter(this.filterQuery) : request.targets;
    if (!targets.length) {
      return of({ data: [] });
    }
    const all: Array<Observable<DataQueryResponse>> = [];
    for (let target of targets) {
      if (target.hide) {
        continue;
      }
      all.push(this.doSingle(target, request));
    }
    return merge(...all);
  }

  storeQuery(target: TQuery, queryInfo: RunningQueryInfo) {
    const key = JSON.stringify(target);
    const existingQueryInfo = this.runningQueries[key] || {};
    this.runningQueries[key] = { ...existingQueryInfo, ...queryInfo };
  }

  getQuery(target: TQuery) {
    const key = JSON.stringify(target);
    return this.runningQueries[key] || {};
  }

  removeQuery(target: TQuery) {
    const key = JSON.stringify(target);
    delete this.runningQueries[key];
  }

  doSingle(target: TQuery, request: DataQueryRequest<TQuery>): Observable<DataQueryResponse> {
    let queryID: string | undefined = undefined;
    let status: string | undefined = undefined;
    let allData: DataFrame[] = [];

    return getRequestLooper(
      { ...request, targets: [target], requestId: `${this.requestIdPrefix}_${this.requestCounter++}` },
      {
        /**
         * Additional query to execute if the current query is still in a running state
         */
        getNextQuery: (rsp: DataQueryResponse) => {
          if (rsp.data?.length) {
            const first: DataFrame = rsp.data[0];
            const meta = first.meta?.custom;

            if (isCustomMeta(meta) && isRunning(meta.status)) {
              queryID = meta.queryID;
              status = meta.status;
              this.storeQuery(target, { queryID });
              return { ...target, queryID };
            }
          }

          this.removeQuery(target);
          return undefined;
        },

        /**
         * The original request
         */
        query: (request: DataQueryRequest<TQuery>) => {
          const { range, targets, requestId, intervalMs, maxDataPoints } = request;
          const [_query] = targets;
          const query: TQuery & DataQueryMeta = {
            ..._query,
            meta: { queryFlow: 'async' },
          };

          const data = {
            queries: [
              {
                ...query,
                intervalMs,
                maxDataPoints,
                // getRef optionally chained to support < v8.3.x of Grafana
                datasource: this?.getRef(),
                datasourceId: this.id,
                ...this.applyTemplateVariables(query, request.scopedVars),
              },
            ],
            range: range,
            from: range.from.valueOf().toString(),
            to: range.to.valueOf().toString(),
          };

          let headers = {};
          const cachingDisabled = !config.featureToggles.awsAsyncQueryCaching;
          if (cachingDisabled && isRunning(status)) {
            // bypass query caching for Grafana Enterprise to
            // prevent an infinite loop
            headers = { 'X-Cache-Skip': true };
          }
          const options = {
            method: 'POST',
            url: '/api/ds/query',
            data,
            requestId,
            headers,
          };

          return getBackendSrv()
            .fetch<BackendDataSourceResponse>(options)
            .pipe(
              map((result) => ({ data: toDataQueryResponse(result).data })),
              catchError((err) => {
                return of(toDataQueryResponse(err));
              })
            );
        },

        /**
         * Process the results
         */
        process: (data: DataFrame[]) => {
          for (const frame of data) {
            if (frame.fields.length > 0) {
              allData.push(frame);
            }
          }

          return allData;
        },

        shouldCancel: () => {
          const { shouldCancel } = this.getQuery(target);
          return !!shouldCancel;
        },

        /**
         * Callback that gets executed when unsubscribed
         */
        onCancel: () => {
          if (queryID) {
            this.removeQuery(target);
            this.postResource('cancel', {
              queryId: queryID,
            }).catch((err) => {
              err.isHandled = true; // avoid the popup
              console.error(`error cancelling query ID: ${queryID}`, err);
            });
          }
        },
      }
    );
  }

  // cancel sets shouldCancel to tell requestLooper to cancel the query
  cancel = (target: TQuery) => {
    this.storeQuery(target, { shouldCancel: true });
  };
}
