// pages/about/about.js
//index.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: {
            shop_name: app.globalData.shop_name,
            shop_desc: app.globalData.shop_desc,
            city: app.globalData.city,
            addDetails: app.globalData.addDetails,
            phone: app.globalData.phone,
            latitude: app.globalData.latitude,
            longitude: app.globalData.longitude
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    calling: function () {
        wx.makePhoneCall({
            phoneNumber: this.data.info.phone,
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    },

    toAddress: function () {
        wx.navigateTo({
            url: '/pages/map/map?latitude=' + this.data.info.latitude + '&longitude=' + this.data.info.longitude
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

    },

    toIndex: function () {
        wx.navigateTo({
            url: '/pages/index/index'
        })
    },
    toAbout: function () {
        /*wx.navigateTo({
            url: '/pages/about/about'
        })*/
    }
})