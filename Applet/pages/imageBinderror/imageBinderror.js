var imageBinderrorUtil = require('../../utils/imageBinderrorUtil');

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

  // 第一种方式：写在当前组件，仅限当前组件使用
  // errImg: function (e) {
  //   let _errImg = e.target.dataset.errImg;
  //   console.log('_errImg', _errImg);
  //   let _errObj = {};
  //   _errObj[_errImg] = "https://img.58cdn.com.cn/weixin/r/tongzhen/58logo.png";
  //   console.log('_errObj', _errObj);
  //   this.setData(_errObj);
  // },

  // 第一种方式：写在common.js组件，所有组件可使用
  errImg: function (e) {
    //需要访问当前页面的数据对象传递到其它页面上
    imageBinderrorUtil.errImgFun(e, this, 'https://img.58cdn.com.cn/weixin/r/tongzhen/tongzhen-logo.png');
  },
});