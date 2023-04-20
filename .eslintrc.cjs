module.exports = {
  root: true,
  extends: 'custom',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
  overrides: [
    {
      files: ['reset.d.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
