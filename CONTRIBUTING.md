# Contributing Docs

## Local Dev

Want to install this repo locally?

- In the terminal where this repo is installed: `yarn run dev` or `yarn run build`
- In a terminal navigate to your consumer directory (ex athena) and run `yarn --version`
  - if you get a yarn version <2:
    - back in aws-sdk run `yarn link` copy the instructions
    - run those instructions in the external consumer (athena)
  - if you get a yarn version >2:
    - in consumer package (ex grafana) `yarn link path-to-sdk` it should add a portal resolution to your package.json

## Creating a Release

Creating a new release requires running the [NPM bump version action](https://github.com/grafana/grafana-async-query-data-js/actions/workflows/npm-bump-version.yml). Click `Run workflow` and specify the type of release (patch, minor, or major). The workflow will update package.json, commit and push which will trigger the [Create Release action](https://github.com/grafana/grafana-async-query-data-js/actions/workflows/create-release.yml) which publishes to npm and creates a github release with release notes.
