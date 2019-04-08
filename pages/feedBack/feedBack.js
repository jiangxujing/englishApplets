var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:0,
    feedBackText:'',
    feedAcitve:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getInputNumer(event){
      this.setData({
        number: event.detail.cursor,
        feedBackText: event.detail.value,
        feedAcitve:true
      })
  },
  submit(){
    let _this = this
    if (this.data.feedBackText){
      let req = {
        content: _this.data.feedBackText
      }
      network.request('feedback/feedbackInsertForWechat', req, function (res) {
        if (res.code == '0000') {
          wx.showToast({
            title: '感谢反馈',
            icon: 'none',
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                })
              }, 1000)
            }
          })

        }
      });
    }else{
      wx.showToast({
        title: '请填写内容',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})