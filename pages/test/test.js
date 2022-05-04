
Page({
  bindchange(e){
    console.log(e.detail.value);
  },
  data: {
    subjectList:[
      // 题目， 正确答案
      { text: '第一题', right: 2},
      { text: '第一题', right: 3},
      { text: '第一题', right: 2},
      { text: '第一题', right: 3},
      { text: '第一题', right: 2},
      { text: '第一题', right: 3},
      { text: '第一题', right: 2},
      { text: '第一题', right: 3},
      { text: '第一题', right: 2},
      { text: '第一题', right: 3},
    ],
    answerList: [0,0,0,0,0,0,0,0,0,0],
    score: 0, // 分数
    result: false, // 已提交?
    message: '', // 提示信息
  },

  onLoad: function (options) {

  },

  chooseAnswer(e){
    let arr = this.data.answerList
    const { field } = e.target.dataset
    const { value } = e.detail
    arr[field] = value
    console.log(arr, '选中答案')
    this.setData({
      answerList: arr
    })
  },

  submitAnswer() {
    let flag = false // 是否答完
    let finalScore = 0 // 总分
    let finalMessage = ''

    this.data.answerList.forEach(item => {
      if(item == 0) {
        flag = true
        wx.showToast({
          icon:'none',
          title: '请回答全部题目!',
        }) 
      }
    })
    if(flag) return 
    this.data.subjectList.forEach((item, index) => {
      if(Number(item.right) == Number(this.data.answerList[index])){
        finalScore += 10
      }
    })
    if(finalScore >= 0 && finalScore <= 30){
      finalMessage = '您受到电信诈骗的几率较大'
    } else if(finalScore > 30 && finalScore <= 60) {
      finalMessage = '您受到电信诈骗的几率中等'
    } else {
      finalMessage = '您受到电信诈骗的几率很小'
    }


    wx.showToast({
      title: `您获得了${finalScore}分 ！`,
    }) 
    this.setData({
      score: finalScore,
      result: true,
      message: finalMessage
    })
    console.log(finalScore, '最终成绩')
  }
})

