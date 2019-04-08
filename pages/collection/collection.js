var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carshow:true,
    currentIndex:0,
    cardList:[],
    audioList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('optionsoptionsoptionsoptionsoptionsoptionsoptions' + JSON.stringify(options))
    if (options.flag == 1){
      this.getRecordList()
    } else if (options.flag == 0){
      this.getCollection()
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
    
  },
  chooseItem(e){
    let index = e.currentTarget.dataset.id
    if (index == 0){
      this.setData({
        carshow: true,
        currentIndex: 0
      })
    }else if(index ==1){
      this.setData({
        carshow: false,
        currentIndex: 1
      })
    }
  },
 getCollection(){
   let _this = this
   let req = {
     pageNo:0,
     pageSize:10
   }
   network.request('product/favoriteListForWechat', req, function (res) {
     _this.setData({
       audioList: res.content.audio,
       cardList:res.content.card
     })
   });
 },
 getRecordList(){
   let _this = this
   let req = {
     pageNo: 0,
     pageSize: 10
   }
   network.request('productRecord/recordingListForWechat', req, function (res) {
     _this.setData({
       audioList: res.content.audio,
       cardList: res.content.card
     })
   });
 },
  getCardDetail(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../wordCard/wordCard?id=' + id + '&title=' + title
    })
  },
  getAudioDetail(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../audioPlay/audioPlay?id=' + id + '&title=' + title
    })
  }
})