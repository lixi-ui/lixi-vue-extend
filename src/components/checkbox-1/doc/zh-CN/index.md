## 复选框

### 示例
:::demo
```html
<div>
  <g-checkbox-1 :isChecked="check" /></g-checkbox-1>
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
  <g-checkbox-1 :isChecked="check" disabled/>
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

### 大小
:::demo
```html
<div>
  <g-checkbox-1 :isChecked="check"/>
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


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| isChecked | 选中          | boolean | — | false |
| disabled  |  不可选       | boolean | — | false |
| size  |  大小       | string | — | medium |