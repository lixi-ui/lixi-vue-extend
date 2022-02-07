## typescript的加载

### 为什么使用 TypeScript?

1. 与JavaScript相比，TypeScript代码更可靠、更容易重构。这使开发人员可以更轻松地避免错误并进行重写。类型的定义和编译器的引入，可使你避免掉代码中的大多数愚蠢错误。

2. 显式类型使代码可读性更高，所以注意力将会更集中在系统究竟是如何构建的，以及系统的不同部分如何相互作用。在大型系统中，能够在记住上下文的同时抽象出系统的其余部分是很重要的。类型的定义使我们能够做到这一点。

### 本项目中的 `ts` 相关 npm 包 `ts-jest typescript @babel/preset-typescript ts-loader`
```sh
  ## 安装 typescript 
  # typescript 执行 ts 代码
  # @babel/preset-typescript 将 ts 代码转换为 js 代码,并不会校验 ts 代码
  # ts-jest 单元测试,让ts代码被识别
  # ts-loader 会校验 ts 的语法类型。 事先执行 typescript 的代码。再转为 js 代码。是做了语法的校验。
  npm install ts-jest typescript ts-loader @babel/preset-typescript --save-dev
```


### ts学习文档 https://www.jianshu.com/p/23d5298d0214/
### 基本上是所有的配置项了

```js
  /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT' // 使用的是最新的版本 ESNEXT , 就能兼容最新的语法糖了
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
```

### webpack 中的配置
```js
  // @babel/preset-typescript 将 ts 的代码转化为 js 代码。但是不会校验参数的类型。
  var config = {
    // ...
    module: {
      rules: [
        // ...
        {
          test: /\.(tsx?)$/,
          loader: 'babel-loader',
          use: [
            {
              loader: 'ts-loader', // 将 ts 的代码转化为 js 代码。并且校验参数的类型。
              options: {
                appendTsSuffixTo: [/\.vue$/], // 在.vue文件添加 .ts 后缀
                transpileOnly: true // 执行独立文件输出
              }
            }
          ]
        }
      ]
    }
  }
```

### 配置 tsconfig.json 更多详情请看 typescript 官网(https://www.tslang.cn/)
```json
{
  "compilerOptions": {
    "target": "esnext", // 使用的是最新的 es 模块, 会兼容之前所有的版本。最新提供的语法糖。新增的函数。
    "module": "esnext", // 使用的是最新的 es 模块, 会兼容之前所有的版本。最新提供的语法糖。新增的函数。
    "strict": true, // 启用严格模式
    "jsx": "preserve", // 解析 jsx 的语法
    "moduleResolution": "node", //  
    "noImplicitAny": false, // 
    "noImplicitThis": false,
    "baseUrl": ".",
    "allowSyntheticDefaultImports": true,
    "paths": {
      "@lixi/*": ["src/*"],
      "@site/*": ["site/*"]
    },
    "noLib": false,
    "lib": ["ESNext", "DOM"]
  },
  "exclude": [
    "node_modules",
    "node_modules1",
    "material/*",
    "src/components/*",
    "**/*.md",
    "**/*.spec.ts",
    "src/utils/*",
    "src/hooks/*",
    "src/directives/*",
    "src/locale/*",
    "src/tokens/*"
  ],
  "include": ["**/*.ts", "**/*.tsx"]
}
```

### 简单的泛型。

1. 泛型是允许同一个函数接受不同类型参数的一种模板，可用来创建可复用的组件。

```ts
  function <T>fn(args : T): T {
    return args
  }
  fn<string>('123') // 这里的 <string> 就是上面个 <T>
  fn<number>(123) // 这里的 <number> 就是上面个 <T>
```
