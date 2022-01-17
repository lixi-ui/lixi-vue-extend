### 介绍

#### 这是一个响应性宽假

#### 可以应用在大屏与移动端

```css
@media only screen and (max-width: 1023px) {
  /* 使用了媒体查询 @media 1024px 属于大屏 */
}

@media only screen and (min-width: 1024px) {
}
```
### 可以通过 npm install g-ui

### 内部使用的是 vant 与 element-ui 结合。



#### 简单的使用案例
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

