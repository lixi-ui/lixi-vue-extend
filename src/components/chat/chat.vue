<template>
  <div v-if="!isKyoto">
    <div class="chat-wrap" :class="{'chat-active': isShowChat}" v-loading="chatLoading">
      <div class="chat-detail" v-show="isShowChat">
        <div class="chat-title">
          <i class="chat-logo"></i>
          <span>Gshopper Customer Center</span>
        </div>
        <ul class="chat-info-list" ref="chatInfoList">
          <li v-for="(item, i) in messageList" :key="i">
            <p class="chat-date">{{ item.createdAt | parseTime('{m}/{d} {h}:{i}') }}</p>
            <p class="chat-message" :class="{'mine': userId == (item._sender ? item._sender.userId : '')}">
              <img ref="chatImageInfo" @click="linkImg(item.url)" :src="item.url" alt="" v-if="item.messageType === 'file'">
              <span v-else>{{ item.message }}</span>
              <i class="bubble"></i>
            </p>
          </li>
        </ul>
        <div class="chat-close" @click="closeChat">
          <i class="el-icon-close"></i>
        </div>
        <div class="chat-upload-image">
          <i @click="inputClick" class="icon-upload"></i>
          <input @change="chatUploadImage" type="file" accept="image/png, image/jpeg" ref="chatImage">
        </div>
        <div class="chat-input">
          <textarea @keyup.enter="sendMessage" v-model="message" placeholder="Type your message"></textarea>
        </div>
        <div class="send-btn-wrap">
          <button @click="sendMessage" class="chat-send" :disabled="isSending">Send</button>
        </div>
      </div>
      <div v-show="!isShowChat" @click="showChat" class="chat-icon-wrap" :class="{'active': isShowChat}">
        <div class="chat-icon"></div>
        <div class="chat-count" v-show="messageCount > 0 && !chatLoading">{{ messageCount }}</div>
      </div>
      <div class="label-hover">Customer Center</div>
    </div>
    <div class="chat-modal" v-show="isShowChat"></div>
  </div>
</template>

<script>
  import { getCookie } from 'framework/utils/utils';
  import sb from './sendBird';
  export default {
    name: 'chat',
    data() {
      return {
        isShowChat: false,
        message: '',
        messageList: [],
        groupChannel: {},
        userId: getCookie('userId'),
        hasChat: false,
        chatLoading: false,
        isSending: false,
        isKyoto: false,
        messageCount: 0,
      };
    },
    mounted() {
      if (EASY_ENV_IS_BROWSER) {
        if (location.href.indexOf('kyoto') >= 0) {
          this.isKyoto = true;
        }
      }
      // 自动连接SendBird
      this.initChat();
    },
    methods: {
      initChat() {
        const token = getCookie('Auth-Token');
        if (this.chatLoading || !token) return;
        const userId = getCookie('userId');
        const countryCode = getCookie('country');
        const emailPhone = getCookie('userEmail') ? getCookie('userEmail') : getCookie('userPhone');
        const userName = `${emailPhone}-${getCookie('userId')}`;
        sb.login(userId, userName).then(() => {
          sb.queryChannelList().then((res) => { // 查询已有频道
            const channelList = res;
            if (channelList.length > 0) {
              for (const item of channelList) { // 查询当前国家的频道
                if (item.data == countryCode) {
                  for (const member of item.members) {
                    if (member.userId.indexOf('stage') < 0 && member.userId != userId) { // 判断为线上客服和stage客服
                      this.groupChannel = item;
                      this.messageCount = this.groupChannel.unreadMessageCount;
                      this.hasChat = true;
                      sb.receivedMessage(this.groupChannel.url, (channel, message) => { // 建立连接,监听回复信息
                        // 如果回复的为当前站点的客服则显示
                        if (message._sender.userId == 'gshopper-service-' + countryCode) {
                          this.messageCount = channel.unreadMessageCount;
                        }
                      });
                      break;
                    }
                  }
                }
              }
            }
          });
        });
      },
      showChat() {
        if (this.chatLoading) return;
        const token = getCookie('Auth-Token');
        if (!token) {
          location.href = '/login';
          return;
        }
        this.chatLoading = true;
        const userId = getCookie('userId');
        const countryCode = getCookie('country');
        const emailPhone = getCookie('userEmail') ? getCookie('userEmail') : getCookie('userPhone');
        const userName = `${emailPhone}-${getCookie('userId')}`;
        if (!this.hasChat) { // 判断是否已经连接过
          sb.login(userId, userName).then(() => {
            sb.queryChannelList().then((res) => { // 查询已有频道
              const channelList = res;
              if (channelList.length === 0) { // 首次进入创建组频道
                sb.createGroupChannel(userId, countryCode).then((groupChannel) => {
                  this.groupChannel = groupChannel;
                  this.getMessageList(); // 获取历史消息
                });
              } else {
                let hasCurrentChat = false; // 是否存在当前国家的频道
                for (const item of channelList) { // 查询当前国家的频道
                  if (item.data == countryCode) {
                    for (const member of item.members) {
                      if (member.userId.indexOf('stage') < 0 && member.userId != userId) { // 判断为线上客服和stage客服
                        this.groupChannel = item;
                        this.getMessageList(); // 获取历史消息
                        hasCurrentChat = true;
                        break;
                      }
                    }
                  }
                }
                if (!hasCurrentChat) { // 没有频道创建该国家频道
                  sb.createGroupChannel(userId, countryCode).then((groupChannel) => {
                    this.groupChannel = groupChannel;
                    this.getMessageList(); // 获取历史消息
                  });
                }
              }
            });
          });
        } else {
          this.getMessageList(); // 获取历史消息
        }
      },
      getMessageList() { // 获取历史信息
        this.hasChat = true;
        const countryCode = getCookie('country');
        sb.getChannelMessage(this.groupChannel).then((list) => {
          // 清空未读消息
          this.groupChannel.markAsRead();
          this.messageCount = 0;
          this.messageList = list;
          this.isShowChat = true;
          this.chatLoading = false;
          this.scrollBottom();
          sb.receivedMessage(this.groupChannel.url, (channel, message) => { // 建立连接,监听回复信息
            // 如果回复的为当前站点的客服则显示
            if (message._sender.userId == 'gshopper-service-' + countryCode) {
              this.messageCount = channel.unreadMessageCount;
              this.messageList.push(message);
              this.scrollBottom();
            }
          });
        });
      },
      // 发送消息
      sendMessage() {
        if (!this.message.trim()) return;
        this.isSending = true;
        sb.channelSendMessage(this.message, this.groupChannel).then((res) => {
          this.isSending = false;
          this.messageList.push(res);
          this.message = '';
          this.scrollBottom();
        }).catch((err) => {
          this.$toast(err);
        });
      },
      // 滚动至底部
      scrollBottom() {
        this.$nextTick(() => {
          this.$refs.chatInfoList.scrollTop = this.$refs.chatInfoList.scrollHeight;
          // 当存在图片记录时 图片加载完成继续滚动
          if (this.$refs.chatImageInfo && this.$refs.chatImageInfo.length > 0) {
            for (const item of this.$refs.chatImageInfo) {
              item.onload = () => {
                setTimeout(() => {
                  this.$refs.chatInfoList.scrollTop = this.$refs.chatInfoList.scrollHeight;
                }, 200);
              };
            }
          }
        });
      },
      // 关闭聊天
      closeChat() {
        this.isShowChat = false;
        this.groupChannel.markAsRead();
        this.messageCount = 0;
        // sb.removeChannelHandler(this.groupChannel.url);
      },
      inputClick() {
        this.$refs.chatImage.click();
      },
      chatUploadImage(files) {
        if (files.target.files.length > 0) {
          const file = files.target.files[0];
          // 图片过大上传时的虚拟消息
          this.messageList.push({
            createdAt: new Date().getTime(),
            message: '',
            _sender: {
              userId: this.userId
            }
          });
          const messageIndex = this.messageList.length - 1;
          this.scrollBottom();
          sb.channelSendImageMessage(file, this.groupChannel).then((res) => {
            this.messageList.splice(messageIndex, 1);
            this.messageList.push(res);
            this.scrollBottom();
          });
        }
      },
      linkImg(url) {
        window.open(url);
      }
    },
    destroyed() {
      this.isShowChat = false;
      sb.removeChannelHandler(this.groupChannel.url);
    }
  };
</script>

<style lang="scss">
  @import "~asset/scss/base.scss";
  .chat-wrap{
    .el-loading-mask{
      position: absolute;
      border-radius: 50%;
    }
  }
  @media only screen and (max-width: 767px) {
    .chat-modal{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 50vh;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 2;
    }
    .chat-wrap{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #fff;
      transition: all .2s;
      position: relative;
      box-shadow: 0 2px 11px 0 rgba(0,0,0,0.20);
      z-index: 99;
      .chat-detail{
        position: relative;
        z-index: 2;
        .chat-title{
          display: flex;
          align-items: center;
          padding: r(14) r(28);
          background-color: #F4F4F4;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          .chat-logo{
            width: r(32);
            height: r(32);
            background-image: url("~asset/images/favicon.png");
            background-size: 100%;
          }
          span{
            margin-left: r(4);
            font-size: r(20);
            color: rgba(0,0,0,0.85);
          }
        }
        .chat-info-list{
          padding: r(16);
          height: calc(80vh - 5.5rem);
          box-sizing: border-box;
          background-color: #fff;
          border-top: 1px solid rgba(0,0,0,0.15);
          border-bottom: 1px solid rgba(0,0,0,0.15);
          overflow: auto;
          @include scrollBar(4px);
          li{
            clear: both;
            p{
              margin-bottom: r(10);
            }
            img{
              max-width: 100%;
            }
            .chat-date{
              text-align: center;
            }
            .chat-message{
              position: relative;
              width: auto;
              max-width: 60%;
              padding: r(8) r(12);
              box-sizing: border-box;
              background-color: #E5E5EA;
              font-size: r(15);
              border-radius: r(17);
              float: left;
              &.mine{
                float: right;
                color: #fff;
                background-color: #F37232;
                .bubble{
                  @include bg-image('bubble-mine');
                  left: auto;
                  right: 0;
                }
              }
              .bubble{
                position: absolute;
                display: block;
                width: r(10);
                height: r(10);
                @include bg-image('bubble');
                left: r(-2);
                bottom: 0;
              }
            }
          }
        }
        .chat-close{
          position: absolute;
          width: r(24);
          height: r(24);
          line-height: r(24);
          text-align: center;
          right: r(18);
          top: r(18);
          cursor: pointer;
          font-size: r(18);
          color: rgba(0,0,0,0.45);
          i:hover{
            color: $mainColor;
          }
        }
      }
      .chat-upload-image{
        padding: r(8) r(16);
        position: relative;
        .icon-upload{
          display: inline-block;
          width: r(20);
          height: r(17);
          @include bg-image('Album');
          &:hover{
            cursor: pointer;
          }
        }
        input{
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 0;
          visibility: hidden;
        }
      }
      .chat-icon-wrap{
        position: absolute;
        z-index: 2;
        right: 0;
        bottom: 0;
        width: 40px;
        height: 40px;
        padding: 4px;
        box-sizing: border-box;
        cursor: pointer;
        background-color: $mainColor;
        border-radius: 50%;
        &.active{
          right: r(30);
          bottom: r(30);
        }
        .chat-icon{
          display: block;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          @include bg-image('chat-service');
          background-size: 100%;
        }
        .chat-count{
          position: absolute;
          font-size: r(12);
          right: r(-4);
          top: r(-4);
          padding: r(1) r(4);
          border-radius: 8px;
          color: #fff;
          background-color: #D20A23;
          border: 1px solid #fff;
        }
      }
      &.chat-active{
        position: fixed;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 80vh;
        border-radius: 0;
      }
      .chat-input{
        padding: 0 r(16);
        height: r(58);
        box-sizing: border-box;
        textarea{
          width: 100%;
          height: 100%;
          font-size: r(14);
          color: rgba(0,0,0,0.85);
          resize: none;
          border: none;
        }
      }
      .send-btn-wrap{
        text-align: right;
        .chat-send{
          width: r(60);
          height: r(34);
          line-height: r(34);
          background: #FF5224;
          border-radius: r(4);
          font-size: r(14);
          color: #FFFFFF;
          padding: 0;
          margin-right: r(16);
          &:hover{
            background-color: #FF7522;
          }
        }
      }
      .el-loading-spinner .circular{
        width: 20px;
        height: 20px;
        margin-top: 10px;
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    .label-hover{
      display: none;
    }
  }
  @media only screen and (min-width: 768px) {
    .chat-wrap{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #fff;
      transition: all .2s;
      position: relative;
      box-shadow: 0 2px 11px 0 rgba(0,0,0,0.20);
      .chat-detail{
        position: relative;
        .chat-title{
          display: flex;
          align-items: center;
          padding: 14px 28px;
          background-color: #F4F4F4;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          .chat-logo{
            width: 32px;
            height: 32px;
            background-image: url("~asset/images/favicon.png");
            background-size: 100%;
          }
          span{
            margin-left: 4px;
            font-size: 20px;
            color: rgba(0,0,0,0.85);
          }
        }
        .chat-info-list{
          padding: 16px;
          height: 300px;
          box-sizing: border-box;
          background-color: #fff;
          border-top: 1px solid rgba(0,0,0,0.15);
          border-bottom: 1px solid rgba(0,0,0,0.15);
          overflow: auto;
          @include scrollBar(4px);
          li{
            clear: both;
            p{
              margin-bottom: 10px;
            }
            img{
              max-width: 100%;
            }
            .chat-date{
              text-align: center;
            }
            .chat-message{
              position: relative;
              width: auto;
              max-width: 60%;
              padding: 8px 12px;
              box-sizing: border-box;
              background-color: #E5E5EA;
              font-size: 15px;
              border-radius: 17px;
              float: left;
              &.mine{
                float: right;
                color: #fff;
                background-color: #F37232;
                .bubble{
                  @include bg-image('bubble-mine');
                  left: auto;
                  right: 0;
                }
              }
              .bubble{
                position: absolute;
                display: block;
                width: 10px;
                height: 10px;
                @include bg-image('bubble');
                left: -2px;
                bottom: 0;
              }
            }
          }
        }
        .chat-close{
          position: absolute;
          width: 24px;
          height: 24px;
          right: 18px;
          top: 18px;
          cursor: pointer;
          font-size: 18px;
          color: rgba(0,0,0,0.45);
          i:hover{
            color: $mainColor;
          }
        }
      }
      .chat-upload-image{
        padding: 8px 16px;
        position: relative;
        .icon-upload{
          display: inline-block;
          width: 20px;
          height: 17px;
          @include bg-image('Album');
          &:hover{
            cursor: pointer;
          }
        }
        input{
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 0;
          visibility: hidden;
        }
      }
      .chat-icon-wrap{
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        width: 40px;
        height: 40px;
        padding: 4px;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 50%;
        background-color: $mainColor;
        .chat-icon{
          display: block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          @include bg-image('chat-service');
          background-size: 100%;
        }
        &:hover{
          +.label-hover{
            width: 160px;
            visibility: visible;
          }
        }
        .chat-count{
          position: absolute;
          font-size: 12px;
          right: -4px;
          top: -4px;
          padding: 1px 4px;
          border-radius: 8px;
          color: #fff;
          background-color: #D20A23;
          border: 1px solid #fff;
          transition: none;
        }
      }
      .label-hover{
        visibility: hidden;
        position: absolute;
        width: 40px;
        height: 40px;
        padding-left: 16px;
        line-height: 40px;
        right: 1px;
        bottom: 0;
        color: $mainColor;
        background-color: rgba(245,245,245,1);
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
        border-radius: 20px;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        transition: all .2s linear;
        &:hover{
          width: 160px;
          visibility: visible;
        }
      }
      &.chat-active{
        width: 500px;
        height: 500px;
        border-radius: 4px;
      }
      .chat-input{
        padding: 0 16px;
        height: 58px;
        box-sizing: border-box;
        textarea{
          width: 100%;
          height: 100%;
          font-size: 14px;
          color: rgba(0,0,0,0.85);
          resize: none;
          border: none;
        }
      }
      .send-btn-wrap{
        text-align: right;
        .chat-send{
          width: 60px;
          height: 34px;
          line-height: 34px;
          background: #FF5224;
          border-radius: 4px;
          font-size: 14px;
          color: #FFFFFF;
          padding: 0;
          margin-right: 16px;
          &:hover{
            background-color: #FF7522;
          }
        }
      }
      .el-loading-spinner .circular{
        width: 20px;
        height: 20px;
        margin-top: 10px;
      }
    }
  }
</style>