import js from '@eslint/js';
import stylisticTs from "@stylistic/eslint-plugin-ts";
import tsParser from "@typescript-eslint/parser";
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'src/types/*'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: "latest",
      parser: tsParser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      "@stylistic/ts": stylisticTs,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "@stylistic/ts/comma-dangle": [
        "warn",
        "always-multiline",
      ],
      "@stylistic/ts/block-spacing": "warn",
      "@stylistic/ts/brace-style": "warn",
      "@stylistic/ts/comma-spacing": ["warn", { "before": false, "after": true }],
      "@stylistic/ts/quotes": ["warn", "double"],
      "@stylistic/ts/semi": ["warn", "always", {
        "omitLastInOneLineBlock": true,
      }],
      "@stylistic/ts/space-before-blocks": "warn",
      "@stylistic/ts/space-before-function-paren": ["warn", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always",
      }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      camelcase: "off",
      "default-case": "error",
      "no-dupe-args": "error",
      "no-unused-vars": "error",
      "no-extra-boolean-cast": "off",
    },
  },
);