module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', 'jsx-a11y', 'react-hooks'],
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/extensions': [1, 'ignorePackages'],
    'react/prefer-stateless-function': [1, { ignorePureComponents: true }],
    'react/function-component-definition': [
      1,
      {
        namedComponents: [
          'function-declaration',
          'function-expression',
          'arrow-function',
        ],
        unnamedComponents: 'arrow-function',
      },
    ],
    'function-paren-newline': ['error', 'multiline-arguments'],
    'react/jsx-one-expression-per-line': [0, { allow: 'single-child' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'max-classes-per-file': ['error', 3],
    // 'no-console': 'off',
    'react/forbid-prop-types': [
      1,
      {
        forbid: ['any'],
        checkContextTypes: false,
        checkChildContextTypes: false,
      },
    ],
    'react/jsx-no-bind': [
      1,
      {
        ignoreDOMComponents: true,
        allowFunctions: true,
        allowArrowFunctions: true,
      },
    ],
  },
};
