// pages/compat/compat.js

var API = require('../../utils/api.js');

var Mock = require("mockjs");

Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabList: [
          {
              id: 0,
              name: '全部'
          },
          {
              id: 1,
              name: '北京'
          },
          {
              id: 2,
              name: '上海'
          },
          {
              id: 3,
              name: '广州'
          },
          {
              id: 4,
              name: '哈尔滨'
          },
          {
              id: 5,
              name: '呼和浩特'
          },
          {
              id: 10000,
              name: '其他'
          }
      ],
      currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 使用Mock（方法一）
    API.ajax('', (res)=> {
      //这里即可以获取模拟的res
      console.log('mockData1', res);
      console.log('mockData1', res.data);
      this.setData({
        mockData1: res.data
      });
    });

    // 使用Mock（方法二）
    let mockData2 = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|10': [{
        'id|+1': 1,
        'img': "@image('200x100', '#4A7BF7','#fff','pic')",
        'title': '@ctitle(3,8)',
        'city': "@county(true)",
        'stock_num': '@integer(0,100)',//库存数量
        'marketing_start': '@datetime()',
        'marketing_stop': '@now()',
        'price': '@integer(100,2000)',//现价，单位：分
        'original_price': '@integer(100,3000)'
      }]
    });
    console.log('mockData2', mockData2);
    console.log('mockData2', mockData2.data);
    this.setData({
      mockData2: mockData2.data
    });

  },

    // 切换tab
    _switchNav: function (e) {
        let tabList = this.data.tabList;
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: tabList[index].id
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
