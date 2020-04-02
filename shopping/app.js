// app.js
const WECHATID = 3; // 微信平台的ID（1:天天+；2:天天官方；3:天天商城）
const PAGESIZE = 10; // 分页列表默认每页展示10条；
let api = require('./api.js');
App({
  onLaunch: function () {
    // 只能每个页面分别设置
    // wx.setNavigationBarColor({
    //   frontColor: '#000000', // 前景颜色值，仅支持 #ffffff 和 #000000
    //   backgroundColor: '#bbffaa' // 背景颜色值，有效值为十六进制颜色
    // });
    // wx.setTabBarStyle({
    //   color: '#FF0000', // tab 上的文字默认颜色
    //   selectedColor: '#00FF00', // tab 上的文字选中时的颜色
    //   backgroundColor: '#FFFFFF', // tab 的背景色
    // })
  },
  globalData: {
    wechatId: WECHATID,
    pageSize: PAGESIZE,
    openid: null,
    BASECOLOR: '#FF6D4C',
    appid: 'wx013ed01479b3663c',
    ossDomain: 'https://file.gongjian.mobi/wechat/gongjian/images/'// 阿里云图片域名
  }
});