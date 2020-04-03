let newapiroot = 'https://gateway.test.mobi/';
let api = {

  // 天天商城

  // 地址
  address_page: 'address/page', // 1.4.1.收货地址分页列表ok
  address_add: 'address/add', // 1.4.2.收货地址添加ok
  address_update: 'address/update', // 1.4.3.收货地址修改 默认地址修改无效
  address_item: 'address/item', // 1.4.4.收货地址详情 ok
  address_delete: 'address/delete', // 1.4.5.收货地址删除 ok

  // 1.1.商品
  goods_market_item: 'goods/market/item', // 1.1.2.商品详情ok

  // 1.1.积分
  integral_balance: 'integral/balance', // 1.1.1.积分余额，格式不正确

  // 1.1.订单
  order_page: 'order/page', // 1.1.1.订单分页列表
  order_create: 'order/create', // 1.1.2.订单创建
  order_cancel: 'order/cancel', // 1.1.3.取消订单
  order_delete: 'order/delete', // 1.1.4.删除订单
  order_pay: 'order/pay', // 1.1.5.订单支付
  order_item: 'order/item', // 1.1.7.订单详情
  order_cart: 'order/cart', // 1.1.8.订单购物车预算
  order_message_delivery: 'order/message/delivery', // 1.1.9.提醒发货
  order_finish: 'order/finish', // 1.1.10.确认收货

  // 1.2.购物车
  cart_page: 'cart/page', // 1.2.1.购物车分页列表
  cart_update: 'cart/update', // 1.2.2.购物车修改
  // cart_number: 'cart/number', // 1.2.3.购物车商品数量

  // 1.1.钱包
  wallet_blance: 'wallet/blance', // 钱包余额ok

};
for (let key in api) {
  api[key] = newapiroot + api[key];
}
module.exports = api;