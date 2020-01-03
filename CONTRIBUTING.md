## Prerequisites 

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/download/)
* [Npm](https://www.npmjs.com/) - comes with Node.js
* [Npx](https://github.com/npm/npx#readme) - comes with Node.js

The shell used here is [Bash](https://www.gnu.org/software/bash/) under [Linux](https://www.linuxfoundation.org/). However it should be straightforward to work under any other usual OS as eg Windows or Mac OS X.

Check prerequisites' status:
```bash
npm doctor # will show information about git, node, npm...
git --version
npm list -g --depth 0 2>&1 | grep create-project # (°)
```

> (°) replace `2>&1 | grep ...` by its counterpart under Windows or Mac OS X

## Development

### Fork

```bash
npm uninstall -g @atao60/create-project ### if needed; required to avoid any issue with `npm link`, see below

# git clone https://github.com/atao-web/create-project.git atao60-create-project

git clone <my-forked-repo> atao60-create-project

cd atao60-create-project

git checkout ts-babel7

npm install

# npm outdated

# npm audit

# npx depcheck

git checkout -b my-branch

```

### Watch changes

```bash

git checkout my-branch

sudo npm link

npm run test:watch ### will rebuild after each code change
```

### Usage

Doing it from an other console (°), use package from local repository:

```bash

create-project

```

> (°) Under any wished location, even the directory `atao60-create-project` above. 

### Publish

![WARNING: Don't do it](https://via.placeholder.com/500x50/FF0000/FFFFFF?text=WARNING:+Don't+do+it!)

That is... don't do as me with the present package! :innocent: See [Pull Request](#pull-request) below.

If you want to go forward:
- either you have the access rights for the package on the npm public registry and for the non forked repository on github, then:
  - reset the remote's URL to the non forked repository;
- or you own a personal account on the npm public registry, then:
  - change the name of this forked package to create a new package with this name on the npm public registry.

```bash

git checkout my-branch

# jq '.name="new-npm-package-name"' package.json | sponge package.json ### to be done once before the first publish if in the latter case above

npm version patch ### if wished, use 'minor' or 'major' in place of 'patch'

npm publish

### check that everything is fine:

rm -rf tmp-dir && mkdir tmp-dir && cd tmp-dir

npx @atao60/create-project  ### or 'new-npm-package-name' if in the latter case above

ls -al

```

### Pull request

From the forked repository where some changes have been made on the branch 'my-branch' and <ins>all of them commited</ins>:

```bash

git checkout my-branch

git push origin my-branch

```
Lastly open a pull request on Github.

### Miscellaneous

The main available npm scripts are:

- `npm run build` - create build,
- `npm run refresh` - removes node modules, package-lock.json, dist and re-installs everything,
- `npm run lint` - check of code syntax,
- `npm run test:watch` - rerun build and test after any code changes and made them available through `npm link`.
