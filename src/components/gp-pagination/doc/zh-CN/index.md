## 分页

### element组件的样式封装

:::demo
```html
<div>
  <g-gp-pagination :total="100" pageSize="10" />
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


### currentChange 页码改变回调

:::demo
```html
<div>

  <g-gp-pagination :total="100" pageSize="10" @currentChange="currentChange"/>
</div>
<script>
  export default{
    data(){
      return {
        check: true
      }
    },
    methods: {
      currentChange(val) {
        console.log('页码改变', val)
      }
    }
  }
</script>

```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| layout    | 展示的模块       | string | prev, pager, next | prev, pager, next |
| total     |  总数       | Number | — | 0 |
| pageSize  |  每页数据数  | Number | — | 10 |
| page      | 当前页      | Number | - | 1 |

### event 

currentChange 回调
