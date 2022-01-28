## 图片缩放

:::demo
```html
<div>
  <div v-if="showZoom">
    <g-zoom-image :imageList="imageList" :showZoom="showZoom" @close="close"/>
  </div>
  <g-button @click="click">展开</g-button>
</div>
<script>
  export default{
    data(){
      return {
        imageList: [
          { imageUrl: "https://img1.baidu.com/it/u=3796593454,4087161325&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" },
          { imageUrl: "https://img1.baidu.com/it/u=3574903676,461328178&fm=253&fmt=auto&app=138&f=JPEG?w=1037&h=500" },
          { imageUrl: "https://img2.baidu.com/it/u=639503531,2923210443&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=240" }
        ],
        showZoom: false
      }
    },
    methods: {
      click(){
        this.showZoom = true
      },
      close() {
        this.showZoom = false
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