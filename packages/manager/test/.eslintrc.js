module.exports = {
  extends: "../../../.eslintrc.js",
  overrides: [
    {
      files: "test/**/*.test.ts",
      env: { jest: true },
    },
  ],
};
