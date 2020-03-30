// pages/shop/shopList/shopList.js
let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ossDomain: appUtils.globalData.ossDomain,
    BASECOLOR: appUtils.globalData.BASECOLOR,
    addressId: '', // 如果为编辑时使用
    consignee: '', // 收货人
    contact: '', // 联系方式,
    pickerAddress: {
      code: [],
      value: []
    }, // 省市区选择器
    detailAddress: '', // 详细地址
    addressStatus: 2 // 收货地址默认状态（1：是；2：否）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options);
    let addressId = Number(options.addressId);
    if (addressId) {
      this.setData({addressId});
      wx.setNavigationBarTitle({
        title: '编辑地址'
      });
      this.getAddressItem();
    } else {
      wx.setNavigationBarTitle({
        title: '新建地址'
      });
    }
  },

  // 获取地址详情（编辑使用）
  getAddressItem () {
    appUtils.post(api.address_item, {
      addressId: this.data.addressId
    }).then((res) => {
      console.log('获取地址详情（编辑使用）', res);
      this.setData({
        consignee: res.consignee,
        contact: res.contact,
        pickerAddress: {
          code: [res.provinceId, res.cityId, res.districtId],
          value: [res.provinceName, res.cityName, res.districtName]
        },
        detailAddress: res.address,
        addressStatus: res.addressStatus
      });
    });
  },

  // 收货人
  consigneeFun (e) {
    this.setData({
      consignee: e.detail.value
    });
  },

  // 联系方式
  contactFun (e) {
    this.setData({
      contact: e.detail.value
    });
  },

  // 省市区选择器
  bindRegionChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      pickerAddress: e.detail
    });
  },

  // 详细地址
  detailAddressFun (e) {
    this.setData({
      detailAddress: e.detail.value
    });
  },

  // 设置为默认地址
  switchChange (e) {
    console.log(e);
    console.log(e.detail);
    this.setData({
      addressStatus: e.detail ? 1 : 2
    });
  },

  // 新增/编辑保存
  saveAddressFun () {
    return;
    let {addressId, consignee, contact, pickerAddress, detailAddress, addressStatus} = this.data;
    console.log(this.data);
    if (consignee) {
      if (appUtils.regExpPhone(contact)) {
        if (pickerAddress.code) {
          if (detailAddress) {
            let params = {
              consignee,
              contact,
              provinceId: pickerAddress.code[0],
              cityId: pickerAddress.code[1],
              districtId: pickerAddress.code[2],
              provinceName: pickerAddress.value[0],
              cityName: pickerAddress.value[1],
              districtName: pickerAddress.value[2],
              address: detailAddress,
              addressStatus
            };
            if (addressId) { // 编辑
              Object.assign(params, {addressId});
            }
            appUtils.post(addressId ? api.address_update : api.address_add,
              params
            ).then((res) => {
              console.log(addressId ? '编辑成功' : '添加成功', res);
              let shippingAddress = wx.getStorageSync('shippingAddress');
              if (shippingAddress.addressId === addressId) { // 如果编辑的是storage中的这条，则更新；
                wx.setStorageSync('shippingAddress', Object.assign(shippingAddress, params));
              }
              wx.navigateBack(); // 返回上一个页面
            });

          } else {
            appUtils.tips.toast('请填写详细地址');
          }
        } else {
          appUtils.tips.toast('请选择所在区域');
        }
      } else {
        appUtils.tips.toast('请校验联系方式');
      }
    } else {
      appUtils.tips.toast('请填写收货人');
    }
  },

  // 删除地址
  deleteAddressFun () {
    let addressId = this.data.addressId;
    appUtils.tips.confirm('', '确认删除当前地址吗？', () => {
      appUtils.post(api.address_delete,
        {addressId}
      ).then((res) => {
        console.log('删除成功', res);
        let shippingAddress = wx.getStorageSync('shippingAddress');
        if (shippingAddress.addressId === addressId) { // 如果删除的是storage中的这条，则删除；
          wx.removeStorageSync('shippingAddress');
        }
        wx.navigateBack(); // 返回上一个页面
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
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000);
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