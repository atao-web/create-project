import arg from 'arg';
import { prompt } from 'inquirer';

export class TemplateDefs {
    private static readonly defs = {
            javascript: { label: "Javascript" },
            typescript: { label: "Typescript" },
            dummy: { label: "Dummy", url: "https://github.com/atao-web/dummy-startup-kit.git" }
    };    
    static findTag (name: string) { return name.toLowerCase(); }

    static find (name: string) { 
        const tag = TemplateDefs.findTag(name);

        return { ...TemplateDefs.defs[tag], tag }; 
        }
    static labels () { return Object.values(TemplateDefs.defs).map(d => d.label); }
}

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
            choices: TemplateDefs.labels(),
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

    const answers: any = await prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
    };
}
