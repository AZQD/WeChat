// pages/contentCheck/contentCheck.js
const regeneratorRuntime = require('../../../utils/runtime');
const {cloudTextCheck, cloudImgArrCheck, cloudUploadFileArr} = require('../../../utils/cloudUtil');
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

  chooseImage(){
    wx.chooseImage({
      count: 9, // 默认9，最多是九张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res)=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        this.setData({
          imageArr: tempFilePaths
        });
      }
    })
  },

  async formSubmit(e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let title = e.detail.value.title;
    let content = e.detail.value.content;
    let imageArr = this.data.imageArr;

    let titleSecCheckFlag = await cloudTextCheck(title);
    let contentSecCheckFlag = await cloudTextCheck(content);
    let imgSecCheckFlag = await cloudImgArrCheck(imageArr);
    console.log('校验结果：', titleSecCheckFlag, contentSecCheckFlag, imgSecCheckFlag);


    if(titleSecCheckFlag && contentSecCheckFlag && imgSecCheckFlag){
      // 校验成功，将图片上传到云数据库
      let cloudImageArr = await cloudUploadFileArr(imageArr);

      const db = wx.cloud.database({});
      const contentCheckData = db.collection('contentCheckData');
      contentCheckData.add({
        data: {
          title,
          content,
          imageArr: cloudImageArr,
          timestamp: Date.now(),
        },
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '发布成功！',
            success: () => {
              wx.navigateTo({
                url:'/pages/cloud/contentCheckList/contentCheckList'
              });
            }
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