var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    englishList:[]
  },
  getAudioDetail(event) {
    console.log('aaa' + JSON.stringify(event.target.dataset.id))
    let id = event.target.dataset.id
    wx.navigateTo({
      url: '../audioPlay/audioPlay?fromFlag=0&&id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let req = {
      categoryId: options.id,
      pageNo:0,
      pageSize:10
    }
    var _this = this
    network.request('product/listForWechat', req, function (res) {
      _this.setData({
        englishList: res.content,
      })
    });
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