## 输入框

:::demo
```html
<div>
  <g-input placeholder="提示语" v-model="value"/>
</div>
<script>
  export default{
    data(){
      return {
        value: 'val'
      }
    }
  }
</script>

```
:::

### 只读
:::demo
```html
<div>
  <g-input placeholder="提示语" readonly v-model="value"/>
</div>
<script>
  export default{
    data(){
      return {
        value: 'val'
      }
    }
  }
</script>

```
:::

### 自动完成
:::demo
```html
<div>
  <g-input placeholder="提示语" autocomplete="on" v-model="value"/>
</div>
<script>
  export default{
    data(){
      return {
        value: 'val'
      }
    }
  }
</script>

```
:::



### Attributes
| 参数         | 说明          | 类型      | 可选值                           | 默认值  |
|----------   |-------------- |---------- |--------------------------------  |-------- |
| placeholder | 提示语       | string | — | - |
| value    |  值       | string | — | - |
| readonly |  只读     | boolean | — | - |
| autocomplete | 自动完成 | on/off | - | off |