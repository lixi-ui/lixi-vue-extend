## 介绍

#### 这是一个响应式框架

#### 采用的框架是 vue2 版本。  sass@1.49.0 。 webpack4 版本。

#### 可以应用在大屏与移动端

#### 对比于当前的一些组件库来说，更像是兼容了多端。

1. 项目中规定 1024px 使用的 。

2. 1024 以下 使用的是 rem 作为单位。


```css
@media only screen and (max-width: 1023px) {
  /* 使用了媒体查询 @media max-width: 1023px 属于小屏 */
  
  /*
    <html lang="en" data-dpr="1" style="font-size: 54px;">
    ....
    </html>
  */
  /* 小屏是使用了 rem 作为单位, 根据 html 标签 font-size 计算元素的大小 */
  /* 借助 sass 的函数功能 */
  font-size: r(12);
}

@media only screen and (min-width: 1024px) {
  /* 使用了媒体查询 @media 1024px 属于大屏 单位为px*/
  font-size: 12px;
}
```

#### 内部使用的是 vant 与 element-ui 结合。 

1. 部分的组件是使用的是 vant 框架与 element-ui 框架。

2. 并不属于组件的二次封装  

#### 响应式框架

#### 特别提示
```js
  // 如果使用的是 node 8 版本 可能会出现错误

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