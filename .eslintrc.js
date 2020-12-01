module.exports = {
  extends: ['airbnb-base'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: false,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-unresolved': 0, // don't allow invalid imports
    'import/extensions': ['error', 'never'], // no file extensions on imports
    'space-before-function-paren': ['error', 'always'], // space after name in function def
    indent: ['error', 2], // 2 spaces indentation
    semi: ['error', 'never'], // never semi-colons
    'max-len': ['error', { code: 120 }], // max line length 120 chars
    'no-restricted-syntax': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    /* only require newline after class methods, not single-line properties: */
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],

    // TypeScript ESLint fixes (some ESLint rules don't work with TS by default):
    'no-shadow': 'off', // doesn't work properly with TS, use below TS rule instead
    '@typescript-eslint/no-shadow': ['error'], // proper way to disallow shadow vars in TS
    'no-unused-vars': 'off', // same as no-shadow
    '@typescript-eslint/no-unused-vars': ['error'], // same as no-shadow
  },
}
