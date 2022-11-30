/**
 * @type {require("@storybook/core-common").StorybookConfig}
 */
const config = {
  stories: ["../stories/*.@(story.|)@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

module.exports = config;
