// pages/record/record.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[]
  },
  getRecorList(){
   let req = {
     isRecording:2
   }
   let _this = this
    network.request(' category/cateOneListForWechat', req, function (res) {
      _this.setData({
        recordList:res.content
      })
    });
  },
  getDetail(event){
    console.log('执行了吗')
    let id = event.target.dataset.id
    let type = event.target.dataset.type
    let title = event.target.dataset.name
    console.log(event.target)
    var _this = this
    let req = {
      pageNo: 0,
      pageSize: 10,
      parentCategory: id
    }
    network.request('category/listForWechat', req, function (res) {
      if (res.code == '0003') {
        if (type == 2) {
          let req = {
            categoryId: id,
            pageNo: 0,
            pageSize: 1
          }
          network.request('product/listForWechat', req, function (res) {
            wx.navigateTo({
              url: '../wordCard/wordCard?id=' + res.content[0].id + '&title=' + title
            })
          });
        } else if (type == 1) {
          let req = {
            categoryId: id,
            pageNo: 0,
            pageSize: 10
          }
          wx.navigateTo({
            url: '../chilrenEnglish/chilrenEnglish?id=' + id + '&title=' + title
          })
        }
      } else if (res.code == '0000') {
        if (type == 2) {
          wx.navigateTo({
            url: '../baseWord/baseWord'
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecorList()
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