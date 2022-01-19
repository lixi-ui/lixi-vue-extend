## 安装

### 可以通过 `npm` 下载

```js
npm install gg-vue-ui --save
```

### 项目中使用

```js
  import GUI from "gg-vue-ui"
  vue.use(GUI)
```

### 简单的使用案例
:::demo
```html
<div>
  <g-checkbox :checked="check" disabled/>
</div>
<script>
  export default{
    data(){
      return {
        check: true
      }
    }
  }
</script>

```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| checked   | 选中          | boolean | — | false |
| disabled  |  不可选       | boolean | — | false |

