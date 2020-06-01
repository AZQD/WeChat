let app = getApp();
Page({
  data: {
    showShadow: false,
  },
  onLoad: function () {
    const systemInfo = wx.getAccountInfoSync && wx.getAccountInfoSync();
    if(systemInfo){
      console.log('获取小程序APPID和版本号：', systemInfo);
      this.setData({
        version: systemInfo.miniProgram.version
      });
    }
  },

  // 前往用户信息授权
  toUserInfo(){
    wx.navigateTo({
      url: '/pages/getUserInfo/getUserInfo'
    });
  },

  // 拨打电话
  callFun(){
    wx.showModal({
      content: '159****9468',
      confirmText: '拨打',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '15936239468'
          });
        }
      }
    });
  },

  // 遮罩显示隐藏
  showShadowFun () {
    this.setData({
      showShadow: !this.data.showShadow
    });
  },

  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000);
  }
});