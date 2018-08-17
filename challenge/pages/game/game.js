// pages/game/game.js
//index.js
//获取应用实例
const app = getApp();
let timer1 = null;
let timer2 = null;
let timer3 = null;
let timer4 = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        timer1: null,
        timer2: null,
        timer3: null,
        timer4: null,
        time1: 0,
        time2: 0,
        time3: 0,
        time4: 0,
        type: true,
        btnText: '开始',
        leftTime: app.globalData.initCount,
        priceCode: app.globalData.priceCode,
        status: 0, //-1 fail; 0: normal 1: success
        tempFilePaths:'../../images/about/head_pic.png'
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getStorageSync("leftTime") !== '') {
            this.setData({
                leftTime: wx.getStorageSync("leftTime")
            });
        }
        this.drawCanvas();
    },
    beginGame: function (event) {
        let type = event.currentTarget.dataset.type;
        let that = this;
        if (type) {//开始
            if (that.data.leftTime) {
                that.setData({
                    type: false,
                    btnText: '停止',
                    leftTime: that.data.leftTime - 1
                });
                wx.setStorageSync("leftTime", that.data.leftTime);
                timer4 = setInterval(function () {
                    if (that.data.time4 >= 9) {
                        that.setData({
                            time4: 0
                        });
                    } else {
                        that.setData({
                            time4: that.data.time4 + 1
                        });
                    }
                }, 10);
                timer3 = setInterval(function () {
                    if (that.data.time3 >= 9) {
                        that.setData({
                            time3: 0
                        });
                    } else {
                        that.setData({
                            time3: that.data.time3 + 1
                        });
                    }
                }, 100);
                timer2 = setInterval(function () {
                    if (that.data.time2 >= 9) {
                        that.setData({
                            time2: 0
                        });
                    } else {
                        that.setData({
                            time2: that.data.time2 + 1
                        });
                    }
                }, 1000);
                timer1 = setInterval(function () {
                    if (that.data.time1 >= 5) {
                        that.setData({
                            time1: 0
                        });
                    } else {
                        that.setData({
                            time1: that.data.time1 + 1
                        });
                    }
                }, 10000);
            } else {
                console.log('用完了');
                that.setData({
                    status: -1,
                });
            }
        } else {
            clearInterval(timer1);
            clearInterval(timer2);
            clearInterval(timer3);
            clearInterval(timer4);
            that.setData({
                type: true,
                btnText: '开始',
            });
            if (that.data.time1 === 1 && that.data.time1 === 0 && that.data.time1 === 0 && that.data.time1 === 0) {
                that.setData({
                    status: 1
                });
            } else {
                that.setData({
                    status: -1,
                });
            }
        }

    },

    closeAlert: function () {
        this.setData({
            status: 0,
            time1: 0,
            time2: 0,
            time3: 0,
            time4: 0,
        });
    },

    getNowTime() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return year + '年' + (month > 9 ? month : '0' + String(month)) + '月' + (day > 9 ? day : '0' + String(day)) + '日 ' + (hour > 9 ? hour : '0' + String(hour)) + ':' + (minute > 9 ? minute : '0' + String(minute));
    },

    drawCanvas() {
        let that = this;
        const ctx = wx.createCanvasContext('myCanvas');
        let windowWidth = wx.getSystemInfoSync().windowWidth;
        let windowHeight = wx.getSystemInfoSync().windowHeight;

        function remSize(size) {
            return windowWidth * size / 750
        }

        ctx.setFillStyle('#fff');
        ctx.fillRect(0, 0, windowWidth, remSize(660));


        wx.getImageInfo({
            src: that.data.tempFilePaths,
            success(res) {

                ctx.drawImage(res.path, remSize(64), remSize(64), remSize(622), remSize(306));

                ctx.setFillStyle('#000');
                ctx.setFontSize(remSize(34));
                ctx.fillText("商家名称", remSize(80), remSize(445));
                ctx.setFillStyle('#000');
                ctx.setFontSize(remSize(24));
                ctx.fillText(app.globalData.shop_name, remSize(300), remSize(445));

                ctx.setFillStyle('#000');
                ctx.setFontSize(remSize(34));
                ctx.fillText("中奖凭证", remSize(80), remSize(520));
                ctx.setFillStyle('#000');
                ctx.setFontSize(remSize(24));
                ctx.fillText(app.globalData.priceCode, remSize(300), remSize(520));
                ctx.fillText(that.getNowTime(), remSize(390), remSize(618));

                ctx.draw();
            },
            fail(error) {
                console.log('请求图片失败',error);
            }
        });


    },

    saveImg() {
        let that = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: 'myCanvas',
            success: function (res) {
                //成功之后保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (result) {
                        console.log('保存成功', result);
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        });
                    },
                    fail: function (result) {
                        console.log('fail', result);
                        wx.showToast({
                            title: '保存失败',
                            icon: 'none',
                            duration: 2000
                        });
                    },
                    complete: function (result) {
                        console.log('complete', result);
                    }
                });
            },
            fail: function (res) {
                console.log('fail', res);
            },
            complete: function (res) {
                console.log('complete', res);
            }
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
    onShareAppMessage: function (res) {
        let that = this;
        let shareTitle = '';
        let sharePath = '/pages/index/index';
        let shareImageUrl = '';
        if (res.from === 'button') {
            // 来自页面内转发按钮
            /*if (!wx.getStorageSync("share")) {

            }*/
            wx.setStorageSync("leftTime", that.data.leftTime + 1);
            // wx.setStorageSync("share", true);
            that.setData({
                leftTime: that.data.leftTime + 1
            });
        }
        return {
            title: shareTitle,
            path: sharePath,
            imageUrl: shareImageUrl,
            /*complete: function() {
                console.log('分享成功');
            }*/
        };
    }
})