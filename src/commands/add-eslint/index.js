import {join} from 'path';
import {
    allDoNotExist,
    install,
    EslintConfigModuleEditor,
    PackageJsonEditor,
    Scaffolder,
    someDoExist
} from '../../utils';

const ESLINT_DEPENDENCIES = [
    'eslint',
    'babel-eslint',
    'eslint-config-omaha-prime-grade',
    'watch'
];
const ESLINT_REACT_PLUGINS = [
    'eslint-plugin-react'
];
const pkg = new PackageJsonEditor();
const cfg = new EslintConfigModuleEditor();
const sourceDirectory = join(__dirname, 'templates');
const scaffolder = new Scaffolder({sourceDirectory});
/** @ignore */
export const tasks = [
    {
        text: 'Create ESLint configuration and .eslintignore files',
        task: async () => {
            await cfg.create();
            await scaffolder
                .copy('.eslintignore')
                .commit();
        },
        condition: () => allDoNotExist('.eslintrc.js', '.eslintrc', '.eslintrc.json', '.eslintrc.yml')
    },
    {
        text: 'Add lint tasks to package.json',
        task: async ({sourceDirectory}) => {
            const script = {
                lint: `eslint . -c ./.eslintrc.js --fix`,
                'lint:watch': `watch 'npm run lint' ${sourceDirectory}`,
                'lint:tests': 'eslint __tests__/**/*.js -c ./.eslintrc.js --fix --no-ignore'
            };
            await pkg
                .extend({script})
                .commit();
        },
        condition: () => someDoExist('package.json')
    },
    {
        text: 'Install ESLint dependencies',
        task: ({skipInstall}) => install(ESLINT_DEPENDENCIES, {dev: true, skipInstall}),
        condition: () => someDoExist('package.json')
    },
    {
        text: 'Install ESLint React plugins',
        task: ({skipInstall}) => install(ESLINT_REACT_PLUGINS, {dev: true, skipInstall}),
        condition: ({useReact}) => (useReact && someDoExist('package.json')),
        optional: ({useReact}) => useReact
    },
    {
        text: 'Add React support to ESLint configuration file',
        task: async ({reactVersion}) => {
            const REACT_BABEL_SETTINGS = {
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true
                    }
                },
                settings: {
                    react: {
                        version: `'${reactVersion}'`
                    }
                },
                extends: ['omaha-prime-grade', 'plugin:react/recommended']
            };
            await cfg
                .extend(REACT_BABEL_SETTINGS)
                .commit();
        },
        condition: ({useReact}) => (useReact && someDoExist('.eslintrc.js')),
        optional: ({useReact}) => useReact
    }
];
export default tasks;