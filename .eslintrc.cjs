module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script"
  },
  ignorePatterns: ["*.gs"],
  rules: {}
};
