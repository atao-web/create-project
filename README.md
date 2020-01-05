# @atao60/create-project

<span style="font-size:2em;">🏗</span> A personal CLI to bootstrap new projects. It offers the choice between three templates:
- Javascript
- Typescript
- [dummy-startup-kit](https://github.com/atao-web/dummy-startup-kit)

The first two ones are embedded: they can be installed only with the present starter kit.

The last one is a standalone boilerplate. It can also be installed with `git clone`.

None of them are production ready. They are just proofs of concept for this CLI npm package. 

## 💡 Rational

This CLI itself is a [sandbox](tree/ts-babel7) for: 
- [Typescript](https://www.typescriptlang.org/) and [Ecmascript 2018](http://ecma-international.org/ecma-262/9.0/) working together, thanks to [Babel 7](https://babeljs.io/docs/en/);
- Integration tests with [Mocha](https://mochajs.org/) and [spawn](https://www.npmjs.com/package/cross-spawn).

This [sandbox](tree/ts-babel7) is a fork of Dominik Kundel's [create-project](https://github.com/dkundel/create-project).

## 🏁 Quickstart

Install `@atao60/create-project` as a global CLI:

```bash
npm install -g @atao60/create-project

create-project
```

Or just use it via `npx` (or `npm init`):

```bash
npx @atao60/create-project

### or 

# npm init @atao60/project
```

This will start the CLI and ask for questions about which template to duplicate and how to customize it!

## 🛠️ Development

See [Contributing](./CONTRIBUTING.md).

## ⚖️ License

[MIT](./LICENSE)

## ☕ Collaborators

- Initial [code](https://github.com/dkundel/create-project): Dominik Kundel <hi@dominik.dev> 
- Current [sandbox](tree/ts-babel7): Pierre Raoul <atao60.web@gmail.com>

## 📜 Credits

* [How to build a CLI with Node.js](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js), Dominik Kundel, 2019-03-19

See also [other credits](./CREDITS.md).