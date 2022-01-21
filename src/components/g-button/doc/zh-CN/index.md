## 按钮

### 按钮大小
:::demo
```html
<div>
  <g-button type="small">小按钮</g-button>
  <g-button type="medium">中按钮</g-button>
  <g-button type="large">大按钮</g-button>
</div>
```
:::

### 按钮主题
:::demo
```html
<div>
  <g-button theme="default">默认</g-button>
  <g-button theme="light">高亮</g-button>
  <g-button theme="plain">朴素</g-button>
</div>
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type      | 大小      | string | small/medium/large | small |
| theme     | 主题      | string | default/light/plain | default |