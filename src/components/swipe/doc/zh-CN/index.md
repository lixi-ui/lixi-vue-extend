## 复选框

### 示例
:::demo
```html
<div class="swipe-demo">
  <g-swipe>
    <g-swipe-item>
      <img class="demo-img" src="https://pic2.zhimg.com/v2-a9093da699660340ae6d6a9143cdc1a8_1440w.jpg?source=172ae18b"/>
    </g-swipe-item>
    <g-swipe-item>
      <img class="demo-img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.vjshi.com%2F2016-06-13%2Fbaf83cbd306cc0aab1323f66f52b20e4%2F00003.jpg%3Fx-oss-process%3Dstyle%2Fwatermark&refer=http%3A%2F%2Fpic.vjshi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646112664&t=6843c24cd7fb0954f5808e42c7130ba9"/>
    </g-swipe-item>
  </g-swipe>
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