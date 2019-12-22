require = require('esm')(module /*, options*/);  // TODO no more required with node 12+, see https://thecodebarbarian.com/nodejs-12-imports
require('./cli').cli(process.argv);
