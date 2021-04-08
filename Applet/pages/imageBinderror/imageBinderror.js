Page({
  data: {
    singleImg: "https://img.58cdn.com.cn/weixin/r/business/userCenter/single_error.png",

    listData: [
      {
        img: "https://img.58cdn.com.cn/weixin/r/business/userCenter/menu00_error.png",
      },
      {
        img: "https://img.58cdn.com.cn/weixin/r/business/userCenter/menu01_error.png",
      },
      {
        img: "https://img.58cdn.com.cn/weixin/r/business/userCenter/menu02_error.png",
      }
    ],
  },
  errImg: function (e) {
    let _errImg = e.target.dataset.errImg;
    console.log('_errImg', _errImg);
    let _errObj = {};
    _errObj[_errImg] = "https://img.58cdn.com.cn/weixin/r/tongzhen/58logo.png";
    console.log('_errObj', _errObj);
    this.setData(_errObj);
  }
});