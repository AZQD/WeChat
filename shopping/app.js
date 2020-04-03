// app.js
const PAGESIZE = 10; // 分页列表默认每页展示10条；
let api = require('./api.js');
App({
  onLaunch: function () {
    // 只能每个页面分别设置

    setTimeout( () => {
      // let BASECOLOR = '#FF6D4C';
      let BASECOLOR = '#BBFFAA';
      this.globalData.BASECOLOR = BASECOLOR;
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 前景颜色值，仅支持 #ffffff 和 #000000
        backgroundColor: BASECOLOR, // 背景颜色值，有效值为十六进制颜色
      });
      wx.setTabBarStyle({
        color: '#000000', // tab 上的文字默认颜色
        selectedColor: BASECOLOR, // tab 上的文字选中时的颜色
        backgroundColor: '#FFFFFF', // tab 的背景色
      })
    }, 200);
  },
  globalData: {
    pageSize: PAGESIZE,
    openid: null,
    BASECOLOR: '#FFFFFF',
    appid: 'wxda6d9bc5c09906a2',
    ossDomain: 'https://file.gongjian.mobi/wechat/gongjian/images/'// 阿里云图片域名
  }
});