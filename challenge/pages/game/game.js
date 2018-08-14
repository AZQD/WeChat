// pages/game/game.js
var timer1 = null;
var timer2 = null;
var timer3 = null;
var timer4 = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      timer1:null,
      timer2:null,
      timer3:null,
      timer4:null,
      time1:0,
      time2:0,
      time3:0,
      time4:0,
      type:true,
      btnText:'开始',
      leftTime:3,
      status:1,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
    beginGame:function(event){
      let type = event.currentTarget.dataset.type;
        let that = this;
      if(type){//开始
          if(that.data.leftTime){
              that.setData({
                  type:false,
                  btnText:'停止',
                  leftTime:that.data.leftTime-1
              });
              timer4 = setInterval(function(){
                  if(that.data.time4>=9){
                      that.setData({
                          time4:0
                      });
                  }else{
                      that.setData({
                          time4:that.data.time4+1
                      });
                  }
              }, 10);
              timer3 = setInterval(function(){
                  if(that.data.time3>=9){
                      that.setData({
                          time3:0
                      });
                  }else{
                      that.setData({
                          time3:that.data.time3+1
                      });
                  }
              }, 100);
              timer2 = setInterval(function(){
                  if(that.data.time2>=9){
                      that.setData({
                          time2:0
                      });
                  }else{
                      that.setData({
                          time2:that.data.time2+1
                      });
                  }
              }, 1000);
              timer1 = setInterval(function(){
                  if(that.data.time1>=5){
                      that.setData({
                          time1:0
                      });
                  }else{
                      that.setData({
                          time1:that.data.time1+1
                      });
                  }
              }, 10000);
          }else{
              console.log('用完了');
              that.setData({
                  status:-1,
              });
          }
      }else{
          clearInterval(timer1);
          clearInterval(timer2);
          clearInterval(timer3);
          clearInterval(timer4);
          that.setData({
              type:true,
              btnText:'开始',
          });
          if(that.data.time1 === 1 && that.data.time1 === 0 && that.data.time1 === 0 && that.data.time1 === 0){
              that.setData({
                  status:1
              });
          }else{
              that.setData({
                  status:-1,
              });
          }
      }

    },

    closeAlert:function(){
        this.setData({
            status:0,
            time1:0,
            time2:0,
            time3:0,
            time4:0,
        });
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
  onShareAppMessage: function (res) {
      let that = this;
      let shareTitle = '红果换好物，点此免费领';
      let sharePath = '/pages/index/index';
      let shareImageUrl = 'https://img.58cdn.com.cn/weixin/img/weapp-huanhuan/share.png';
      if (res.from === 'button') {
          // 来自页面内转发按钮
          if(!wx.getStorageSync("share")){
              wx.setStorageSync("share", true);
              that.setData({
                  leftTime:that.data.leftTime+1
              });
          }
      }
      return {
          title: shareTitle,
          path: sharePath,
          imageUrl: shareImageUrl,
          /*complete: function() {
              console.log('分享成功');
          }*/
      };
  }
})