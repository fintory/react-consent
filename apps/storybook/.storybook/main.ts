import type { StorybookConfig } from "@storybook/core-common";

const config: StorybookConfig = {
  stories: ["../stories/*.@(story.|)@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
};

export default config
