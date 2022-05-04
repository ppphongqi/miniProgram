
const app = getApp()
let content = ''
Page({

  data: {
  },

  onLoad: function (options) {
    this.setData({
      openid : app.globalData.openid,
      })
      
    console.log(options.id)
    this.data.id = options.id
    
    this.getDetail()
  },
  getDetail(){
    var that = this;
    wx.cloud.database().collection('actions').doc(this.data.id).get({
      success(res){

        console.log(res)
        var action = res.data
        action.time = util.formatTime(new Date(action.time))

        for(var l in action.prizeList){
          if(action.prizeList[l].openid == app.globalData.openid){
            action.isPrized = true
          }
        }

        for(var l in action.commentList){
          action.commentList[l].time = util.formatTime(new Date(action.commentList[l].time))
        }

        that.setData({
          action: res.data
        })

      }
    })
  },
  getInputValue(event){
    console.log(event.detail.value)
    this.data.inputValue = event.detail.value
  },

  
  publishVideoComment(){
    var that = this;
    console.log(that.data.id)
    if(app.globalData.userInfo == null){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }else {

      var that = this;
      console.log(that.data.id)
      wx.cloud.database().collection('actions').doc(that.data.id).get({
        success(res){
          console.log(res)
          var action = res.data
          var videocomment = {}
          videocomment.nickName = app.globalData.userInfo.nickName
          videocomment.faceImg = app.globalData.userInfo.avatarUrl
          videocomment.text = that.data.inputValue
          videocomment.time = new Date.now()
          action.videocommentList.push(videocomment)
          wx.cloud.database().collection('actions').doc(that.data.id).update({
            data: {
              videocommentList: action.videocommentList
            },
            success(res){
              console.log(res)
              wx.showToast({
                title: '评论成功！',
              })
              that.getDetail()
            }
          })
        }
      })
    }
}
 
})