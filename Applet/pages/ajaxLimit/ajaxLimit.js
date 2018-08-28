// pages/ajaxLimit/ajaxLimit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      weApi:'https://free-api.heweather.com/v5/weather'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.getWeather('北京');
      this.getWeather('上海');
      this.getWeather('广州');
      this.getWeather('深圳');
      this.getWeather('珠海');
      this.getWeather('汕头');
      this.getWeather('厦门');
      this.getWeather('开封');
      this.getWeather('郑州');
      this.getWeather('洛阳');
      this.getWeather('三门峡');
      this.getWeather('西安');
      this.getWeather('漯河');
      this.getWeather('驻马店');
      this.getWeather('天津');
      this.getWeather('成都');
      this.getWeather('武汉');


  },

    //调用天气API查询气象信息
    getWeather(city='北京'){
        wx.request({
            url:this.data.weApi,
            data:{
                city:city,
                key:'8971dbd46ef44708a62f0ce8cf6ff012'
            },
            success:res=>{
                console.log('天气API',res);
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
  
  }
})