import React, { useEffect, useState } from 'react';
import { Button } from '@grafana/ui';
import { DataQuery, LoadingState } from '@grafana/data';

export interface RunQueryButtonsProps<TQuery extends DataQuery> {
  enableRun?: boolean;
  onRunQuery: () => void;
  onCancelQuery: (query: TQuery) => void;
  query: TQuery;
  state?: LoadingState;
}

export const RunQueryButtons = <TQuery extends DataQuery>(props: RunQueryButtonsProps<TQuery>) => {
  const { state } = props;
  const [running, setRunning] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [lastState, setLastState] = useState(state);
  const [lastQuery, setLastQuery] = useState(props.query);

  useEffect(() => {
    if (state && lastState !== state && state !== LoadingState.Loading) {
      setRunning(false);
      setStopping(false);
    }

    setLastState(state);
  }, [state, lastState]);

  const onRunQuery = () => {
    setRunning(true);
    setLastQuery(props.query);
    props.onRunQuery();
  };

  const onCancelQuery = props.onCancelQuery
    ? () => {
        props.onCancelQuery?.(lastQuery);
        setStopping(true);
      }
    : undefined;

  return (
    <>
      <Button
        variant={props.enableRun ? 'primary' : 'secondary'}
        size="sm"
        onClick={onRunQuery}
        icon={running && !stopping ? 'fa fa-spinner' : undefined}
        disabled={state === LoadingState.Loading || !props.enableRun}
      >
        Run query
      </Button>
      <Button
        variant={running && !stopping ? 'primary' : 'secondary'}
        size="sm"
        disabled={!running || stopping}
        icon={stopping ? 'fa fa-spinner' : undefined}
        onClick={onCancelQuery}
      >
        Stop query
      </Button>
    </>
  );
};
