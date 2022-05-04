
Page({
  data: {

  },
  onLoad: function (options) {

  },

  toindex(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  totest(){
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },
  tovideo(){
    wx.navigateTo({
      url: '/pages/video/video',
    })
  },
  toremarks(){
    wx.navigateTo({
      url: '/pages/remarks/remarks',
    })
  }
})