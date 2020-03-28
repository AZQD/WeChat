// app.js
const WECHATID = 3; // 微信平台的ID（1:天天+；2:天天官方；3:天天商城）
const PAGESIZE = 10; // 分页列表默认每页展示10条；
let api = require('./api.js');
App({
  onLaunch: function () {

  },
  globalData: {
    wechatId: WECHATID,
    pageSize: PAGESIZE,
    openid: null,
    appid: 'wx013ed01479b3663c',
    ossDomain: 'https://file.gongjian.mobi/wechat/gongjian/images/'// 阿里云图片域名
  }
});