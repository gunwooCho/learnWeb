const OS = require('os');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/no-extraneous-dependencies': 'warn',
    'import/prefer-default-export': 0, // export default 권장
    'linebreak-style': ['error', OS.EOL === '\r\n' ? 'windows' : 'unix'],
    'react/button-has-type': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
  },
};
