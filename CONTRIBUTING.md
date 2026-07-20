# Contributing Docs

## Local Dev

Want to install this repo locally?

- In the terminal where this repo is installed: `npm run dev` or `npm run build`
- In the terminal where this repo is installed, run `npm link`
- In a terminal navigate to your consumer directory (ex athena) and run `npm link @grafana/async-query-data`

## Releasing

To release a new version of the package, commit the updated "version" field into main, which will trigger the [Release action](https://github.com/grafana/grafana-async-query-data-js/actions/workflows/release.yml) which publishes to npm and creates a github release with release notes.
