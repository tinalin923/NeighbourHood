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
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'function-paren-newline': ['error', 'multiline'],
    'react/jsx-one-expression-per-line': [0, { allow: 'single-child' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'max-classes-per-file': ['error', 3],
  },
};
