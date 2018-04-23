// pages/launchApp/launchApp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLaunch: function (ops) {
    if(ops.scene == 1044){
      console.log(6666666);
      console.log(ops.shareTicket)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111,global);
    console.log(111,global.Base64);
      wx.showShareMenu({
          withShareTicket: true,
          success: function (res) {
              // 分享成功
              console.log('shareMenu share success')
              console.log('分享1',res)



          },
          fail: function (res) {
              // 分享失败
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
  onShareAppMessage: function (res) {
    console.log(res);
    return {
      title:'test',
      path:'/pages/login/login',
      success: function(res) {
          // 转发成功
          console.log('success', res);

          if (res.shareTickets) {
              // 获取转发详细信息
              wx.getShareInfo({
                  shareTicket: res.shareTickets[0],
                  success(res) {
                      console.log(res);
                      console.log(res.errMsg);// 错误信息
                      console.log(res.encryptedData);//  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                      console.log(res.iv);// 加密算法的初始向量
                    console.log(88,this);
                    console.log(88,this.base64_decode(res.encryptedData));
                  },
                  fail() {},
                  complete() {}
              });
          }

      },
      fail: function(res) {
          // 转发失败
          console.log('fail', res);
      },
      complete:function (res) {
          // 转发结果
          console.log('complete', res);
      }
    }
  },
  launchAppError:function (e) {
      console.log(e);
  },

  base64_decode  (input) { // 解码，配合decodeURIComponent使用
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = base64EncodeChars.indexOf(input.charAt(i++));
    enc2 = base64EncodeChars.indexOf(input.charAt(i++));
    enc3 = base64EncodeChars.indexOf(input.charAt(i++));
    enc4 = base64EncodeChars.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  return utf8_decode(output);
}
})