module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'plugin:import/recommended', 'plugin:import/typescript'],
  plugins: [
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import',
  ],
  globals: {},
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: __dirname,
      },
    },
  },
  rules: {
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/no-unresolved': [2, { ignore: ['^@@/exports$'] }],
    // https://github.com/import-js/eslint-plugin-import/issues/1639
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
        alphabetize: {
          order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: false /* ignore case. Options: [true, false] */,
        },
      },
    ],
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: false, // Disallow `const { props, state } = this`; true by default
        allowedNames: ['self'], // Allow `const self = this`; `[]` by default
      },
    ],
    '@typescript-eslint/no-empty-interface': 0,
    'import/no-named-as-default-member': 0,
    '@typescript-eslint/consistent-type-imports': [
      1,
      {
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/triple-slash-reference': 0,
  },
};
