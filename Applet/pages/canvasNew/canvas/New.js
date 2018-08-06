// pages/canvasNew/canvas/New.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cover:{
                    width_r:100,
                    height_r:100,
                    src:'https://img.58cdn.com.cn/weixin/img/wechat-app/operator/hongbao.png'
                },
        windowWidth:wx.getSystemInfoSync().windowWidth,
        windowHeight:wx.getSystemInfoSync().windowHeight,
        ctx:'',
        rem:''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onLoad');
    },

    rem(size) {
        return this.data.windowWidth * size / 750
    },
    //文本，颜色，字号，x坐标位置，y坐标位置
    textFun(text,color, fontSize,x,y) {
        let ctx = this.data.ctx;
        let rem = this.data.rem;
        ctx.setFontSize(rem(fontSize));
        ctx.setFillStyle(color);
        ctx.fillText(text, x, y)
    },

    tempFile(src){
        return new Promise((resolve, reject) => {
            wx.getImageInfo({
                src,
                success(res) {
                    resolve(res);
                },
                fail() {
                    reject();
                }
            });
        })
    },


    //图片资源， X 轴的位置， Y 轴的位置，宽度，高度
    imgFun(src, dx, dy, dWidth, dHeight) {
        let ctx = this.data.ctx;
        let rem = this.data.rem;
        console.log();
        this.tempFile(src).then(function (res) {
            console.log(res.path);
            ctx.drawImage(res.path, rem(dx), rem(dy), rem(dWidth), rem(dHeight));
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log('onReady');
        //初始化ctx
        var ctx = wx.createCanvasContext('myCanvas');
        ctx.setFillStyle('#fff');
        /*ctx.fillRect(0, 0, this.data.windowWidth, this.data.windowHeight);

        this.setData({
            ctx: ctx,
            rem:this.rem
        });*/
        //绘制文本
        // this.textFun('abcde','red',32,100,200);

        this.imgFun('https://img.58cdn.com.cn/weixin/img/wechat-app/operator/hongbao.png', 20, 10, 200, 200);



        //绘制图片圆角
        // var cover = this.data.cover



        wx.downloadFile({
            url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
            success: function(res) {
                ctx.save()
                ctx.beginPath()
                ctx.arc(50, 50, 25, 0, 2*Math.PI)
                ctx.clip()
                ctx.drawImage(res.tempFilePath, 25, 25)
                ctx.restore()
                ctx.draw()
            }
        })

        /*//圆形切割-开始
        ctx.save();
        ctx.beginPath();
        ctx.arc(cover.height_r / 2, cover.height_r / 2, cover.height_r / 2, 0, Math.PI * 2, false);
        ctx.clip();
        //圆形切割-结束
        this.imgFun(cover.src, 0, 0, cover.width_r, cover.height_r);
        ctx.restore();
        ctx.draw();*/

        //后面改成Promise
        /*setTimeout(function () {

        },2000)*/
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
})
/*
*ToDo
* 1.ctx不能放到data里面；
* 2.promose实现；
* 3.rem是不是也不能放在data;
* */