import { expect } from 'chai';
import { existsSync, readFileSync } from 'fs';
import { describe, it } from 'mocha';
import { join } from 'path';
import { env } from 'process';

import { ENTER, execute as run } from './cmd';

const LIB_DIR = join(__dirname, env.APP_CODE_PATH || '../../dist');
const TARGET_DIR = join(__dirname, env.PROJECT_TARGET_PATH || '../.tmp-dir');

describe('The create project CLI', () => {

    it("should display the 'DONE' message", function (done) {

        const script = `${LIB_DIR}`; // ie index.js

        const args = { app: ['', TARGET_DIR] };  // template and target subdirectories

        const userInputs = [
            '1',                  // Please choose which project template to use
            ENTER,
            'y',                  // Should a git be initialized?
            ENTER,
            ENTER
        ];

        const options = {
            // env: { DEBUG: true },  // false by default
            // timeout: 200,          // 100 ms by default
            // maxTimeout: 0          // 10 s by default; if "0" then no timeout
        };

        run(
            script,
            args,
            userInputs,
            options
        )
            .then((result: string) => {

                const foundRegex = new RegExp('^DONE\\s+Project\\s+ready', 'm');

                expect(result).to.match(foundRegex);
                done();
            })
            .catch(err => done(err));
    });

    it("should keep the template file .gitignore as it", function (done) {
        const script = `${LIB_DIR}`; // ie index.js

        const args = { app: ['', TARGET_DIR] };  // template and target subdirectories

        const userInputs = [
            '1',                  // Please choose which project template to use
            ENTER,
            'y',                  // Should a git be initialized?
            ENTER,
            ENTER
        ];

        const options = {
            // env: { DEBUG: true },  // false by default
            // timeout: 200,          // 100 ms by default
            // maxTimeout: 0          // 10 s by default; if "0" then no timeout
        };

        run(
            script,
            args,
            userInputs,
            options
        )
            .then(() => {
                expect(existsSync(join(TARGET_DIR, '.gitignore'))).to.be.true;
                expect(readFileSync(join(TARGET_DIR, '.gitignore'), { encoding: 'utf8' })).to.be.equal("node_modules/");
                done();
            })
            .catch(err => done(err));

    });

});