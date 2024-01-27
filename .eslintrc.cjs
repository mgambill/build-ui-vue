/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['**/dist/*', '**/node_modules/*', '**/pb_data/*'],
  rules: {
    'no-undef': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
