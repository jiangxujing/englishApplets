var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detaiList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    
  },
  getDetail(e){
    console.log(e)
      let categoryId = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.name
    let req = {
      categoryId: categoryId,
      pageNo: 0,
      pageSize: 1
    }
    network.request('product/listForWechat', req, function (res) {
      wx.navigateTo({
        url: '../wordCard/wordCard?id=' + res.content[0].id + '&title=' + title
      })
    });
   
  },
  getList(){
    let req = {
      parentCategory:2,
      pageNo:0,
      pageSize:10
    }
    let _this = this
    network.request('category/listForWechat', req, function (res) {
      _this.setData({
        detaiList:res.content
      })

    });
  }
})