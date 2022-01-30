## 复选框

### 示例
:::demo
```html
<div>
  <g-checkbox :isChecked="check" /></g-checkbox>
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

### 不可点击
:::demo
```html
<div>
  <g-checkbox :isChecked="check" disabled/>
</div>
<script>
  export default{
    data(){
      return {
        check: false
      }
    }
  }
</script>

```
:::

### 选择事件
:::demo
```html
<div>
  <g-checkbox @handleChecked="handleChecked" :isChecked="check"/>
</div>
<script>
  export default{
    data(){
      return {
        check: false
      }
    },
    methods: {
      handleChecked(val) {
        console.log(val)
      }
    }
  }
</script>

```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| isChecked | 选中          | boolean | — | false |
| disabled  |  不可选       | boolean | — | false |
### Carousel Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| handleChecked | 改变时触发 | true/false |