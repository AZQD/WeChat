// pages/wifi/wifi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        SSID:'lcj',
        password:'liuchaojieliuchaojie水电费'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        this.isSupportWifi().then(function (res) {
            console.log(res);
        }).then(function () {
            return that.getBSSID();
        }).then(function (res) {
            return that.connectWifi(res);
        }).catch(function (error) {
            console.log(error);
            wx.showToast({
                title: 'wifi连接失败',
            })
        });
    },

    isSupportWifi() {
        return new Promise(function (resolve, reject) {
            wx.getSystemInfo({
                success(res){
                    let system = '';
                    if (res.platform === 'android') system = parseInt(res.system.substr(8));
                    if (res.platform === 'ios') system = parseInt(res.system.substr(4));
                    if (res.platform === 'android' && system < 6) {
                        wx.showToast({
                            title: '手机版本不支持',
                        });
                        return;
                    }
                    if (res.platform === 'ios' && system < 11.2) {
                        wx.showToast({
                            title: '手机版本不支持',
                        });
                        return
                    }
                    resolve('手机支持');
                }
            });
        });
    },

    getBSSID(){
        let that = this;
        return new Promise(function (resolve, reject) {
            wx.startWifi({
                success: function (res) {
                    wx.getWifiList({
                        success: function (res) {
                            wx.onGetWifiList(function (res) {
                                for(let i = 0; i<res.wifiList.length; i++){
                                    if(res.wifiList[i].SSID === that.data.SSID){
                                        resolve(res.wifiList[i].BSSID);
                                        break;
                                    }
                                }
                            })
                        }
                    })
                }
            })
        });
    },

    connectWifi(BSSID){
        let that = this;
        return new Promise(function (resolve, reject) {
            wx.connectWifi({
                SSID: that.data.SSID,
                BSSID: BSSID,
                password: that.data.password,
                success: function(res) {
                    /*wx.showToast({
                        title: 'wifi连接成功',
                    });*/
                    wx.onWifiConnected(function (res) {
                        console.log(88,res);
                    });
                },
                fail: function(res) {
                    console.log(res);
                    /*wx.showToast({
                        title: 'wifi连接失败',
                    })*/
                },
            });
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