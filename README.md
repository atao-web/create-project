# `@atao60/create-project`

🏗 A personal CLI to bootstrap new projects. It offers the choice between three templates:
- Javascript
- Typescript
- [dummy-startup-kit](https://github.com/atao-web/dummy-startup-kit)

The first two ones are embedded: they can be installed only with the present stater kit.

The last one is a standalone boilerplate. It can also be installed with `git clone`.

None of them are production ready. They are just proofs of concept for this CLI npm package.

> Under branch [babel7-ts](tree/babel7-ts) is available a version rewritten with [Typescript](https://www.typescriptlang.org/) and [Ecmascript 2018](http://ecma-international.org/ecma-262/9.0/) working together, thanks to [Babel 7](https://babeljs.io/docs/en/).

### Prerequisites 

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

## Installation & Usage

Using package published on npm repo:

```bash
npm init @atao60/project
### or
npx @atao60/create-project
### or
npm install -g @atao60/create-project
create-project
```
> The first two ones work without installing locally the package `@atao60/create-project`.


## Development

### Install & watch changes

```bash

npm uninstall -g @atao60/create-project ### if needed; required to avoid any issue with `npm link`, see below

git clone https://github.com/atao-web/create-project.git atao60-create-project

cd atao60-create-project

git checkout ts-babel7

npm install

# npm outdated

# npm audit

# npx depcheck

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

```bash

npm version patch ### if wished, use 'minor' or 'major' in place of 'patch'

npm publish

### check that everything is fine:

rm -rf tmp-dir && mkdir tmp-dir && cd tmp-dir

npx @atao60/create-project

ls -al

```

## License

[MIT](./LICENSE)

## Collaborators

- Dominik Kundel <hi@dominik.dev>
- Pierre Raoul <atao60.web@gmail.com>

## Credits

* [How to build a CLI with Node.js](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js), Dominik Kundel, 2019-03-19
