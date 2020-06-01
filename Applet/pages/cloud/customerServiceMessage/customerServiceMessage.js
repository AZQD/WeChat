const regeneratorRuntime = require('../../../utils/runtime');
const {cloudUploadFileArr} = require('../../../utils/cloudUtil');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '', // 上传的图片地址
    fileID: '',
    mediaId: '',

    tabList: [
      { name: "文本", id: 1 },
      { name: "图片", id: 2 },
      { name: "图文链接", id: 3 },
      { name: "小程序卡片", id: 4 },
      { name: "说明", id: 5 },
    ],
    currentTab: 1,

    tabInfo1: '',//文本
    tabInfo2: '',//fileId
    tabInfo3: {
      title: '',
      description: '',
      thumbUrl: '', // 图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80
      url: 'https://tongzhen.58.com', // 图文链接消息被点击后跳转的链接
    },
    tabInfo4: {
      title: '',
      pagepath: 'pages/list/list?foo=bar',
      thumbMediaId: '',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  _switchNav: function (e) {
    let current = e.currentTarget.dataset.current;
    this.setData({
      currentTab: current
    });
  },


  tabInfo1Change: function (e) {
    this.setData({
      tabInfo1: e.detail.value
    });
  },


  tabInfo2ChooseImage(){
    wx.chooseImage({
      count: 1, // 默认9，最多是九张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res)=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        cloudUploadFileArr(res.tempFilePaths).then((res) => {
          this.setData({
            tabInfo2: res[0].fileID
          });
        });
      }
    })
  },


  tabInfo31Change: function (e) {
    let tabInfo3 = this.data.tabInfo3;
    tabInfo3.title = e.detail.value;
    this.setData({
      tabInfo3
    });
  },

  tabInfo32Change: function (e) {
    let tabInfo3 = this.data.tabInfo3;
    tabInfo3.description = e.detail.value;
    this.setData({
      tabInfo3
    });
  },

  tabInfo3ChooseImage(){
    wx.chooseImage({
      count: 1, // 默认9，最多是九张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res)=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        cloudUploadFileArr(res.tempFilePaths).then((res) => {
          let tabInfo3 = this.data.tabInfo3;
          tabInfo3.thumbUrl = res[0].tempFileURL;
          this.setData({
            tabInfo3
          });
        });
      }
    })
  },


  tabInfo4Change: function (e) {
    let tabInfo4 = this.data.tabInfo4;
    tabInfo4.title = e.detail.value;
    this.setData({
      tabInfo4
    });
  },

  tabInfo4ChooseImage(){
    wx.chooseImage({
      count: 1, // 默认9，最多是九张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res)=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        cloudUploadFileArr(res.tempFilePaths).then((res) => {
          let tabInfo4 = this.data.tabInfo4;
          tabInfo4.thumbMediaId = res[0].fileID;
          this.setData({
            tabInfo4
          });
        });
      }
    })
  },



  getMediaIDFun(fileID){
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'customerServiceMessage',
        data: {
          api: 'uploadTempMedia',
          fileID
        },
        success(res) {
          console.log('获取mediaId：', res.result);
          const {uploadTempMediaR = {mediaId: ''}} = res.result;
          resolve(uploadTempMediaR.mediaId);
        }
      })
    });
  },


  async sendFun(){
    let {currentTab, tabInfo1, tabInfo2, tabInfo3, tabInfo4} = this.data;
    console.log('提交的内容：', this.data[`tabInfo${currentTab}`]);

    let data;
    if(currentTab === 1){
      data = { // 文本消息
        msgtype: 'text',
        text: {content: tabInfo1}
      };
    }else if(currentTab === 2){
      const mediaId = await this.getMediaIDFun(tabInfo2);
      data = {
        msgtype: 'image',
        image: {
          mediaId
        }
      };
    }else if(currentTab === 3){
      // data = { // 图文链接
      //   msgtype: 'link',
      //   link: {
      //     title: '欢迎来到沿途岁月的空间！',
      //     description: '你寻求的幸福，其实不在远处。那就是你，现在一直走的路...',
      //     url: 'https://mp.weixin.qq.com/s/MHYVpoL3Gtmh-DNWYmNG8g', // 图文链接消息被点击后跳转的链接
      //     thumbUrl: 'https://mmbiz.qpic.cn/mmbiz_jpg/4AoKJGJk3MYICDlwYOVGVvnOichRXrSEMLAx2ILG5Zxck6CNnJkJO0QXyfSG8I4ukVsbJob8uSlTHysLUTZ80tw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1', // 图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80
      //   }
      // };
      data = { // 图文链接
        msgtype: 'link',
        link: {
          title: tabInfo3.title,
          description: tabInfo3.description,
          url: tabInfo3.url, // 图文链接消息被点击后跳转的链接
          thumbUrl: tabInfo3.thumbUrl, // 图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80
        }
      };
    }else if(currentTab === 4){
      const mediaId = await this.getMediaIDFun(tabInfo4.thumbMediaId);
      data = { // 小程序卡片
        msgtype: 'miniprogrampage',
        miniprogrampage: {
          title: tabInfo4.title,
          pagepath: tabInfo4.pagepath,
          thumbMediaId: mediaId, // 图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80
        }
      };
    }

    wx.cloud.callFunction({
      name: 'customerServiceMessage',
      data: {
        api: 'send',
        ...data
      },
      success(res) {
        // res.errCode = 45047 超出发送消息限制
        console.log('发送客服消息给用户：', res.result);
        if(res.result.sendR && (res.result.sendR.errCode === 0)){
          wx.showToast({
            title: '发送成功！',
          });
        }else{
          wx.showToast({
            icon: 'none',
            title: `错误码：${res.result.errCode}`,
          });
        }
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
});