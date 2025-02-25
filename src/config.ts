import arg from 'arg';
import { prompt } from 'inquirer';

export class TemplateDef {
    readonly label: string;
    readonly url?: string;
}

export class TemplateDefs {
    private static readonly defs: { [tag: string]: TemplateDef } = {
        javascript: { label: "Javascript" },
        typescript: { label: "Typescript" },
        dummy: { label: "Dummy", url: 'https://github.com/atao-web/dummy-startup-kit.git' }
    };
    static findTag (name: string) {
        return name.toLowerCase();
    }

    static find (name: string) {
        const tag = TemplateDefs.findTag(name);

        return { ...TemplateDefs.defs[tag], tag };
    }
    static labels () {
        return Object.values(TemplateDefs.defs).map(d => d.label);
    }
}

function parseArgumentsIntoOptions (rawArgs) {

    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,

            // aliases
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install'
        },
        {
            argv: rawArgs.slice(2)
        }
    );

    const options = {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0], // one of the template names
        targetDirectory: args._[1], // a sub dir under the working directory
        runInstall: args['--install'] || false
    };
    return options;
}

async function promptForMissingOptions (options) {

    const defaultTemplate = 'javascript';
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate
        };
    }

    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: TemplateDefs.labels(),
            default: defaultTemplate
        });
    }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Should a git be initialized?',
            default: false
        });
    }

    const answers: any = await prompt(questions);
    const config = {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git
    };
    return config;
}

export async function fetchOptionsFrom (args) {
    const rawoptions = parseArgumentsIntoOptions(args);
    return await promptForMissingOptions(rawoptions);
}
