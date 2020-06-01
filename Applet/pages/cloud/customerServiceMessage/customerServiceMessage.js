Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '', // 上传的图片地址
    fileID: '',
    mediaId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  cloudUploadFileFun(){
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log(111, res);
        this.setData({imgUrl: res.tempFilePaths[0]});
        wx.cloud.uploadFile({
          cloudPath: `customerServiceMessage/${Date.now()}.png`, // 上传至云端的路径
          filePath: res.tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log('获取fileID：', res.fileID);
            this.setData({fileID: res.fileID});
          },
          fail: console.error
        });
      }
    })
  },

  getMediaIDFun(){
    let that = this;
    let fileID = this.data.fileID;
    wx.cloud.callFunction({
      name: 'customerServiceMessage',
      data: {
        api: 'uploadTempMedia',
        fileID
      },
      success(res) {
        console.log('获取mediaId：', res.result);
        const {uploadTempMediaR = {mediaId: ''}} = res.result;
        that.setData({mediaId: uploadTempMediaR.mediaId});
        wx.showToast({
          title: '获取fileID成功！'
        })
      }
    })
  },

  sendFun(){
    let mediaId = this.data.mediaId;

    // let data = { // 文本消息
    //   msgtype: 'text',
    //   text: {content: `发送消息成功！ ${Date.now()}`}
    // };

    // let data = {
    //   msgtype: 'image',
    //   image: {
    //     mediaId
    //   }
    // };

    let data = { // 图文链接
      msgtype: 'link',
      link: {
        title: '欢迎来到沿途岁月的空间！',
        description: '你寻求的幸福，其实不在远处。那就是你，现在一直走的路...',
        url: 'https://mp.weixin.qq.com/s/MHYVpoL3Gtmh-DNWYmNG8g', // 图文链接消息被点击后跳转的链接
        thumbUrl: 'https://mmbiz.qpic.cn/mmbiz_jpg/4AoKJGJk3MYICDlwYOVGVvnOichRXrSEMLAx2ILG5Zxck6CNnJkJO0QXyfSG8I4ukVsbJob8uSlTHysLUTZ80tw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1', // 图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80
      }
    };

    // let data = { // 小程序卡片
    //   msgtype: 'miniprogrampage',
    //   miniprogrampage: {
    //     title: '小程序卡片：这是标题这是标题这是标题这是标题',
    //     pagepath: 'pages/list/list?foo=bar',
    //     thumbMediaId: mediaId, // 图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80
    //   }
    // };

    wx.cloud.callFunction({
      name: 'customerServiceMessage',
      data: {
        api: 'send',
        ...data
      },
      success(res) {
        // res.errCode = 45047 超出发送消息限制
        console.log('发送客服消息给用户：', res.result);
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