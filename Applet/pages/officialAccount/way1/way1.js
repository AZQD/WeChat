// pages/officialAccount/way1/way1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode: 'https://6c69-liuchaojie-dev-1302189063.tcb.qcloud.la/private/official_account_qrcode.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //获取授权信息
  getSettingFun: function () {
    wx.getSetting({
      success: res => {
        console.log('保存到相册', res.authSetting['scope.writePhotosAlbum']);
      },
      fail: res => {
        console.log('获取授权信息fail', res);
      }
    })
  },

  saveImgFun() {
    wx.downloadFile({
      url: this.data.qrcode,
      success: res => {
        // console.log(res);
        let src = res.tempFilePath;
        // 保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: src,
          success: result => {
            console.log('success', result);
            wx.showToast({
              title: "保存成功",
              icon: "success",
              duration: 1000
            });
          },
          fail: result => {
            console.log('fail', result);
            wx.showToast({
              title: "保存失败",
              icon: "none",
              duration: 1000
            });
          }
        });
      }
    });
  },

  openSetting() {
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});