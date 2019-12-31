# `@atao60/create-project`

🏗 A personal CLI to bootstrap new projects. It offers the choice between three templates:
- Javascript
- Typescript
- [dummy-startup-kit](https://github.com/atao-web/dummy-startup-kit)

The first two ones are embedded: they can be installed only with the present stater kit.

The last one is a standalone boilerplate. It can also be installed with `git clone`.

None of them are production ready. They are just proofs of concept for this CLI npm package.

> Under branch [babel7-ts](tree/babel7-ts) is available a version rewritten with [Typescript](https://www.typescriptlang.org/) and [Ecmascript 2018](http://ecma-international.org/ecma-262/9.0/) working together, thanks to [Babel 7](https://babeljs.io/docs/en/).

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

## Development

### Install & watch changes

```bash

npm uninstall -g @atao60/create-project ### if needed

git clone https://github.com/atao-web/create-project.git atao60-create-project

cd atao60-create-project

# rm -f package-lock.json ### only if upgrading dependencies is requiered

npm install

sudo npm link

npm start ### will rebuild after each code change

rm -rf ../tmp-dir && mkdir ../tmp-dir && cd ../tmp-dir

create-project ### any code change will be taken in account immediatly at each launch

```

### Test

***TBD***

### Publish

```bash

npm build ### will build, ready to be published on npm repo

npm publish ### will build and publish on npm repo

rm -rf ../tmp-dir && mkdir ../tmp-dir && cd ../tmp-dir

npx @atao60/create-project ### to used the published package without installing it locally

```

## License

[MIT](./LICENSE)

## Collaborators

- Dominik Kundel <hi@dominik.dev>
- Pierre Raoul <atao60.web@gmail.com>

## Credits

* [How to build a CLI with Node.js](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js), Dominik Kundel, 2019-03-19
