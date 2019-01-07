Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSkeleton: true,
    cateList: [
      {
        iconId: "88801",
        iconName: "校园资讯",
        iconPic: null,
        cateIconResponseVoList: null
      },
      {
        iconId: "88802",
        iconName: "脱单专区",
        iconPic: null,
        cateIconResponseVoList: null
      },
      {
        iconId: "88803",
        iconName: "二手/打折",
        iconPic: null,
        cateIconResponseVoList: null
      },
      {
        iconId: "88804",
        iconName: "兼职实习",
        iconPic: null,
        cateIconResponseVoList: null
      },
      {
        iconId: "88805",
        iconName: "周边商户",
        iconPic: null,
        cateIconResponseVoList: null
      },
      {
        iconId: "88806",
        iconName: "床位出租",
        iconPic: null,
        cateIconResponseVoList: null
      },
      {
        iconId: "88807",
        iconName: "社团活动",
        iconPic: null,
        cateIconResponseVoList: null
      },
      {
        iconId: "88808",
        iconName: "求帮忙",
        iconPic: null,
        cateIconResponseVoList: null
      }
    ],

    listData: [
      {
        "cateInfo": {"name": "校园一刻", "cateId": 12052, "dispcatefullpath": "12010,12051,12052", "secondCateId": 12051},
        "content": "因为相信，所以看见。",
        "title": "2019新的一年，加油！！",
      },
      {
        "cateInfo": {"name": "校园一刻", "cateId": 12052, "dispcatefullpath": "12010,12051,12052", "secondCateId": 12051},
        "content": "因为相信，所以看见。",
        "title": "2019新的一年，加油！！",
      }
    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    setTimeout(function () {
      that.setData({
        showSkeleton: false
      })
    }, 3000)
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