//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力

    wx.getSystemInfo({
      success: function (res) {
        console.log(res.screenWidth * 0.49)
        console.log(res)
        that.globalData.windowWidth = res.windowWidth
        that.globalData.windowHeight = res.windowHeight
        that.globalData.screenHeight = res.screenHeight
      },
    })
  },
  appShare: function () {
    return {
      title: "小海鸥英语",
      path: "/pages/index/index",
      imageUrl: "",
      success: function (a) { }
    };
  },


  globalData: {
    userInfo: null,
    windowWidth: 0,
    windowHeight: 0,
    screenHeight: 0
  }
})