import sendbird from 'asset/js/sendBird';
const sb = new sendbird({
  appId: '429CACE9-6D11-4072-9047-001135BD005D'
});
const serviceId = 'gshopper-service';
export default {
  /**
   * @Description: sendBird登录接口
   * @date 2019/6/18
   * @param userId -> 用户昵称
  */
  login(userId, userName) {
    return new Promise((resolve, reject) => {
      sb.connect(userId, (user, error) => {
        if (error) {
          reject(error);
        } else {
          sb.updateCurrentUserInfo(userName, '', (response, error) => {
            if (error) {
              reject(error);
            }
            resolve();
          });
        }
      });
    });
  },
  /**
   * @Description: 获取聊天组
   * @date 2019/6/18
  */
  queryChannelList() {
    const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true; // 不包括空通道
    channelListQuery.limit = 20; // 分页限制
    return new Promise((resolve, reject) => {
      if (channelListQuery.hasNext) {
        channelListQuery.next(function(channelList, error) {
          if (error) {
            reject(error);
          }
          resolve(channelList);
        });
      } else {
        reject();
      }
    });
  },
  /**
   * @Description: 创建组频道
   * @date 2019/6/18
  */
  createGroupChannel(userId, countryCode) {
    const userIds = [userId, `${serviceId}-${countryCode}`]; // 将用户和客服放在一个组里 多站点客服
    return new Promise((resolve, reject) => {
      sb.GroupChannel.createChannelWithUserIds(userIds, true, '', '', countryCode, (groupChannel, error) => {
        if (error) {
          reject(error);
        }
        resolve(groupChannel);
      });
    });
  },
  /**
   * @Description: 获取频道历史消息
   * @date 2019/6/18
  */
  getChannelMessage(groupChannel) {
    return new Promise((resolve, reject) => {
      const prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
      prevMessageListQuery.limit = 100;
      prevMessageListQuery.reverse = false;
      prevMessageListQuery.load((messages, error) => {
        if (error) {
          reject();
        }
        resolve(messages);
      });
    });
  },
  /**
   * @Description: 发送消息
   * @date 2019/6/18
  */
  channelSendMessage(message, groupChannel) {
    return new Promise((resolve, reject) => {
      const params = new sb.UserMessageParams();
      params.message = message;
      params.data = message;
      params.pushNotificationDeliveryOption = 'default';
      groupChannel.sendUserMessage(params, (message, error) => {
        if (error) {
          reject(error);
        }
        resolve(message);
      });
    });
  },
  /**
   * @Description: 发送图片消息
   * @date 2019/6/18
  */
  channelSendImageMessage(file, groupChannel) {
    return new Promise((resolve, reject) => {
      const params = new sb.FileMessageParams();
      params.file = file;
      params.pushNotificationDeliveryOption = 'default';
      groupChannel.sendFileMessage(params, (message, error) => {
        if (error) {
          reject(error);
        }
        resolve(message);
      });
    });
  },
  /**
   * @Description: 接收消息通道
   * @date 2019/6/18
   */
  receivedMessage(groupChannelUrl, cb) {
    const ChannelHandler = new sb.ChannelHandler();
    ChannelHandler.onMessageReceived = function(channel, message) {
      cb(channel, message);
    };
    sb.addChannelHandler(groupChannelUrl, ChannelHandler);
  },
  /**
   * @Description: 关闭消息通道
   * @date 2019/6/18
  */
  removeChannelHandler(groupChannelUrl) {
    sb.removeAllChannelHandlers(groupChannelUrl);
  },
  /**
   * @Description: 进入频道
   * @date 2019/6/18
  */
  openGroupChannel(channelUrl) {
    return new Promise((resolve, reject) => {
      sb.OpenChannel.getChannel(channelUrl, (openChannel, error) => {
        if (error) {
          reject(error);
        }
        openChannel.enter((response, error) => {
          if (error) {
            reject(error);
          }
          resolve();
        });
      });
    });
  },
};