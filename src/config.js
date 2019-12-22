import arg from 'arg';
import { prompt } from 'inquirer';

export const templateDefs = {
    javascript: { label: "Javascript" },
    typescript: { label: "Typescript" },
    dummy: { label: "Dummy", url: "https://github.com/atao-web/dummy-startup-kit.git" }
}
templateDefs.findTag = label => label.toLowerCase();
templateDefs.find = label => templateDefs[templateDefs.findTag(label)];
templateDefs.labels = Object.entries(templateDefs)
    .filter(([key, value]) => typeof value !== 'function')
    .map(([key, value]) => value.label || key);

export async function fetchOptionsFrom(args) {
    const rawoptions = parseArgumentsIntoOptions(args);
    return await promptForMissingOptions(rawoptions);
}

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0],
        runInstall: args['--install'] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'javascript';
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        };
    }

    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: templateDefs.labels,
            default: defaultTemplate,
        });
    }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Should a git be initialized?',
            default: false,
        });
    }

    const answers = await prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
    };
}
