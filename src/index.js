// Entrypoint for production mode only (ie running with build bundle). Otherwise see server.ts
 
// @babel/polyfill is now deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) 
// and regenerator-runtime/runtime (needed to use transpiled generator functions):
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { argv } from 'process';

import { cli } from './cli';

cli(argv);
