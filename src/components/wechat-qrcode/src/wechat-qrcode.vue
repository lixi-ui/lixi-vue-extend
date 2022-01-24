<template>
  <div class="wechat-qrcode-wrap">
    <div class="gray-line"></div>
    <div class="wechat-qrcode">
      <span class="wechat-title">二维码</span>
      <div class="qrcode-img">
        <!--<span class="account" @click="copyAccount('Gshopper888')">Gshopper888</span>-->
        <i class="icon-qrcode"></i>
        <div class="gp-qrcode-wrap">
          <i class="gp-qrcode"></i>
        </div>
      </div>
      <div class="account-copy" @click="visibleDialog">(点击查看二维码)</div>
    </div>
    <p class="wechat-qrcode-tips">
      <i class="icon-wechat"></i>
      二维码
    </p>
    <div class="gray-line"></div>
    <el-dialog :visible.sync="visible" :closeOnClickModal="true">
      <img width="100%" src="https://ws.izenecdn.com/st/website/img/wechat-qrcode@2x.png">
    </el-dialog>
  </div>
</template>

<script>
  import {
    copyContent,
    deviceWeb
  } from 'src/utils/framework/utils/utils';
  import { Dialog } from 'element-ui';
  export default {
    name: 'g-wechat-qrcode',
    components:{
      ElDialog: Dialog
    },
    data() {
      return {
        visible: false
      };
    },
    methods: {
      copyAccount(val) {
        if (deviceWeb()) return;
        copyContent(val).then(() => {
          this.$toast(this.$lang.successText);
        });
      },
      visibleDialog() {
        this.visible = !this.visible;
      }
    }
  };
</script>
