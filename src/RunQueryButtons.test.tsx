import React from 'react';
import { render, screen } from '@testing-library/react';

import { DataQuery } from '@grafana/data';
import { RunQueryButtons, RunQueryButtonsProps } from './RunQueryButtons';

const getDefaultProps = (overrides?: Partial<RunQueryButtonsProps<DataQuery>>) => {
  return {
    onRunQuery: jest.fn(),
    onCancelQuery: jest.fn(),
    enableRun: true,
    query: { refId: 'refId' },
    ...overrides,
  };
};

describe('RunQueryButtons', () => {
  it('disable the run button if the query is invalid', () => {
    const props = getDefaultProps({ enableRun: false});
    render(<RunQueryButtons {...props} />);
    const runButton = screen.getByRole('button', { name: 'Run query' });
    expect(runButton).toBeDisabled();
  });

  it('run button should be enabled if the query is valid', () => {
    const props = getDefaultProps({ enableRun: true});
    render(<RunQueryButtons {...props} />);
    const runButton = screen.getByRole('button', { name: 'Run query' });
    expect(runButton).not.toBeDisabled();
  });

  it('only renders the `Run` button if onCancelQuery is undefined', () => {
    const props = getDefaultProps({ onCancelQuery: undefined });
    render(<RunQueryButtons {...props} />);
    const runButton = screen.getByRole('button', { name: 'Run query' });
    expect(runButton).toBeInTheDocument();
    const stopButton = screen.queryByRole('button', { name: 'Stop query' });
    expect(stopButton).not.toBeInTheDocument();
  });

  it('renders the `Run` and `Stop` buttons if onCancelQuery defined', () => {
    const props = getDefaultProps();
    render(<RunQueryButtons {...props} />);
    const runButton = screen.getByRole('button', { name: 'Run query' });
    expect(runButton).toBeInTheDocument();
    const stopButton = screen.queryByRole('button', { name: 'Stop query' });
    expect(stopButton).toBeInTheDocument();
  });
});
