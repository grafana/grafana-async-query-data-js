# Change Log

All notable changes to this project will be documented in this file.

## v0.2.0

- Remove athenaAsyncQueryDataSupport and redshiftAsyncQueryData feature toggle-related code

## v0.1.11

- Support Node 18 (#25)
- Fix workflows (#26)
- Fix running multiple async datasources (#27)

## v0.1.10

- Fix minimum query time (#22)

## v0.1.9

- Fix github publish with output from previous step (#21)

## v0.1.8

- Update github release workflow (#20)

## v0.1.7

- Don't set cache-skip header if async caching enabled (#17)

## v0.1.5

- Update npm-bump-version.yml (#15)
- Fix yarn dev script (#13)
- Add error catch to results of backend response (#12)
- Add missing test (#11)

## v0.1.4

- Modify query buttons into header buttons

## v0.0.1

- Add `DatasourceWithAsyncBackend` class to handle async query flow on the frontend
- Add `RunQueryButtons` component for running and stopping queries
