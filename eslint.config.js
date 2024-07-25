import globals from "globals"
import tseslint from "typescript-eslint"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default [
  {
    ignores: ["dist/"],
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  ...tseslint.configs.recommended,
  {
    rules: {
      allowImportingTsExtensions: "on",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "prettier/prettier": "warn",
    },
  },
  eslintPluginPrettierRecommended,
]
