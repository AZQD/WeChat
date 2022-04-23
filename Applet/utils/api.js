let API_HOST = "http://xxx.com/xxx";
let DEBUG = true;//切换数据入口
var Mock = require("mockjs");

// 使用require引入NPM包的方式：如使用mockjs
// 1. npm install mockjs --save (注意：不能用--save-dev)
// 2.微信开发者工具的 工具=>构建npm 即可；

function ajax (url = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: API_HOST + url,
      method: method ? method : 'get',
      data: {},
      header: header ? header : {"Content-Type": "application/json"},
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    let res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|10': [{
        'id|+1': 1,
        'img': "@image('200x100', '#4A7BF7','#fff','pic')",
        'title': '@ctitle(3,8)',
        'city': "@county(true)",
        'stock_num': '@integer(0,100)',//库存数量
        'marketing_start': '@datetime()',
        'marketing_stop': '@now()',
        'price': '@integer(100,2000)',//现价，单位：分
        'original_price': '@integer(100,3000)'
      }]
    });
    // 输出结果
    // console.log(JSON.stringify(res, null, 2));
    fn(res);
  }
}

module.exports = {
  ajax: ajax
};
