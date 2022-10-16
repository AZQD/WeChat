// 调用ContentCheck云函数检查文字是否违规
const cloudTextCheck = (msg = '') => {
  return new Promise(function (resolve, reject) {
    wx.cloud.callFunction({
      name: 'ContentCheck',
      data: {
        msg,
        // msg: '特3456书yuuo莞6543李zxcz蒜7782法fgnv级完2347全dfji试3726测asad感3847知qwez到',
      },
      success (res) {
        console.log('检查文本内容是否违规：', res.result);
        if (res.result.msgR && res.result.msgR.errCode === 0) {
          // wx.showToast({
          //   title: '文字符合规范',
          // });
          resolve(true);
        } else if (res.result.errCode === 87014) {
          wx.showToast({
            icon: 'none',
            title: '文字违规！',
          });
          resolve(false);
        } else {
          resolve(false);
        }
      }
    })
  });
};


// 调用ContentCheck云函数，检查单张图片是否违规
const cloudImgCheck = (img = '') => {

  return new Promise(function (resolve, reject) {
    wx.cloud.callFunction({
      name: 'ContentCheck',
      data: {
        img,
      },
      success (res) {
        console.log('检查图片内容是否违规：', res.result);
        if (res.result.imageR && res.result.imageR.errCode === 0) {
          // wx.showToast({
          //   title: '图片符合规范',
          // });
          resolve(true);
        } else if (res.result.errCode === 87014) {
          // wx.showToast({
          //   icon: 'none',
          //   title: '图片违规',
          // })
          resolve(false);
        } else {
          resolve(false);
        }
      }
    })
  });
};


// 使用Promise.all遍历，检查多张图片是否违规
const cloudImgArrCheck = (imgsArr = []) => {
  return new Promise(function (resolve, reject) {
    Promise.all(imgsArr.map(item => cloudImgCheck(item))).then((res) => {
      let flag = !res.includes(false);
      if (flag) {
        // wx.showToast({
        //   title: '图片符合规范',
        // });
      } else {
        wx.showToast({
          icon: 'none',
          title: '图片违规！',
        })
      }
      resolve(flag);
    });
  });
};


/*********************************************/


// 将本地资源上传至云存储空间（上传一张图片）(获取fileID，可以再小程序中展示)
const cloudUploadFile = (filePath = '', cloudPath = '', fileName = '') => {
  return new Promise(function (resolve, reject) {
    wx.cloud.uploadFile({
      filePath, // 小程序临时文件路径
      cloudPath: `${cloudPath || 'common'}/${fileName || Date.now()}.png`, // 上传至云端的路径
      success: res => {
        console.log('获取fileID：', res.fileID);// 返回文件 ID
        resolve(res.fileID);
      }
    });
  });
};


// 使用Promise.all遍历
// 将本地资源上传至云存储空间（上传多张图片）(获取fileID和tempFileURL，都可以再小程序中展示，tempFileURL在浏览器中可访问)
const cloudUploadFileArr = (filePathArr = [], cloudPath = '', fileName = '') => {
  return new Promise(function (resolve, reject) {
    Promise.all(filePathArr.map(item => cloudUploadFile(item, cloudPath, fileName))).then((fileIDArr) => {
      wx.cloud.getTempFileURL({
        fileList: fileIDArr,
        success: res => {
          if(res.errMsg === 'cloud.getTempFileURL:ok'){
            console.log('图片信息：', res.fileList);
            resolve(res.fileList);
          }
        }
      })
    });
  });
};


// 调用的时候，可以使用 fun.then，也可以使用async, await
export {
  cloudTextCheck,
  cloudImgCheck,
  cloudImgArrCheck,

  cloudUploadFile,
  cloudUploadFileArr
};
