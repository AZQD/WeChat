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
            title: '文字违规哦',
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
  return Promise.all(imgsArr.map(item => cloudImgCheck(item))).then((res) => {
    let flag = !res.includes(false);
    if (flag) {
      // wx.showToast({
      //   title: '图片符合规范',
      // });
    } else {
      wx.showToast({
        icon: 'none',
        title: '图片违规哦',
      })
    }
    return flag
  });
};


// 将本地资源上传至云存储空间
const cloudUploadFile = (img = '') => {

  return new Promise(function (resolve, reject) {
    wx.cloud.uploadFile({
      cloudPath: `customerServiceMessage/${Date.now()}.png`, // 上传至云端的路径
      filePath: res.tempFilePaths[0], // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log('获取fileID：', res.fileID);
        this.setData({fileID: res.fileID});
        wx.cloud.getTempFileURL({
          fileList: [fileid],
          success: res => {
            console.log(33, res);
            console.log(33, res.fileList);
            that.setData({
              //res.fileList[0].tempFileURL是https格式的路径，可以根据这个路径在浏览器上下载
              imgSrc: res.fileList[0].tempFileURL
            });
          },
          fail: err => {
            console.log(err);
          }
        })
      },
      fail: console.error
    });
  });
};


const cloudUploadFileFun = (cloudPath) => {
  wx.chooseImage({
    success: res => {
      wx.cloud.uploadFile({
        cloudPath: `customerServiceMessage/${Date.now()}.png`, // 上传至云端的路径
        filePath: res.tempFilePaths[0], // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          console.log('获取fileID：', res.fileID);
          this.setData({fileID: res.fileID});
          wx.cloud.getTempFileURL({
            fileList: [fileid],
            success: res => {
              console.log(33, res);
              console.log(33, res.fileList);
              that.setData({
                //res.fileList[0].tempFileURL是https格式的路径，可以根据这个路径在浏览器上下载
                imgSrc: res.fileList[0].tempFileURL
              });
            },
            fail: err => {
              console.log(err);
            }
          })
        },
        fail: console.error
      });
    }
  });
};


// 调用的时候，可以使用 fun.then，也可以使用async, await
export {
  cloudTextCheck,
  cloudImgArrCheck
};