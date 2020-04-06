module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/recommended', 'standard'],
  rules: {
    // override / add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    // "vue/attribute-hyphenation": "never"
  },
  plugins: ['vue'],
};
