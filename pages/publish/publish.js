const app = getApp()
Page({


  data: {
    cloudImgList:[],
    inputValue:'',
    localtion:'请选择位置',
    addresssInfo:{}
  },
  chooseVideo(e){
    var that = this;
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      compressed: false,
      camera: 'back',
      success(res) {
        console.log(res)
        console.log(res.tempFilePath.match(/\.(\w+)$/)[1])
        wx.showLoading({
          title: '上传中',
        })
        wx.cloud.uploadFile({
          cloudPath:`actionVideos/${Math.random()}_${Date.now()}.${res.tempFilePath.match(/\.(\w+)$/)[1]}`,
          filePath: res.tempFilePath,
          success(suc){
            console.log(suc.fileID)
            that.setData({
              videoUrl:suc.fileID
            })
            wx.hideLoading({})
          }
        })
      }
    })
  },
  chooseAddress(){
    var that = this;
    wx.chooseLocation({
      success(res){
        console.log(res)
        
        that.setData({
          localtion:res.address + res.name,
          addresssInfo:res
        })

        if(res.address==""){
          that.setData({
            localtion:"请选择位置"
          })
        }
      }
    })
  },

  onLoad: function (options) {

    console.log(app.globalData.userInfo)

  },
  getValue(e){
    console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },
  chooseImage(){
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.cloudImgList.length,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success(res){

        console.log(res)
        console.log(res.tempFilePaths)
        //上传图片
        that.data.tempImgList = res.tempFilePaths
        that.uploadImages()
      }
    })

  },
  uploadImages(){
    console.log(123)
    var that = this;
    for(var i = 0 ; i< this.data.tempImgList.length; i++){
      console.log(123)
      wx.cloud.uploadFile({
        cloudPath:`actionImages/${Math.random()}_${Date.now()}.${that.data.tempImgList[i].match(/\.(\w+)$/)[1]}`,
        filePath: that.data.tempImgList[i],
        success(res){
          console.log(123)
          console.log(res.fileID)
          that.data.cloudImgList.push(res.fileID)
          that.setData({
            cloudImgList:that.data.cloudImgList
          })
        }
      })
    }

  },
  deleteImg(e){
    console.log(e.currentTarget.dataset.index)
    this.data.cloudImgList.splice(e.currentTarget.dataset.index,1)
    this.setData({
      cloudImgList: this.data.cloudImgList
    })
  },

  submitData(){
    var that = this;
    wx.showLoading({
      title: '发布中',
      mask:'true'
    })
    if(!this.data.inputValue && !that.data.videoUrl&& this.data.cloudImgList.length ==0){
      wx.showToast({
        icon:'none',
        title: '发布为空',
      })
      return
    }
    wx.cloud.database().collection('actions').add({
      data: {
        nickName: app.globalData.userInfo.nickName,
        faceImg: app.globalData.userInfo.avatarUrl,
        text: this.data.inputValue,
        images: this.data.cloudImgList,
        time: Date.now(),
        prizeList: [],
        commentList: [],
        latitude: that.data.addresssInfo.latitude,
        longitude: that.data.addresssInfo.longitude,
        address: that.data.addresssInfo.address + that.data.addresssInfo.name,
        video: that.data.videoUrl
      },
      success(res){
        console.log(res)
        wx.navigateBack({
          success(res){
            wx.hideLoading({
              success: (res) => {},
            })
            wx.showToast({
              title: '发布成功！',
            })
          }
        })
      }

    })
  }
  
  


})