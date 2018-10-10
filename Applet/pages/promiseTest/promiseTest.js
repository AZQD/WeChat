// pages/promiseTest/promiseTest.js
let queryArr = [];
const max = 5;
let running = 0;
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.reqPromiseLimit({
            url: "https://free-api.heweather.com/v5/weather",
            data: {
                city: '北京',
                key: '8971dbd46ef44708a62f0ce8cf6ff012'
            },
        });
    },
    reqPromiseLimit(object) {
        let that = this;
        return new Promise(function (resolve, reject) {
            queryArr.push({
                ...object,
                success: resolve,
                fail: reject
            });
            that.request();
        });
    },

    request() {
        let that = this;
        if (running < max && queryArr.length) {
            let options = queryArr.unshift();
            running++;
            wx.request({
                ...options,
                complete: function () {
                    running++;
                    that.request();
                }
            });
        }
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