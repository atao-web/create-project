# @atao60/create-project as a monorepo

See [readme](cli/README.md).

The [cli](cli) itself is now defined as a [workspace](https://yarnpkg.com/lang/en/docs/workspaces/) with [Yarn](https://yarnpkg.com).

The templates are still under a sub-folder of the cli.

## Yarn & Npx

All the documentation of this project assumes that [yarn](https://yarnpkg.com) is installed as `global`.

But it's not required as far as a recent version of [npm](https://www.npmjs.com/) is available. [Npx](https://github.com/npm/npx#readme) can then be used to launch [yarn](https://yarnpkg.com), eg: `npx yarn install`.

