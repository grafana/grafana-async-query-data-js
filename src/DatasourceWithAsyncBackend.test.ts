import { DataQuery, DataSourceInstanceSettings, PluginType, getDefaultTimeRange } from '@grafana/data';
import { DatasourceWithAsyncBackend } from './DatasourceWithAsyncBackend';

const defaultInstanceSettings: DataSourceInstanceSettings<{}> = {
  id: 1,
  uid: 'test',
  type: 'test',
  name: 'test',
  meta: {
    id: 'test',
    name: 'test',
    type: PluginType.datasource,
    info: {
      author: {
        name: 'test',
      },
      description: 'test',
      links: [],
      logos: {
        large: '',
        small: '',
      },
      screenshots: [],
      updated: '',
      version: '',
    },
    module: '',
    baseUrl: '',
  },
  access: 'direct',
  jsonData: {},
};
const defaultQuery = { refId: 'refId-1' };
const defaultQuery2 = { refId: 'refId-2' };
const defaultRequest = {
  requestId: 'requestId',
  interval: '1',
  intervalMs: 1,
  range: getDefaultTimeRange(),
  scopedVars: {},
  targets: [defaultQuery, defaultQuery2],
  timezone: 'utc',
  app: 'test',
  startTime: 0,
};

const setupDatasourceWithAsyncBackend = ({
  settings = defaultInstanceSettings,
  asyncQueryDataSupport = true,
}: {
  settings?: DataSourceInstanceSettings<{}>;
  asyncQueryDataSupport?: boolean;
}) => new DatasourceWithAsyncBackend<DataQuery>(settings, asyncQueryDataSupport);

describe('DatasourceWithAsyncBackend', () => {
  it('can store running queries', () => {
    const ds = setupDatasourceWithAsyncBackend({});

    ds.storeQuery(defaultQuery, { queryID: '123' });
    expect(ds.getQuery(defaultQuery)).toEqual({ queryID: '123' });
  });

  it('can remove running queries', () => {
    const ds = setupDatasourceWithAsyncBackend({});

    ds.storeQuery(defaultQuery, { queryID: '123' });
    expect(ds.getQuery(defaultQuery)).toEqual({ queryID: '123' });
    ds.removeQuery(defaultQuery);
    expect(ds.getQuery(defaultQuery)).toEqual({});
  });

  it('can cancel running queries', () => {
    const ds = setupDatasourceWithAsyncBackend({});

    ds.storeQuery(defaultQuery, { queryID: '123' });
    ds.cancel(defaultQuery);
    expect(ds.getQuery(defaultQuery)).toEqual({ queryID: '123', shouldCancel: true });
  });

  it('can queue individual queries to run asynchronously', () => {
    const ds = setupDatasourceWithAsyncBackend({});

    ds.doSingle = jest.fn().mockReturnValue(Promise.resolve({ data: [] }));
    expect(ds.doSingle).not.toHaveBeenCalled();
    ds.query(defaultRequest);
    expect(ds.doSingle).toHaveBeenCalledTimes(2);
    expect(ds.doSingle).toHaveBeenCalledWith(defaultQuery, defaultRequest);
    expect(ds.doSingle).toHaveBeenCalledWith(defaultQuery2, defaultRequest);
  });
});
