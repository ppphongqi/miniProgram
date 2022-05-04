//app.js
App({
  
  // 0.开通云开发
  // 1.修改app.js里面环境名称
  // 2.上传云函数
  // 3.建立数据库表，actions

  onLaunch: function () {
    
    //云开发环境的初始化
    wx.cloud.init({
      env:"lgd0225-7gm96cjt08dc524e"
    })


    if(wx.getStorageSync('openid')){
      this.globalData.openid = wx.getStorageSync('openid')
    }

    if(wx.getStorageSync('userInfo')){
      this.globalData.userInfo = wx.getStorageSync('userInfo')
    }


    var that = this;
    wx.cloud.callFunction({
      name:'getUserOpenid',
      success(res){
        console.log(res.result.openid)
        that.globalData.openid = res.result.openid
        wx.setStorageSync('openid', res.result.openid)
      }
    })

  },


  globalData: {
    userInfo: null,
    openid:null
  }



})