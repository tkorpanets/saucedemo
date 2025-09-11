const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = tseslint.config(
  {
    ignores: [
      'eslint.config.*',
      '.eslintrc.*',
      'node_modules',
      'dist',
      'build',
      '.next',
      'coverage',
      'playwright-report',
      'test-results',
    ],
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {},
  },
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      playwright: require('eslint-plugin-playwright'),
    },
    rules: {
      // General quality
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Playwright best practices
      'playwright/no-conditional-in-test': 'warn',
      'playwright/no-force-option': 'warn',
      'playwright/no-eval': 'error',
      'playwright/no-page-pause': 'warn',
      'playwright/no-skipped-test': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/prefer-locator': 'warn',
      'playwright/prefer-to-have-length': 'warn',
      'playwright/valid-expect': 'error',
    },
  },
  {
    files: ['e2e/**/*.{ts,tsx}'],
    plugins: { playwright: require('eslint-plugin-playwright') },
    rules: {
      // Test-specific style tweaks
      'playwright/no-networkidle': 'off',
    },
  }
);
