# lixi-vue-ui
a vue project

## 启动项目
```js

  // npm config set registry https://registry.npm.taobao.org/ 淘宝镜像
  // npm c set registry https://registry.npmjs.com 官方

  npm install
  npm run dev
```

#### 特别提示
```js
  // 如果使用的是 node 8.9.4 版本 可能会出现错误

  // SyntaxError: Invalid regular expression: /[\p{Lu}]/: Invalid escape 正则错误

  // ..\node_modules\camelcase\index.js

  // 修改前
  const UPPERCASE = /[\p{Lu}]/u;
  const LOWERCASE = /[\p{Ll}]/u;
  const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
  const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
  const SEPARATORS = /[_.\- ]+/;

  // 修改后
  const UPPERCASE = /[\\p{Lu}]/u;
  const LOWERCASE = /[\\p{Ll}]/u;
  const LEADING_CAPITAL = /^[\\p{Lu}](?![\\p{Lu}])/gu;
  const IDENTIFIER = /([\\p{Alpha}\\p{N}_]|$)/u;
  const SEPARATORS = /[_.\- ]+/;

  // 使用 node10 或更高版本的话 无需修改

```
