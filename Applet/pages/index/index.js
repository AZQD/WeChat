//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Welcome to WeChat applet !',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if(wx.getStorageSync('userInfo')){
        this.setData({
            userInfo:wx.getStorageSync('userInfo')
        });
    }
  },
    onGotUserInfo(e){
      console.log(e);
      if(e.detail.userInfo){
          this.setData({
              userInfo:e.detail.userInfo
          });
          wx.setStorageSync('userInfo', e.detail.userInfo)
      }else {
          wx.showToast({
              title:'请获取用户授权',
              icon:'none'
          });
      }

    },
  clickBtn: function(){
    console.log(wx);
  }
})
