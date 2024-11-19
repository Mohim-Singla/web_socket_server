import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Example stylistic rules
      'no-trailing-spaces': 'error', // Disallow trailing spaces
      'indent': ['error', 2],       // Enforce consistent indentation
      'eol-last': ['error', 'always'], // Enforce a newline at the end of files
      'semi': ['error', 'always'],  // Enforce semicolons
      'quotes': ['error', 'single'], // Enforce double quotes
      'no-multiple-empty-lines': ['error', { max: 1 }], // Disallow multiple empty lines
    },
  },
  pluginJs.configs.recommended,
];
