// index.js
var network = require("../../utils/network.js")
Page({
  data: {
    imgUrls: [],
     fengmian: '/images/zimujiazu.png',
    mode:"aspectFit",
    fieldList:[],
    hotList:[],
    imgUrl:'',
    isLogin:false
  },
  onLoad(options) {
    console.log('嘻嘻')
    if (!wx.getStorageSync("isLogin")){
      this.setData({
        isLogin: false
      });
    }else{
      this.setData({
        isLogin: true
      });
    }
  },
  loginIn: function (e) {
    console.log("点击登录")
    var that = this
    wx.login({
      success: function (res) {
        console.log(res.code)
        let code = res.code
        wx.getUserInfo({
          "lang": "zh_CN",
          success: function (res) {
            console.log('获取用户信息成功')
            that.setData({
              hasUserInfo: true,
              userInfo: res.userInfo,
              isLogin: true
            })
            wx.setStorageSync("userInfo", res.userInfo)
            let pramas = {
              "code": code,
              "nickName": res.userInfo["nickName"],
              "gender": res.userInfo["gender"],
              "avatarUrl": res.userInfo["avatarUrl"],
              "phoneNumber": "",
              "province": res.userInfo["province"],
              "country": res.userInfo["country"],
              "city": res.userInfo["city"],
            }
          },
          fail: function (res) {
            console.log(res)
            console.log('获取用户信息失败')
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  onReady() {
  },
  getBanner() {
    var _this = this
    network.request('banner/listForWechat', {}, function (res) {
      _this.setData({
        imgUrls: res.content,
      })
    });
  },
  getAudioDetail(event){
    console.log('aaa' + JSON.stringify(event.target.dataset.id))
    let id = event.target.dataset.id
    wx.navigateTo({
      url: '../audioPlay/audioPlay?fromFlag=0&&id=' +id,
    })
  },
  getField(){
    var _this = this
    network.request('category/cateOneListForWechat', {
      "isRecording": 2
    }, function (res) {
      _this.setData({
        fieldList: res.content,
      })
    });
  },
  goLetter(event){
    console.log('执行了吗')
    let id = event.target.dataset.id
    let type = event.target.dataset.type
    let title = event.target.dataset.name
    console.log(event.target)
    var _this = this
    let req = {
      pageNo:0,
      pageSize:10,
      parentCategory: id
    }
    network.request('category/listForWechat', req, function (res) {
      if(res.code == '0003'){
          if(type == 2){
            let req = {
              categoryId:id,
              pageNo:0,
              pageSize:1
            }
            network.request('product/listForWechat', req, function (res) {
              wx.navigateTo({
                url: '../wordCard/wordCard?id=' + res.content[0].id + '&title=' + title
              })
            });
          }else if(type == 1){
            let req = {
              categoryId: id,
              pageNo: 0,
              pageSize: 10
            }
            wx.navigateTo({
              url: '../chilrenEnglish/chilrenEnglish?id=' + id + '&title=' + title
            })
          }
      }else if(res.code == '0000'){
          if(type == 2){
            wx.navigateTo({
              url: '../baseWord/baseWord'
            })
          }
      }
    });
  },
  getList(){
    var _this = this
    network.request('relate/listForWechat', {}, function (res) {
      _this.setData({
        hotList: res.content,
      })
    });
  },
  onShow() {
    var that = this;
    this.getBanner()
    this.getField()
    this.getList()
  },
  onHide() {
    // Do something when page hide.
  },
  onUnload() {
    // Do something when page close.
  },
  onPullDownRefresh() {
    // Do something when pull down.
  },
  onReachBottom() {
    // Do something when page reach bottom.
  },
  onShareAppMessage() {
    // return custom share data when user share.
  },
  onPageScroll() {
    // Do something when page scroll
  },
  onResize() {
    // Do something when page resize
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // Event handler.
  viewTap() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  }
})

