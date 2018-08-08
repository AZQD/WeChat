Page({
    /**
     * 页面的初始数据
     */
    data: {
        windowWidth: wx.getSystemInfoSync().windowWidth,
        windowHeight: wx.getSystemInfoSync().windowHeight,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onLoad');
    },

    rem(size) {
        return this.data.windowWidth * size / 750;//除以设计图宽度；
    },

    //Canvas，文本，颜色，字号，X 轴坐标位置，Y 轴坐标位置
    drawText(ctx, text = 'hello world', color = '#000000', fontSize = 32, x = 20, y = 20) {
        let rem = this.rem;
        return new Promise(function (resolve, reject) {
            ctx.setFontSize(rem(fontSize));
            ctx.setFillStyle(color);
            ctx.fillText(text, x, y);
            resolve('text-success');
        });
    },

    //Canvas，图片资源，X 轴坐标位置，Y 轴坐标位置，宽度，高度，圆形
    drawImg(ctx, src = "http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg", dx = 0, dy = 0, dWidth = 100, dHeight = 100, circle = false) {
        let rem = this.rem;
        return new Promise((resolve, reject) => {
            wx.getImageInfo({
                src,
                success(res) {
                    if (circle) {
                        // 圆形切割-开始
                        ctx.save();
                        ctx.beginPath();
                        //arc(x坐标，y坐标，半径，起始弧度，起始弧度，顺时针/逆时针)
                        ctx.arc(rem(dx) + rem(dWidth) / 2, rem(dy) + rem(dWidth) / 2, rem(dWidth) / 2, 0, Math.PI * 2, false);
                        ctx.clip();
                        // 圆形切割-结束
                        ctx.drawImage(res.path, rem(dx), rem(dy), rem(dWidth), rem(dHeight));
                        ctx.restore();
                    } else {
                        ctx.drawImage(res.path, rem(dx), rem(dy), rem(dWidth), rem(dHeight));
                    }
                    resolve(res);
                },
                fail() {
                    reject();
                }
            });
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log('onReady');
        //初始化ctx
        let that = this;
        let ctx = wx.createCanvasContext('myCanvas');
        ctx.setFillStyle('#fff');
        that.drawText(ctx, 'abc', 'red', 32, 100, 200).then(function (res) {
            return that.drawText(ctx, 'def', 'red', 32, 200, 200);
        }).then(function (res) {
            return that.drawImg(ctx, 'https://img.58cdn.com.cn/weixin/img/wechat-app/operator/hongbao.png', 200, 500, 200, 200);
        }).then(function (res) {
            return that.drawImg(ctx, 'https://wx1.sinaimg.cn/orj360/5ba8d1cbgy1fu1fultpj9j223r23rqv5.jpg', 50, 50, 200, 200, true);
        }).then(function (res) {
            return that.drawImg(ctx, 'https://img.58cdn.com.cn/weixin/img/wechat-app/operator/hongbao.png', 200, 800, 200, 200, true);
        }).then(function (res) {
            return that.drawImg(ctx, 'https://img.58cdn.com.cn/weixin/img/weapp-tongzhen/index/muying.png', 350, 50, 200, 200, true);
        }).then(function (res) {
            return that.drawImg(ctx);
        }).then(function (res) {
            ctx.draw();
        }).catch(function (error) {
            console.log(error);
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('onShow');
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