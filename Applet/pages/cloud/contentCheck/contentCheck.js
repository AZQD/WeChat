// pages/contentCheck/contentCheck.js
const regeneratorRuntime = require('../../../utils/runtime');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  msgSecCheckFun(msg){
    //  调用ContentCheck云函数检查文字是否违规
    wx.cloud.callFunction({
      name: 'ContentCheck',
      data: {
        msg,
        // msg: '特3456书yuuo莞6543李zxcz蒜7782法fgnv级完2347全dfji试3726测asad感3847知qwez到',
      },
      success(res) {
        console.log('检查文本内容是否违规：', res.result)
        if (res.result.errCode === 87014) {
          wx.showToast({
            icon: 'none',
            title: '文字违规',
          })
        }else if(res.result.msgR && res.result.msgR.errCode === 0){
          wx.showToast({
            title: '文字符合规范',
          })
        }
      }
    })
  },

  imgSecCheckFun(img){
    return new Promise(function (resolve, reject) {
      //  调用ContentCheck云函数检查图片是否违规
      wx.cloud.callFunction({
        name: 'ContentCheck',
        data: {
          img,
        },
        success(res) {
          console.log('检查图片内容是否违规：', res.result)
          if (res.result.errCode === 87014) {
            // wx.showToast({
            //   icon: 'none',
            //   title: '图片违规',
            // })
          }else if(res.result.imageR && res.result.imageR.errCode === 0){
            // wx.showToast({
            //   title: '图片符合规范',
            // });
            resolve(true);
          }
        }
      })
    });
  },

  chooseImage(){
    wx.chooseImage({
      count: 9, // 默认9，最多是九张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res)=> {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        this.chooseImageAfter(tempFilePaths);
      }
    })
  },

  async chooseImageAfter (tempFilePaths) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    let checkImgResult = true;
    for (let i = 0; i < tempFilePaths.length; i++) {
      checkImgResult = await this.imgSecCheckFun(tempFilePaths[i]);
      if (!checkImgResult) break; // 图片违规，取消渲染；
    }
    if(checkImgResult){
      this.setData({
        imageArr: tempFilePaths
      });
      wx.showToast({
        title: '图片符合规范',
      });
    }else{
      wx.showToast({
        icon: 'none',
        title: '图片违规哦',
      })
    }
  },

  formSubmit(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let inputVal = e.detail.value.input;
    this.msgSecCheckFun(inputVal);
  },

  formReset(e) {
    // console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      imageArr: []
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
  onShareAppMessage: function () {

  }
})