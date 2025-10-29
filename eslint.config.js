import { fixupConfigRules } from "@eslint/compat";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/.cache/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/coverage/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  ...fixupConfigRules(pluginReactConfig),
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "@next/next": pluginNext,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/set-state-in-effect": "off",
      // React settings
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // Auto-fix quote escaping in JSX
      "react/no-unescaped-entities": ["error"],
      // Consistent quote style
      quotes: ["error", "double", { avoidEscape: true }],
      "jsx-quotes": ["error", "prefer-double"],
      // Additional JSX safety rules
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      // Design system spacing compliance
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/[pm][xy]?-\\[[0-9]+px\\]/]",
          message:
            "Use design system spacing classes (p-ds-1, p-ds-2, etc.) instead of arbitrary values like p-[16px]. Check DESIGN_SYSTEM.md for available classes.",
        },
        {
          selector: "Literal[value=/gap-\\[[0-9]+px\\]/]",
          message:
            "Use design system spacing classes (gap-ds-1, gap-ds-2, etc.) instead of arbitrary values like gap-[16px]. Check DESIGN_SYSTEM.md for available classes.",
        },
        {
          selector: "Literal[value=/space-[xy]-\\[[0-9]+px\\]/]",
          message:
            "Use design system spacing classes (space-x-ds-1, space-y-ds-2, etc.) instead of arbitrary values. Check DESIGN_SYSTEM.md for available classes.",
        },
        {
          selector: "Literal[value=/bg-\\[#[0-9A-Fa-f]{6}\\]/]",
          message:
            "Use bg-primary, bg-destructive, bg-success instead of arbitrary hex colors. Check DESIGN_SYSTEM.md for available colors.",
        },
        {
          selector: "Literal[value=/text-\\[#[0-9A-Fa-f]{6}\\]/]",
          message:
            "Use text-primary, text-secondary instead of arbitrary hex colors. Check DESIGN_SYSTEM.md for available colors.",
        },
        {
          selector: "Literal[value=/font-\\[[^\\]]+\\]/]",
          message:
            "Use font-heading or font-body from design system instead of arbitrary fonts. Check DESIGN_SYSTEM.md for typography.",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["eslint.config.js", "scripts/validate-design-system.js"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
];
