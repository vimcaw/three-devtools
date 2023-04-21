module.exports = {
  root: true,
  extends: 'custom',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  overrides: [
    {
      files: ['vite.config.ts', 'scripts/**/*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.node.json',
      },
    },
  ],
};
