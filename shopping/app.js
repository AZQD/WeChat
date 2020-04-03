// app.js
const PAGESIZE = 10; // 分页列表默认每页展示10条；
let api = require('./api.js');
App({
  onLaunch: function () {

  },

  // 设置主体背景颜色：只能每个页面分别设置
  // 后面添加缓存，不用每次都请求
  baseColorFun (url, params) {
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        let BASECOLOR = '#F15E34';
        // let BASECOLOR = '#BBFFAA';
        this.globalData.BASECOLOR = BASECOLOR;
        wx.setTabBarStyle({
          color: '#595D66', // tab 上的文字默认颜色
          selectedColor: BASECOLOR, // tab 上的文字选中时的颜色
          backgroundColor: '#FFFFFF', // tab 的背景色
        });
        resolve(BASECOLOR);
      }, 200);
    });
  },

  globalData: {
    pageSize: PAGESIZE,
    openid: null,
    BASECOLOR: '#FFFFFF',
    appid: 'wxda6d9bc5c09906a2',
    ossDomain: 'https://file.test.mobi/wechat/test/images/'// 阿里云图片域名
  }
});