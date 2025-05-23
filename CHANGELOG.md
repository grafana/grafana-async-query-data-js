# Change Log

All notable changes to this project will be documented in this file.

## v0.4.2

- Bump the all-node-dependencies group across 1 directory with 25 updates in [#78](https://github.com/grafana/grafana-async-query-data-js/pull/78)
- Chore: Use npm_token from vault in [#77](https://github.com/grafana/grafana-async-query-data-js/pull/77)
- add zizmor ignore rule in [#76](https://github.com/grafana/grafana-async-query-data-js/pull/76)
- Use vault to generate token in [#75](https://github.com/grafana/grafana-async-query-data-js/pull/75)
- Cleanup github actions files in [#74](https://github.com/grafana/grafana-async-query-data-js/pull/74)
- Bump the all-node-dependencies group across 1 directory with 5 updates in [#65](https://github.com/grafana/grafana-async-query-data-js/pull/65)

## v0.4.1

- Bump the all-node-dependencies group across 1 directory with 15 updates in https://github.com/grafana/grafana-async-query-data-js/pull/62
- Chore: add label to external contributions in https://github.com/grafana/grafana-async-query-data-js/pull/61
- Bump node dependencies with 23 updates. Migrate to eslint 9 and add react major versions to dependabot ignore in https://github.com/grafana/grafana-async-query-data-js/pull/57

## v0.4.0

- Use super.query in https://github.com/grafana/grafana-async-query-data-js/pull/29
- Bump cross-spawn from 7.0.3 to 7.0.6 in the npm_and_yarn group in https://github.com/grafana/grafana-async-query-data-js/pull/44
- Bump micromatch from 4.0.5 to 4.0.8 in the npm_and_yarn group in https://github.com/grafana/grafana-async-query-data-js/pull/38
- Bump ws from 8.12.0 to 8.18.0 in the npm_and_yarn group in https://github.com/grafana/grafana-async-query-data-js/pull/39
- Bump ua-parser-js from 1.0.32 to 1.0.39 in the npm_and_yarn group in https://github.com/grafana/grafana-async-query-data-js/pull/37
- Bump tough-cookie from 4.1.2 to 4.1.4 in the npm_and_yarn group in https://github.com/grafana/grafana-async-query-data-js/pull/36
- Bump braces from 3.0.2 to 3.0.3 in the npm_and_yarn group in https://github.com/grafana/grafana-async-query-data-js/pull/35
- Bump the all-dependencies group across 1 directory with 9 updates in https://github.com/grafana/grafana-async-query-data-js/pull/40
- Bump the all-dependencies group with 4 updates in https://github.com/grafana/grafana-async-query-data-js/pull/32

## v0.3.0

- Chore: update deps in https://github.com/grafana/grafana-async-query-data-js/pull/31

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
