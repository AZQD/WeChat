//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {

  },
    toGame:function(){
        wx.navigateTo({
            url: '/pages/game/game'
        })
    },
    toIndex:function(){
        wx.navigateTo({
            url: '/pages/index/index'
        })
    },
    toAbout:function(){
        wx.navigateTo({
            url: '/pages/about/about'
        })
    }
})
