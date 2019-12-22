import chalk from 'chalk';
import execa from 'execa';
import { accessSync, constants, createWriteStream, existsSync, writeFile as fsWriteFile } from 'fs';
import { writeFile as gitignoreWriteFile } from 'gitignore';
import http from 'http';
import https from 'https';
import Listr from 'listr';
import ncp from 'ncp';
import { basename, dirname, join, resolve } from 'path';
import { projectInstall } from 'pkg-install';
import { licenseText } from 'spdx-license-list/licenses/MIT';
import { promisify } from 'util';
import { cwd, exit } from 'process';

import { templateDefs } from './config';

const writeFile = promisify(fsWriteFile);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignoreWriteFile);

const request = async (url, postData) => {

  const lib = (url.search(/^\s*https:\/\//) > -1) ? https : http;

  return new Promise((resolve, reject) => {
    const req = lib.request(url, res => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`Status Code: ${res.statusCode}`));
      }

      const data = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => resolve(Buffer.concat(data).toString()));
    });

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};

/* Don't rely on racing between tasks to ensure copy of the right files for gitignore and license
 * then use of execa.sync here
 */
async function cloneGit(options) {
  const gitRepo = options.templateDirectory;
  const targetSubDir = basename(options.targetDirectory);
  const workingDir = dirname(options.targetDirectory);
  const { failed } = execa.sync('git', ['clone', gitRepo, targetSubDir], {
    cwd: workingDir,
    // detached: true,
    // stdio: "inherit"  // to be used to get the messages from git itself
  })
  if (failed) {
    return Promise.reject(new Error('Failed to clone git repository'));
  }
}

async function copyTemplateFiles(options, embedded = true) {
  if (embedded) {
    return copy(options.templateDirectory, options.targetDirectory, {
      clobber: false
    });
  } else {
    return cloneGit(options);
  }
}

async function createGitignore(options) {
  const targetFilePath = join(options.targetDirectory, '.gitignore');
  if (existsSync(targetFilePath)) {
    console.log('%s already existing gitignore file: keep as it', chalk.yellow.bold('WARNING'));
    return;
  }

  const file = createWriteStream(
    targetFilePath,
    { flags: 'wx' }  // belt & suspenders...
  );
  return writeGitignore({
    type: 'Node',
    file: file,
  });
}

function copyrightYears(creationYear) {
  const now = new Date().getFullYear();
  const firstYear = +(creationYear || now);
  const prefix = now > firstYear ? firstYear + " - " : "";
  return prefix + now;
}

async function createLicense(options) {
  const targetFilePath = join(options.targetDirectory, 'LICENSE');
  if (existsSync(targetFilePath)) {
    console.log('%s already existing license file: keep as it', chalk.yellow.bold('WARNING'));
    return;
  }

  const licenseContent = licenseText
    .replace('<year>', copyrightYears(options.creationYear))
    .replace('<copyright holders>', `${options.copyrightHolders}`);
  try {
    return await writeFile(targetFilePath, licenseContent, {
      encoding: 'utf8',
      flag: 'wx'  // belt & suspenders...
    });
  } catch (e) {
    console.log('%s license file not created or kept as it', chalk.yellow.bold('WARNING'));
  }
}

async function initGit(options) {
  const targetFilePath = join(options.targetDirectory, '.git');
  if (existsSync(targetFilePath)) {
    console.log('%s already existing license file: keep as it', chalk.yellow.bold('WARNING'));
    return;
  }

  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
  return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || cwd(),
    copyrightHolders: 'Pierre Raoul',
    creationYear: 2019
  };

  const templateTag = templateDefs.findTag(options.template);
  const template = templateDefs[templateTag];

  const currentFileUrl = import.meta.url;
  const templateDir = template && template.url ? template.url : resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    templateTag
  );
  options.templateDirectory = templateDir;

  const tasks = new Listr(
    [
      {
        title: 'Copy project files',
        task: ctx => copyTemplateFiles(options, ctx.embedded),
      },
      {
        title: 'Create gitignore',
        task: () => createGitignore(options),
      },
      {
        title: 'Create License',
        task: () => createLicense(options),
      },
      {
        title: 'Initialize git',
        task: () => initGit(options),
        enabled: () => options.git,
      },
      {
        title: 'Install dependencies',
        task: () =>
          projectInstall({
            cwd: options.targetDirectory,
          }),
        skip: () =>
          !options.runInstall
            ? 'Pass --install to automatically install dependencies'
            : undefined,
      },
    ],
    {
      exitOnError: false,
    }
  );

  try {
    const embedded = templateDir.search(/^\s*https?:\/\//) < 0;
    if (embedded) {
      accessSync(templateDir, constants.R_OK)
    } else {
      await request(templateDir.replace(/.git\s*$/, ''));
    }
    await tasks.run({ embedded });
    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
  } catch (err) {
    console.error('%s Invalid template name or url: %s', chalk.red.bold('ERROR'), err);
    exit(1);
  }

}
