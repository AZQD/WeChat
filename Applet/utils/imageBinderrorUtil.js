/**
 * 图片加载容错：远程图片no found情况下指引
 * @param e
 * @param that
 * @param replaceUrl
 */
function errImgFun(e, that, replaceUrl) {
  let _errImg = e.target.dataset.errImg;
  console.log('_errImg', _errImg);
  let _errObj = {};
  _errObj[_errImg] = replaceUrl || "https://img.58cdn.com.cn/weixin/r/tongzhen/58logo.png";
  console.log('_errObj', _errObj);
  that.setData(_errObj);
}

module.exports = {
  errImgFun
};