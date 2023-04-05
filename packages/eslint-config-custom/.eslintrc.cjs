module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'react/require-default-props': 'off',
    'no-param-reassign': 'off',
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      env: {
        browser: false,
        node: true,
        commonjs: true,
      },
      parserOptions: {
        sourceType: 'script',
        project: './tsconfig.node.json',
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'global-require': 'off',
      },
    },
    {
      files: ['reset.d.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
