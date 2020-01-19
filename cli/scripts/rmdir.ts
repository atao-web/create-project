/**
 *   Required under Windows, as rimraf can't delete itself under folder ./node_modules
 */
import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { argv, env, exit } from 'process';
console.log("rmdir, argv.slice(2)[0]: ", argv.slice(2)[0])
const folderPath = argv.slice(2)[0] || env.DIR || 'node_modules/';

if (!existsSync(folderPath)) {
    exit(0); // nothing to do...
}

if (!lstatSync(folderPath).isDirectory()) {
    exit(1); // do nothing!
}

function folderDeepDelete(folderPath: string) {
    const subfiles = readdirSync(folderPath);
    subfiles.forEach(filename => {
        const curPath = join(folderPath, filename);
        const doit = lstatSync(curPath).isDirectory() ? folderDeepDelete : unlinkSync;
        doit(curPath);
    });
    rmdirSync(folderPath);
}

folderDeepDelete(folderPath);
