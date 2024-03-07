module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', '@tanstack/query'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-deprecated-options': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    '@tanstack/query/stable-query-client': 'error',
  },
  settings: {
    react: { version: 'detect' },
  },
};
