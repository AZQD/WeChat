//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    date: ''
  },

  onLoad: function () {
    if(wx.getStorageSync('userInfo')){
        this.setData({
            userInfo:wx.getStorageSync('userInfo')
        });
    }

    let date = String(new Date().getMonth() + 1) + String(new Date().getDay());
    this.setData({
      date
    });
  },

  // 页面跳转
  jumpPageFun: function (e) {
    let type = Number(e.currentTarget.dataset.type);
    let url;
    if (type === 1) {
      url = 'cloud/contentCheck/contentCheck';
    } else if (type === 2) {
      url = 'cloud/contentCheckList/contentCheckList';
    } else if (type === 3) {
      url = 'cloud/wxacode/wxacode';
    } else if (type === 4) {
      url = 'cloud/img/img';
    } else if (type === 5) {
      url = 'contactService/contactService';
    } else if (type === 6) {
      url = 'cloud/customerServiceMessage/customerServiceMessage';
    } else if (type === 7) {
      url = 'cloud/logistics/logistics';
    } else if (type === 8) {
      url = 'cloud/nearbyPoi/nearbyPoi';
    }
    wx.navigateTo({
      url: `/pages/${url}`
    });
  },
});
