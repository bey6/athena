# ESLint + Prettier

## 已有项目的集成

### ESLint

```bash
yarn add eslint --dev
# or
npm i -D eslint
```

#### init

注意是 `npx` 不是 `npm`:

```bash
npx eslint --init

> To check syntax and find problems
> JavaScript modules (import/export)
> Vue.js
> N
> Browser
> JavaScript
> eslint-plugin-vue@latest y
```

#### .eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
```

### Prettier

```bash
yar add eslint-plugin-prettier
# or
npm i -D eslint-plugin-prettier
```

#### .prettierrc.js

```js
module.exports = {
  semi: false, // 分号
  printWidth: 80, // 单行最大宽度
  singleQuote: true, // 单引号
  trailingComma: 'es5', // 尾逗号
  tabWidth: 2, // tab width => 2 spaces
  bracketSpacing: true, // 对象字面量括号中的空格
  arrowParens: 'always', // 箭头函数总是有括号
}
```

### githooks

`package.json`

```json
{
  "name": "project-name",
  // ...
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,vue}": ["npx eslint lint", "git add"]
  }
}
```

## 新项目的配置

由于目前公司并没有维护自己的 CLI，所以至少现在还是需要从 Vue-CLI 开始。

```bash
vue create project-name

> Babel
> Linter / Formatter (<--)

Pick a linter / formatter config:
> ESLint + Prettier (<--)

Pick additional lint features:
> Lint on save (<--)
> Lint and fix on commit (<--)

Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
> In dedicated config files (<--)
```

### .eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
```

### .prettierrc.js

```js
module.exports = {
  semi: false, // 分号
  printWidth: 80, // 单行最大宽度
  singleQuote: true, // 单引号
  trailingComma: 'es5', // 尾逗号
  tabWidth: 2, // tab width => 2 spaces
  bracketSpacing: true, // 对象字面量括号中的空格
  arrowParens: 'always', // 箭头函数总是有括号
}
```

### gitHooks

与此同时，如果你的代码存在没有检查通过的代码，并且进行了 `git commit` 命令。那么就会触发 gitHooks, 执行 `pre-commit`，该命令会首先执行 `vue-cli-service lint` fix 可能的问题，如果成功修复，则执行 `git add`，否则会弹框提示：

```bash
Git: > running pre-commit hook: lint-staged

pre-commit hook failed...
```

总之无法提交代码。

## 🍓 小结

好了，到现在关于代码质量与代码格式的问题都已经有了保障，并且不符合规范的代码也已经通过 githooks 进行了提交限制。我和我的小伙伴再也不会因为单引号和双引号打架了 😀！
