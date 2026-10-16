import nextEslintPluginNext from "@next/eslint-plugin-next";
import nx from "@nx/eslint-plugin";
import baseConfig from "../../eslint.config.mjs";

export default [
    { plugins: { "@next/next": nextEslintPluginNext } },
    ...nx.configs["flat/react-typescript"],
    ...baseConfig,
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        rules: {
            ...nextEslintPluginNext.configs.recommended.rules,
            ...nextEslintPluginNext.configs["core-web-vitals"].rules
        }
    },
    {
        ignores: [
            ".next/**/*",
            "**/out-tsc"
        ]
    }
];
