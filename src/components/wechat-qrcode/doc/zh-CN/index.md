### 加载

:::demo
```html
<template>
  <div>
    <g-wechat-qrcode :checked="check" disabled/>
  </div>
</template>
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