const util = require("../../utils/util")
const app = getApp()

Page({

  data: {
    inputValue: '',
    id: '',
    commentList: [],
  },

  onShow(){
    this.getComment()
  },

  onLoad: function (options) {
    this.setData({
      openid : app.globalData.openid,
    })
  },

  // 新增评论
  submitComment() {
    var that = this;
    if(app.globalData.userInfo == null){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
      // return 
    } else {

    wx.showLoading({
      title: '发布中',
      mask:'true'
    })
    if(!this.data.inputValue){
      wx.showToast({
        icon:'none',
        title: '评论为空',
      })
      return
    }
    wx.cloud.database().collection('videoComment').add({
      data: {
        nickName: app.globalData.userInfo.nickName,
        faceImg: app.globalData.userInfo.avatarUrl,
        text: this.data.inputValue,
        time: Date.now(),
      },
      success(res){
        wx.showToast({
          title: '评论发布成功！',
        })
        setTimeout(() => {
          that.getComment()
        }, 500)
      }
    })
  }
  },

  // 获取评论
  getComment() {
    let that = this
    wx.cloud.database().collection('videoComment').get({
      success(res){
        let arr = res.data
        arr.forEach(item => {
          item.time = util.formatTime(new Date(item.time))
        })
        that.setData({
          commentList :arr
        })
      }
    })
  },

  getInputValue(event){
    this.data.inputValue = event.detail.value
  },
})