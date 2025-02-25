Welcome!

## Prerequisites 

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/download/)
* [Npm](https://www.npmjs.com/) - comes with Node.js
* [Npx](https://github.com/npm/npx#readme) - comes with Node.js

and possibly:
* a [GitHub account](https://github.com/)

The shell used here is [Bash](https://www.gnu.org/software/bash/) under [Linux](https://www.linuxfoundation.org/). However it should be straightforward to work under any other usual OS as Windows or Mac OS X.

Check prerequisites' status:
```bash
npm doctor # will show information about git, node, npm...
git --version
npm list -g --depth 0 2>&1 | grep create-project # (°)
```

> (°) replace `2>&1 | grep ...` by its counterpart under Windows or Mac OS X

## Development

### Main scripts

The main available npm scripts are:

- `npm run build` - create a production ready build,
- `npm version <new version>` - check as much as possible before pushing with the new version
- `npm run clean` - remove temporary folders as dist, .build, ...
- `npm run refresh` - remove node modules, package-lock.json, dist, ... and re-installs upgraded dependencies,
- `npm run lint` - check of code,
- `npm run test:dev:watch` - rerun build and test after any code changes and made them available through `npm link`.

The scripts `start` and `test` are aliases for `test:dev:watch`.

### Fork

```bash
npm uninstall -g @atao60/create-project ### if needed; required to avoid any issue with `npm link`, see below

git clone https://github.com/atao-web/create-project.git atao60-create-project

cd atao60-create-project

git checkout ts-babel7

npm install

# npm outdated

# npm audit

# npx depcheck

```

### Watch changes

```bash

sudo npm link

npm start ### will rebuild and test after each code change
```

### Usage

Doing it from an other console (°), use package from local repository:

```bash

create-project

```

> (°) Under any wished location, even the directory `atao60-create-project` above. 

### Pull request

```bash

pwd  ### checking if in the forked project folder
# <path to>/atao60-create-project

git checkout ts-babel7

git checkout -b my-branch

### do here the wanted changes

git add --all

git commit -m "closing pull request message"

git push origin my-branch

```
Lastly open a pull request on Github.

### Publish

To publish, you must have the access rights for:
- the package on the [npm](https://www.npmjs.com/) public registry, ie [@atao60/create-project](https://www.npmjs.com/package/@atao60/create-project),
- the repository on [Github](https://github.com), ie [atao-web/create-project](https://github.com/atao-web/create-project).

> The script `npm run version` will push a new version in `package.json` and a new tag with this version as label.

```bash

git checkout my-branch

npm version patch ### if wished, use 'minor' or 'major' in place of 'patch'

npm publish

### check that everything is fine:

cd <any suitable folder>

npx @atao60/create-project


```
