import React from 'react';
import { render, screen } from '@testing-library/react';

import { DataQuery } from '@grafana/data';
import { RunQueryButtons, RunQueryButtonsProps } from './RunQueryButtons';

const getDefaultProps = (overrides: Partial<RunQueryButtonsProps<DataQuery>>) => {
  return {
    onRunQuery: jest.fn(),
    onCancelQuery: jest.fn(),
    isQueryValid: jest.fn(),
    query: { refId: 'refId' },
    ...overrides,
  };
};

describe('RunQueryButtons', () => {
  it('disable the run button if the query is invalid', () => {
    const props = getDefaultProps({ isQueryValid: jest.fn().mockReturnValue(false) });
    render(<RunQueryButtons {...props} />);
    const runButton = screen.getByRole('button', { name: 'Run' });
    expect(runButton).toBeDisabled();
  });

  it('run button should be enabled if the query is valid', () => {
    const props = getDefaultProps({ isQueryValid: jest.fn().mockReturnValue(true) });
    render(<RunQueryButtons {...props} />);
    const runButton = screen.getByRole('button', { name: 'Run' });
    expect(runButton).not.toBeDisabled();
  });
});
