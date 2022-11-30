module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/**/*"],
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: ["@typescript-eslint", "import", "react", "react-hooks", "jsx-a11y"],
  rules: {
    /**
     * We don't want any unused vars starting with "_" to be claimed as unused vars.
     */
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],

    /**
     * Turn of the need for display names for react components.
     * Especially when writing page components (Next.js), this is
     * extremly bugging.
     */
    "react/display-name": "off",

    /**
     * We don't want to have the react import in each file. Typescript is
     * handling this for us.
     */
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "warn",

    /**
     * Enforce that we do not have any `console.log`'s in the code.
     */
    "no-console": "error",

    /**
     * This makes it easier to use the auto-import function of the typescript
     * lsp.
     */
    "import/no-anonymous-default-export": "warn",

    /**
     * Add a warning for multiple a11y things.
     */
    "jsx-a11y/alt-text": [
      "warn",
      // This is needed for next's `Image` component.
      {
        elements: ["img"],
        img: ["Image"],
      },
    ],
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn",
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.tsx"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
      },
    },
    {
      files: [
        "**/*.stories.tsx",
        "**/*.stories.jsx",
        "**/*.stories.mdx",
      ],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
  env: {
    browser: true,
    node: true,
  },
};
