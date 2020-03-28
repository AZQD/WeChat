let app = getApp();
let api = require('../api.js');

/**
 * Promise增加finally方法
 * @param callback
 * @returns {Promise<any>}
 */
Promise.prototype.finally = function (callback) {
  let Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
};

module.exports = {
  globalData: app.globalData, // 全局变量

  /**
   * 联系方式正则表达式
   * @param phone
   * @returns {boolean}
   */
  regExpPhone (phone) {
    let phoneReg = /^[1][3|4|5|7|8][0-9]{9}$/;
    return phoneReg.test(phone);
  },

  /**
   * 正整数正则表达式
   * @param number
   * @returns {boolean}
   */
  regExpPositiveInteger (number) {
    let intNumberReg = /^[1-9]\d*$/;
    return intNumberReg.test(number);
  },

  /**
   * 正数正则表达式（包含小数点）
   * @param number
   * @returns {boolean}
   */
  regExpPositiveNumber (number) {
    // let intNumberReg = /^(([1-9][0-9]*(\.\d{1,2})?)|(0\.\d{1,2}))$/; // 小数点后最多两位
    let intNumberReg = /^(([1-9][0-9]*(\.\d+)?)|(0\.\d+))$/; // 小数点后位数未限制
    return intNumberReg.test(number);
  },

  tips: {

    /**
     * toast提示
     * @param title
     * @param options
     */
    toast (title, options) {
      options = {
        duration: 1500,
        icon: 'none', // success(最对7个汉字), loading(最对7个汉字), none
        complete: null,
        close: null,
        mask: true,
        ...options
      };
      wx.showToast &&
      wx.showToast({
        title,
        ...options
      });
      options.close &&
      setTimeout(() => {
        options.close();
      }, options.duration);
    },

    /**
     * alert提示
     * @param title
     * @param content
     * @param options
     * @returns {Promise<any>}
     */
    alert (title, content, options = {}) {
      if (!content && title) {
        content = title;
        title = '提示';
      }
      return new Promise((resolve) => {
        wx.showModal &&
        wx.showModal({
          title,
          showCancel: false,
          confirmColor: '#FB0E04',
          content,
          success (res) {
            resolve(res.confirm);
          },
          ...options
        });
      });
    },

    /**
     * confirm提示
     * @param title
     * @param content
     * @param cb：用户点击确定
     * @param cancelCb：用户点击取消
     * @param options
     * @returns {Promise<any>}
     */
    confirm (title, content, cb, cancelCb, options = {}) {
      const args = arguments;
      return new Promise((resolve) => {
        wx.showModal &&
        wx.showModal({
          title,
          content,
          confirmColor: '#FB0E04',
          ...options,
          success: (res) => {
            if (res.confirm) {
              resolve(true);
              cb && cb.apply(this, args);
            } else {
              resolve(false);
              cancelCb && cancelCb.apply(this, args);
            }
          }
        });
      });
    }
  },

  /** get请求
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  get (url, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: {
          ...params,
          openid: app.globalData.openid
        },
        method: 'GET',
        success: function (data) {
          if (data.data.success) {
            resolve(data.data.body);
          } else {
            reject(data);
            console.log('请求失败：', data);
            console.log('url和params为：', url, params);
          }
        },
        fail: function (err) {
          reject(err);
          console.log('请求异常：', err);
          console.log('url和params为：', url, params);
        }
      });
    });
  },

  /**
   * post请求
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  post (url, params) {
    return new Promise((resolve, reject) => {
      if (app.globalData.openid) {
        this.realPost(url, params, resolve, reject);
      } else {
        // let timer = setInterval(() => {
        //   console.log('全局变量：app.globalData.openid=' + app.globalData.openid);
        //   if (app.globalData.openid) {
        //     this.realPost(url, params, resolve, reject);
        //     clearInterval(timer);
        //   }
        // }, 200);
      }
    });
  },

  realPost (url, params, resolve, reject) {
    wx.request({
      url: url,
      data: {
        ...params,
        wechatId: app.globalData.wechatId,
        openid: app.globalData.openid,
        sessionKey: wx.getStorageSync('sessionKey'),
        unionid: wx.getStorageSync('unionid')
      },
      method: 'POST',
      success: (data) => {
        if (data.data.success) {
          resolve(data.data.body);
        } else {
          reject(data);
          this.tips.toast(data.data.message); // 请求失败：错误提示
          console.log('请求失败：', data);
          console.log('url和params为：', url, params);
        }
      },
      fail: (err) => {
        reject(err);
        // this.tips.toast(err.errMsg); // 请求异常：错误提示
        console.log('请求异常：', err);
        console.log('url和params为：', url, params);
      }
    });
  },

  // 选择图片函数
  uploadImgFun: function (number = 1) {
    return new Promise((resolve, reject) => {
      let uploadImgArr = [];
      wx.chooseImage({
        count: number,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            wx.uploadFile({
              url: 'https://gateway.gongjian.mobi/file/upload',
              filePath: res.tempFilePaths[i],
              name: 'filePath', // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容，是后端预先定义的
              formData: {
                openid: app.globalData.openid
              },
              success (resp) {
                let data = JSON.parse(resp.data);
                if (data.success) {
                  uploadImgArr.push(data.body.image[0]);
                } else {
                  console.log(`第${i}张图片上传失败`);
                }
                if (i === res.tempFilePaths.length - 1) {
                  console.log('上传成功的图片数组：', uploadImgArr);
                  resolve(uploadImgArr);
                }
              },
              fail (error) {
                console.log('error', error);
              }
            });
          }
        }
      });
    });
  },

  // 选择视频函数
  uploadVideoFun () {
    return new Promise((resolve, reject) => {
      let uploadVideoArr = [];
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: function (res) {
          wx.uploadFile({
            url: 'https://gateway.gongjian.mobi/file/upload',
            filePath: res.tempFilePath,
            name: 'filePath', // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容，是后端预先定义的
            formData: {
              openid: app.globalData.openid
            },
            success (res) {
              let data = JSON.parse(res.data);
              if (data.success) {
                uploadVideoArr.push(data.body.video[0]);
                console.log('上传成功的视频数组：', uploadVideoArr);
                resolve(uploadVideoArr);
              } else {
                console.log('视频上传失败');
              }
            },
            fail (error) {
              console.log('error', error);
            }
          });
        }
      });
    });
  },

  // 订单创建+订单支付
  orderCreateFun (params) { // params:skuId必传
    return new Promise((resolve, reject) => {
      // 生成订单
      // notifyParams：是json 字符串，订单支付完成之后，进行回调逻辑处理的；
      // cartParams：是判断订单要买的东西；
      let postData = Object.assign({
        // number: 1, // 购买数量
        payId: 1, // 支付方式（1：微信；2：支付宝；3：余额；4：货到付款；5：积分支付；）
        wechatId: app.globalData.wechatId,
        openid: app.globalData.openid,
        sessionKey: wx.getStorageSync('sessionKey'),
        unionid: wx.getStorageSync('unionid')
      }, params);
      wx.request({
        url: api.order_create,
        data: postData,
        method: 'POST',
        success: (res) => {
          this.payHandleFun(res, postData, resolve);
        }
      });
    });
  },

  // 订单支付（已经有订单号）
  orderPayFun (params) { // params:orderCode必传
    return new Promise((resolve, reject) => {
      let postData = Object.assign({
        payId: 1, // 支付方式（1：微信；2：支付宝；3：余额；4：货到付款；5：积分支付；）
        wechatId: app.globalData.wechatId,
        openid: app.globalData.openid,
        sessionKey: wx.getStorageSync('sessionKey'),
        unionid: wx.getStorageSync('unionid')
      }, params);
      wx.request({
        url: api.order_pay,
        data: postData,
        method: 'POST',
        success: (res) => {
          this.payHandleFun(res, postData, resolve);
        }
      });
    });
  },

  // 支付处理逻辑
  payHandleFun (res, postData, resolve) {
    if (res.data.success) {
      if (res.data.body.orderStatus === 'ok') {
        if (postData.payId === 1) { // 微信
          let payItems = res.data.body.payItems;
          wx.requestPayment({
            appId: payItems.appid || '',
            timeStamp: payItems.timeStamp || '',
            nonceStr: payItems.nonce_str || '',
            package: payItems.package || '',
            signType: 'MD5' || '',
            paySign: payItems.paySign || '',
            success: (success) => {
              console.log('支付成功', success);
              resolve(res.data.body);
            },
            fail: (error) => {
              console.log('订单支付失败', error);
            }
          });
        } else if (postData.payId === 3) {
          if (res.data.body.payItems.transactionStatus) {// 交易成功
            resolve(res.data.body);
          } else {// 余额不足
            this.tips.toast(res.data.body.payItems.transactionMsg || '余额不足');
          }
        } else if (postData.payId === 5) { // 积分
          if (res.data.body.orderStatus === 'ok') {// 交易成功
            resolve(res.data.body);
          } else {// 余额不足
            this.tips.toast('交易失败');
          }
        }
      } else {
        this.tips.toast(res.data.body.orderMsg);
      }
    } else {
      this.tips.toast(res.data.message || '订单创建失败');
    }
  }
};
