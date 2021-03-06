//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: "liuchaojie-dev",
      traceUser: true
    })
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
      this.loginFun()
  },
    loginFun:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({

        success: function () {
          /*wx.getUserInfo({
              withCredentials:true,
            success: function (res) {
                console.log('登陆wx.login', res);
              that.globalData.userInfo = res.userInfo
              console.log(res.userInfo);
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })*/
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
});