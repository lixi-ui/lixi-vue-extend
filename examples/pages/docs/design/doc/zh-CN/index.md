## 设计规范

### 文字规范
:::demo
```html
  <template>
    <div>
      常用字号
      <div class="font-size-wrap"><span class="font-size-24">24px</span> <span class="font-size-24">我的标题</span></div>
      <div class="font-size-wrap"><span class="font-size-20">20px</span> <span class="font-size-20">主要文本</span></div>
      <div class="font-size-wrap"><span class="font-size-16">16px</span> <span class="font-size-16">主要文本</span></div>
      <div class="font-size-wrap"><span class="font-size-14">14px</span> <span class="font-size-14">可点击字体</span></div>
      <div class="font-size-wrap"><span class="font-size-14">12px</span> <span class="font-size-12">一般提示文字</span></div>

      <div class="font-size-wrap">
        <span class="font-size-14">中文简体</span>
        <span class="font-family-cn">-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue",’Noto Sans SC’,Microsoft YaHei,Helvetica,sans-serif</span>
      </div>

      <div class="font-size-wrap">
        <span class="font-size-14">中文繁体</span>
        <span class="font-family-hk">-apple-system,BlinkMacSystemFont，’Noto Sans HK’,’Open sans‘,sans-serif</span>
      </div>

      <div class="font-size-wrap">
        <span class="font-size-14">中文繁体</span>
        <span class="font-family-hk">font-family：-apple-system,BlinkMacSystemFont，OpenSans, 'Noto Sans JP',"Hiragino Kaku Gothic Pro",sans-serif</span>
      </div>

      <div class="font-size-wrap">
        <span class="font-size-14">韩文</span>
        <span class="font-family-hk">font-family：-apple-system,BlinkMacSystemFont，OpenSans, 'Noto Sans JP',"Hiragino Kaku Gothic Pro",sans-serif</span>
      </div>

      <div class="font-size-wrap">
        <span class="font-size-14">日文</span>
        <span class="font-family-hk">font-family：-apple-system,BlinkMacSystemFont，OpenSans, 'Noto Sans JP',"Hiragino Kaku Gothic Pro",sans-serif</span>
      </div>

      <div class="font-size-wrap">
        <span class="font-size-14">英、法、德、西</span>
        <span class="font-family-hk">font-family：-apple-system,BlinkMacSystemFont，OpenSans, "Helvetica Neue”,sans-serif</span>
      </div>

    </div>
  </template>
  <style>
    .font-size-24{
      font-size: var(--font-size-24);
    }
    .font-size-20{
      font-size: var(--font-size-20);
    }
    .font-size-16{
      font-size: var(--font-size-16);
    }
    .font-size-14{
      font-size: var(--font-size-14);
    }
    .font-size-12{
      font-size: var(--font-size-12);
    }
    .font-family-cn{
      font-family: var(--font-family-cn)
    }
    .font-family-hk{
      font-family: var(--font-family-hk)
    }
  </style>
```
:::

### 颜色
:::demo
```html
  <div class="design-doc">
    <div class="design-doc-wrap">
      <div class="dc-color-item">
        <div class="dc-item-top">
          <div class="dc-item-top-1">01</div>
          <div class="dc-item-top-2">#FF5224</div>
        </div>
        <div class="dc-item-bottom">
          主色/品牌色
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-02">
          <div class="dc-item-top-1">02</div>
          <div class="dc-item-top-2">#FA8C16</div>
        </div>
        <div class="dc-item-bottom">
          辅助色
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-03">
          <div class="dc-item-top-1">03</div>
          <div class="dc-item-top-2">#4A90E2</div>
        </div>
        <div class="dc-item-bottom">
          辅助色
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-04">
          <div class="dc-item-top-1">04</div>
          <div class="dc-item-top-2">#D40000</div>
        </div>
        <div class="dc-item-bottom">
          辅助色/提示
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-05">
          <div class="dc-item-top-1">05</div>
          <div class="dc-item-top-2">#FF5224</div>
        </div>
        <div class="dc-item-bottom">
          渐变色
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-06">
          <div class="dc-item-top-1">06</div>
          <div class="dc-item-top-2">#FF5224</div>
        </div>
        <div class="dc-item-bottom">
          渐变色
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-07">
          <div class="dc-item-top-1">07</div>
          <div class="dc-item-top-2">#F5F5F5</div>
        </div>
        <div class="dc-item-bottom">
          辅助色/底色
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-08">
          <div class="dc-item-top-1">08</div>
          <div class="dc-item-top-2">#EAEAEA</div>
        </div>
        <div class="dc-item-bottom">
          分割线
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-09">
          <div class="dc-item-top-1">09</div>
          <div class="dc-item-top-2">#000000</div>
        </div>
        <div class="dc-item-bottom">
          主要标题
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-10">
          <div class="dc-item-top-1">10</div>
          <div class="dc-item-top-2">#000000</div>
        </div>
        <div class="dc-item-bottom">
          主要文字
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-11">
          <div class="dc-item-top-1">11</div>
          <div class="dc-item-top-2">#000000</div>
        </div>
        <div class="dc-item-bottom">
          次要文字
        </div>
      </div>
      <div class="dc-color-item">
        <div class="dc-item-top dc-item-top-12">
          <div class="dc-item-top-1">12</div>
          <div class="dc-item-top-2">#CCCCCC</div>
        </div>
        <div class="dc-item-bottom">
          提示文字
        </div>
      </div>
    </div>
  </div>
```
:::


### 投影
:::demo
```html
  <div class="design-doc">
    <div class="design-doc-wrap">
      <div class="dc-color-item">
        <div class="dc-item-top">
          <div class="dc-item-top-1">01</div>
          <div class="dc-item-top-2">rgba(0,0,0,0.1)</div>
        </div>
        <div class="dc-item-bottom">
          投影一
        </div>
      </div>
      <div class="dc-color-item dc-color-item-shadow-2">
        <div class="dc-item-top">
          <div class="dc-item-top-1">02</div>
          <div class="dc-item-top-2">rgba(0,0,0,0.2)</div>
        </div>
        <div class="dc-item-bottom">
          投影二
        </div>
      </div>
    </div>
  </div>
```
:::