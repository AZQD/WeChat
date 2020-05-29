// pages/contentCheck/contentCheck.js
const regeneratorRuntime = require('../../../utils/runtime');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSecCheckFlag: true, // 图片校验是否符合规范
    imageArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  msgSecCheckFun(msg){
    return new Promise(function (resolve, reject) {
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
            // wx.showToast({
            //   title: '文字符合规范',
            // });
            resolve(true);
          }
        }
      })
    });
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

  async chooseImage(){
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
    let imgSecCheckFlag = true;
    for (let i = 0; i < tempFilePaths.length; i++) {
      imgSecCheckFlag = await this.imgSecCheckFun(tempFilePaths[i]);
      if (!imgSecCheckFlag) break; // 图片违规，取消渲染；
    }
    this.setData({
      imgSecCheckFlag
    });
    if(imgSecCheckFlag){
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

  async formSubmit(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let title = e.detail.value.title;
    let content = e.detail.value.content;
    let imageArr = this.data.imageArr;
    let titleSecCheckFlag = await this.msgSecCheckFun(title);
    let contentSecCheckFlag = await this.msgSecCheckFun(content);
    let imgSecCheckFlag = this.data.imgSecCheckFlag;

    if(titleSecCheckFlag && contentSecCheckFlag && imgSecCheckFlag){
      const db = wx.cloud.database({});
      const contentCheckData = db.collection('contentCheckData');
      contentCheckData.add({
        data: {
          title,
          content,
          imageArr,
          timestamp: Date.now(),
        },
        success: function (res) {
          console.log(res);
          wx.showModal({
            title: '成功',
            content: '成功插入记录'
          });
        }
      });
    }
    
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
});