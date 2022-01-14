### 加载

:::demo
```html
<template>
  <div>
    <div v-if="show">
      <g-preview-images :images="images" :index="0" @togglePreviewImages="togglePreviewImages"/>
    </div>
    <g-button @click="click">按钮</g-button>
  </div>
</template>
<script>
  export default{
    name: 'g-preview-images-doc',
    data(){
      return {
        show: false,
        images: [
          "https://img1.baidu.com/it/u=3796593454,4087161325&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          "https://img1.baidu.com/it/u=3574903676,461328178&fm=253&fmt=auto&app=138&f=JPEG?w=1037&h=500",
          "https://img2.baidu.com/it/u=639503531,2923210443&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=240"
        ]
      }
    },
    methods: {
      click() {
        this.show = !this.show
      },
      togglePreviewImages() {
        this.show = false
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