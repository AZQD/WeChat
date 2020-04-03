let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
let app = getApp();
Page({
  data: {
    ossDomain: appUtils.globalData.ossDomain,
    userInfoData: {},
    walletBlance: 0, // 钱包余额
    integralBlance: 0, // 积分余额

    showShadow: false,

    closeMini: false, // 关闭掉小程序

    showSkeleton: true,

  },
  onLoad: function () {
    // 定义主题色
    app.baseColorFun().then(res => {
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 前景颜色值，仅支持 #ffffff 和 #000000
        backgroundColor: res, // 背景颜色值，有效值为十六进制颜色
      });
      this.setData({BASECOLOR: res});
    });

    setTimeout( () => {
      this.setData({
        showSkeleton: false
      })
    }, 1500);
  },

  onShow () {
    let users = wx.getStorageSync('users');
    this.setData({
      userInfoData: users
    });
    this.getWalletBlance();
    this.getIntegralBlance();
  },

  // 获取钱包余额
  getWalletBlance: function () {
    appUtils.post(api.wallet_blance).then((res) => {
      console.log('钱包余额', res);
      this.setData({
        walletBlance: res.balance
      });
    });
  },

  // 获取积分余额
  getIntegralBlance: function () {
    appUtils.post(api.integral_balance).then((res) => {
      console.log('积分余额', res);
      this.setData({
        integralBlance: res.balance
      });
    });
  },

  // 页面跳转
  jumpPageFun: function (e) {
    let type = Number(e.currentTarget.dataset.type);
    let url;
    if (type === 1) {
      let from = Number(e.currentTarget.dataset.from);
      url = '/pages/mine/myWallet/myWallet';
      if (from) {
        url = url + '?from=' + from;
      }
    } else if (type === 2) {
      url = '/pages/mine/recharge/recharge';
    } else if (type === 3) {
      url = '/pages/mine/myIntegral/myIntegral';
    } else if (type === 4) {
      url = '/pages/purchaser/ask/myAsk/myAsk';
    } else if (type === 5) {
      url = '/pages/myOrder/myOrder';
      let orderStatus = Number(e.currentTarget.dataset.orderStatus);
      url = url + '?orderStatus=' + orderStatus;
    } else if (type === 6) {
      url = '/pages/mine/setting/setting';
    } else if (type === 7) {
      this.showShadowFun();
    } else if (type === 8) {
      url = '/pages/mine/question/question';
    } else if (type === 9) {
      url = '/pages/mine/about/about';
    } else if (type === 10) {
      url = '/pages/addressList/addressList?from=mine';
    } else if (type === 11) {
      this.showShadowFun();
      let phoneNumber = '4000000216';
      wx.showModal({
        content: phoneNumber,
        confirmText: '拨打',
        showCancel: true,
        success: function (sm) {
          if (sm.confirm) {
            wx.makePhoneCall({
              phoneNumber: phoneNumber
            });
          }
        }
      });
    }
    type === 10 && url && wx.navigateTo({url});
  },

  // 取消冒泡
  stopPropagation () {
    return;
  },

  // 遮罩显示隐藏
  showShadowFun () {
    this.setData({
      showShadow: !this.data.showShadow
    });
  },

  // 清空用户身份，调试使用
  userRoleClearFun: function () {
    appUtils.tips.confirm('', '确认清空吗？', () => {
      appUtils.post(api.user_role_clear).then((res) => {
        wx.clearStorage({
          success: (res) => {
            console.log('清理本地数据缓存', res);
            this.setData({
              closeMini: true
            });
          }
        });
        console.log('清空用户身份接口调用成功');
      });
    });
  },

  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  onShareAppMessage: function () {
    return {
      title: '天天招投标资质查询',
      path: '/pages/index/index'
    };
  }
});