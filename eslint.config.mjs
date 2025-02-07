import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import airbnb from "eslint-config-airbnb";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  airbnb, // Include Airbnb config
  {
    plugins: {
      import: importPlugin,
      react: pluginReact,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
    },
    rules: {
      "react/jsx-filename-extension": [1, {"extensions": [".jsx", ".tsx"]}],
      "react/react-in-jsx-scope": "off",
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    },
    settings: {
      react: {
        version: "detect",
      },
    }
  }
];