## 介绍

#### 这是一个响应式框架

#### 使用的是 github 管理。

#### 项目下载 

```sh
  git clone git://github.com/g-ui.git
  cd g-ui
  # 切换到开发的分支 所有的开发都以这个分支为主
  git checkout develop
  # 基于 develop 开发的分支,创建自己的分支
  git checkout -b dev-ling
  npm i
  npm run dev
```

1. 创建组件目录

```sh
  cd src/components/
```

2. 添加链接 `/src/index.js`
```js
  // 修改 src 加入组件
  import newCompont from './newCompoent.js';
```

3. 添加样式链接 `src\style\src\index.scss`
```scss
  @import 'src/newCompoent/scss';
```

4. 文档链接 `doc`
```js
  import newCompont from './doc/newCompoent.js';
```

5. 编写单元测试
```sh
  npm run test
```

6. 提交代码
```sh
  git add .
  git commit -m '一些提交的信息'
  # 多个 commit 记得要合并代码
  git rebase -i <commitId>
  git push
```

7. 代码的合并
```sh
  # 切换到开发的分支
  git checkout develop
  # 在页面上 pr 就行
```

8. 版本的发布
```sh
  # 网页上 都是与 master 分支上的代码一致.
  # 每个版本都会打一个 tag ,每次有新的更新都会有一个 tag.
```

9. 版本管理
```sh
  # 主版本 次版本 修订版
  1.1.1
  # 主版本的发布是与旧版本不兼容的, 是完全独立的一个版本。使用方法,提供的组件也会不一致.
  # 次版本 增加 组件,或者是提过一些新的组件.使用的方案是一致的.
  # 修订版 就是对当前的一些bug进行修复.
```
