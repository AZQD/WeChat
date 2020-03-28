let newapiroot = 'https://gateway.gongjian.mobi/';
let api = {

  // 天天商城

  /**
   * 历史
   */

  user_role_clear: 'user/role/clear', // 清空用户身份，调试使用
  sku_list: 'sku/list', // 微信充值SKU列表

  /**
   * purchaser/v1
   */

  // 1.1.询价
  purchaser_material_create: 'purchaser/material/create', // 1.1.1.询价发起//ok
  purchaser_material_item: 'purchaser/material/item', // 1.1.2.询价详情
  purchaser_material_page: 'purchaser/material/page', // 1.1.3.询价分页列表
  purchaser_material_update: 'purchaser/material/update', // 1.1.4.询价修改
  purchaser_material_unit: 'purchaser/material/unit', // 1.1.5.询价数量单位列表//ok
  purchaser_material_create_image: 'purchaser/material/create/image', // 1.1.6.拍照询价
  purchaser_material_item_image: 'purchaser/material/item/image', // 1.1.7.拍照询价详情

  // 1.1.采购商
  purchaser_register: 'purchaser/register', // 1.1.1.采购商注册ok
  purchaser_status: 'purchaser/status', // 1.1.2.采购商状态//可以不用
  purchaser_item: 'purchaser/item', // 1.1.3.采购商详情//ok
  purchaser_update: 'purchaser/update', // 1.1.4.采购商更新//ok


  /**
   * supplier/v1
   */

  // 1.1.我的商品
  supplier_goods_page: 'supplier/goods/page', // 1.1.1.商品分页列表

  // 1.1.抢单
  supplier_material_page: 'supplier/material/page', // 1.1.1.抢单分页列表

  // 1.2.我的抢单
  supplier_material_create: 'supplier/material/create', // 1.2.1.抢单创建
  supplier_material_order_page: 'supplier/material/order/page', // 1.2.2.已抢单分页列表

  // 1.1.供应商
  supplier_register: 'supplier/register', // 1.1.1.供应商注册
  supplier_status: 'supplier/status', // 1.1.2.供应商状态
  supplier_item: 'supplier/item', // 1.1.3.供应商详情
  supplier_update: 'supplier/update', // 1.1.4.供应商更新

  /**
   * v1
   */

  // 地址
  address_page: 'address/page', // 1.4.1.收货地址分页列表ok
  address_add: 'address/add', // 1.4.2.收货地址添加ok
  address_update: 'address/update', // 1.4.3.收货地址修改 默认地址修改无效
  address_item: 'address/item', // 1.4.4.收货地址详情 ok
  address_delete: 'address/delete', // 1.4.5.收货地址删除 ok

  // 文件上传
  file_upload: 'file/upload', // 文件上传 ok

  // 1.1.商品
  goods_market_page: 'goods/market/page', // 1.1.1.商品分页列表ok
  goods_market_item: 'goods/market/item', // 1.1.2.商品详情ok
  goods_market_category: 'goods/market/category', // 1.1.3.商品栏目ok

  // 1.1.首页
  index_market_wechat: 'index/market/wechat', // 1.1.1.天天商城

  // 1.1.积分
  integral_balance: 'integral/balance', // 1.1.1.积分余额，格式不正确
  integral_page: 'integral/page', // 1.1.2.积分分页明细，空数组，无返回值结构
  // 1.2.积分商品
  integral_exchange_page: 'integral/exchange/page', // 1.2.1.积分可兑换分页列表 ok
  integral_exchange_rand: 'integral/exchange/rand', // 1.2.2.积分可兑换随机记录 ok

  // 1.1.订单
  order_page: 'order/page', // 1.1.1.订单分页列表
  order_create: 'order/create', // 1.1.2.订单创建
  order_cancel: 'order/cancel', // 1.1.3.取消订单
  order_delete: 'order/delete', // 1.1.4.删除订单
  order_pay: 'order/pay', // 1.1.5.订单支付
  order_evaluate: 'order/evaluate', // 1.2.6.订单评价
  order_item: 'order/item', // 1.1.7.订单详情
  order_cart: 'order/cart', // 1.1.8.订单购物车预算
  order_message_delivery: 'order/message/delivery', // 1.1.9.提醒发货
  order_finish: 'order/finish', // 1.1.10.确认收货
  order_refund_apply: 'order/refund/apply', // 1.1.11.退款申请


  // 1.2.购物车
  cart_page: 'cart/page', // 1.2.1.购物车分页列表
  cart_update: 'cart/update', // 1.2.2.购物车修改
  cart_number: 'cart/number', // 1.2.3.购物车商品数量

  // 1.1.钱包
  wallet_blance: 'wallet/blance', // 钱包余额ok
  wallet_page: 'wallet/page', // 钱包分页记录 ok
  wallet_page_receipt: 'wallet/page/receipt', // 充值分页记录 ok
  wallet_page_disburse: 'wallet/page/disburse', // 消费分页记录 ok


  // 1.1.用户 wechat
  wechat_code: 'wechat/code', // 1.1.1.用户CODE ok
  wechat_register: 'wechat/register', // 1.1.2.用户注册ok
  wechat_login: 'wechat/login', // 1.1.3.用户登录ok
  wechat_update: 'wechat/update', // 1.1.4.用户更新ok
  wechat_user_info: 'wechat/user/info' // 获取用户信息ok

};
for (let key in api) {
  api[key] = newapiroot + api[key];
}
module.exports = api;