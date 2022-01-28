## 步骤

:::demo
```html
<div>
  <g-step :step="step"/>
  <div class="btn-wrap">
    <g-button @click="click">下一步</g-button>
  </div>
</div>
<script>
  export default{
    data(){
      return {
        step: 1
      }
    },
    methods: {
      click(){
        this.step++
        if(this.step == 4){
          this.step = 1
        }
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