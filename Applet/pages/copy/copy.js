// pages/copy/copy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phoneNum : "15936239468"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //获取系统剪贴板内容
      wx.getClipboardData({
          success: function(res){
              console.log(res)
          }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  },
    //设置系统剪贴板的内容
    copyText() {
        let that = this;
        wx.setClipboardData({
            data: this.data.phoneNum,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        console.log(res.data) // data
                    }
                })
            }
        })
    }
})