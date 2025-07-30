import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import angularEslint from "angular-eslint";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";

export default [
    eslintPluginPrettierRecommended,
    {
        files: ["**/*.{js,ts}"],
        languageOptions: {
            parser: tsParser,
            sourceType: "module",
        },
        plugins: {
            "@angular-eslint": angularEslint,
            "@typescript-eslint": tsEslintPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            indent: "off",
            "prettier/prettier": [
                "error",
                {
                    tabWidth: 4,
                    useTabs: false,
                },
            ],
        },
    },
];
