var network = require("../../utils/network.js")
let windowWidth = getApp().globalData.windowWidth
let windowHeight = getApp().globalData.windowHeight
var min = 10
var mid = 13
var max = 16
var mmax = 18
var word = 14
var ctx
Page({
  data:{
    nickName:'',
    isLogin:false,
    avatarUrl:'/images/xiaohaiouyingyu.png',
    hiddenCanvas:false
  },
  onLoad(options) {
    const value = wx.getStorageSync('userInfo')
        if (value) {
          this.setData({
            nickName: wx.getStorageSync('userInfo').nickName,
            avatarUrl: wx.getStorageSync('userInfo').avatarUrl,
            isLogin:true
          })
        }
    wx.showShareMenu({
      withShareTicket: true
    })
        },
  cancle(){
    this.setData({
      hiddenCanvas: false
    })
  } , 
  getHistory(){
      wx.navigateTo({
        url: '../listenHistory/listenHistory',
      })
  },
  getCollection(){
    wx.navigateTo({
      url: '../collection/collection?flag=0',
    })
  },
  getFeedBack(){
    wx.navigateTo({
      url: '../feedBack/feedBack',
    })
  },
  save(){
    let _this = this
    wx.canvasToTempFilePath({
      canvasId: 'canone',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log("保存图片：success");
            wx.showToast({
              title: '保存成功',
            });
            _this.setData({
              hiddenCanvas:false
            })
          },
          fail(res) {
            console.log("保存图片：fail");
            console.log(res);
          }
        })
      }
    })

  },
  getHaibao(){
    if (!wx.getStorageSync('isLogin')) {
      this.tip("请先登录！")
      return;
    }
    var _this = this
    network.request('poster/getPosterForWechat', {}, function (res) {
      if(res.code == '0000'){
      _this.setData({
        hiddenCanvas:true
      })
        let totalMinures = (res.content["totalListenMinutes"] + res.content["totalRecordMinutes"]).toFixed(2)
        console.log(totalMinures)
        let continueDays = res.content["continueDays"]
        if (windowWidth == 375) {
          min = 8
          mid = 12
          max = 14
          mmax = 17
          word = 13
        } else if (windowWidth < 375) {
          min = 8
          mid = 11
          max = 13
          mmax = 15
          word = 12
        } else {
          min = 11
          mid = 14
          max = 16
          mmax = 18
          word = 15
        }
        console.log(windowWidth)
        ctx = wx.createCanvasContext('canone');
        ctx.restore()
        ctx.rect(0, 0, windowWidth * 0.8, getApp().globalData.screenHeight * 0.7)
        ctx.setFillStyle('#ffffff')
        ctx.fill()

        ctx.restore()

        ctx.drawImage("/images/haibaobeijing.png", 0, 0, windowWidth * 0.81, windowHeight * 0.6);
        ctx.restore()
        ctx.drawImage("/images/wenzibeijing.png", windowWidth * 0.81 * 0.101, windowHeight * 0.6 * 0.35, windowWidth * 0.81 * 0.8, windowHeight * 0.6 * 0.6);
        ctx.restore()
        ctx.setFillStyle('#333333') //文字颜色：默认黑色
        ctx.setFontSize(mmax) //设置字体大小，默认10
        ctx.fillText("小海鸥英语", windowWidth * 0.04, windowHeight * 0.65)
        ctx.restore()
        ctx.setFontSize(mid) //设置字体大小，默认10
        ctx.fillText("免费好资源，让孩子爱上英语", windowWidth * 0.039, windowHeight * 0.7)
        ctx.restore()
        ctx.setFontSize(min) //设置字体大小，默认10
        ctx.fillText("长按识别二维码加入我们，让孩子敢学敢说", windowWidth * 0.04, windowHeight * 0.725)

        ctx.restore()
        ctx.setFontSize(word) //设置字体大小，默认10
        ctx.setFillStyle('#333333') //文字颜色：默认黑色

        ctx.fillText("Where there is a will, there", windowWidth * 0.122, windowHeight * 0.29)
        ctx.restore()
        ctx.setFontSize(word) //设置字体大小，默认10
        ctx.setFillStyle('#333333') //文字颜色：默认黑色
        ctx.fillText(" is a way. ", windowWidth * 0.122, windowHeight * 0.32)
        ctx.restore()

        ctx.setLineWidth(1)
        ctx.setStrokeStyle('#ffedb2')
        ctx.moveTo(windowWidth * 0.122, windowHeight * 0.34)
        ctx.lineTo(windowWidth * 0.666, windowHeight * 0.34)
        ctx.stroke()
        ctx.restore()

        ctx.setLineWidth(1)
        ctx.setStrokeStyle('#ffedb2')
        ctx.moveTo(windowWidth * 0.122, windowHeight * 0.46)
        ctx.lineTo(windowWidth * 0.666, windowHeight * 0.46)
        ctx.stroke()

        ctx.restore()
        ctx.setFontSize(mid) //设置字体大小，默认10
        ctx.setFillStyle('#333333') //文字颜色：默认黑色
        ctx.fillText("宝贝", windowWidth * 0.122, windowHeight * 0.385)

        ctx.restore()
        ctx.setFontSize(mmax) //设置字体大小，默认10
        ctx.setFillStyle('#ffab00') //文字颜色：默认黑色
        ctx.fillText(wx.getStorageSync("userInfo").nickName, windowWidth * 0.195, windowHeight * 0.3855)

        ctx.restore()
        ctx.setFontSize(mid) //设置字体大小，默认10
        ctx.setFillStyle('#333333') //文字颜色：默认黑色
        ctx.fillText("已经在小海鸥坚持学习了", windowWidth * 0.122, windowHeight * 0.43)

        ctx.restore()
        ctx.setFontSize(mmax) //设置字体大小，默认10
        ctx.setFillStyle('#ffab00') //文字颜色：默认黑色
        ctx.fillText(continueDays + "天", windowWidth * 0.5, windowHeight * 0.43)

        ctx.restore()
        ctx.setFontSize(mid) //设置字体大小，默认10
        ctx.setFillStyle('#333333') //文字颜色：默认黑色
        ctx.fillText("累计收听/录音", windowWidth * 0.122, windowHeight * 0.505)

        ctx.restore()
        ctx.setFontSize(mmax) //设置字体大小，默认10
        ctx.setFillStyle('#ffab00') //文字颜色：默认黑色
        ctx.fillText(totalMinures + "分钟", windowWidth * 0.122, windowHeight * 0.55)

        ctx.restore()
        ctx.drawImage("/images/qrCode.jpg", windowWidth * 0.57, windowHeight * 0.60, windowWidth * 0.81 * 0.265, windowWidth * 0.81 * 0.29);

        ctx.draw()
        _this.setData({
          showProgramme: !_this.data.showProgramme
        })
     
      }
    });
  },   
  onShareAppMessage: function () {
    return getApp().appShare();
  },  
  getRecord(){
    wx.navigateTo({
      url: '../collection/collection?flag=1',
    })
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
            console.log(res)
            let resObj = res.userInfo
            that.setData({
              hasUserInfo: true,
              userInfo: res.userInfo,
              nickName:res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl,
              isShow: false,
              isLogin:true
            })
            wx.setStorageSync("userInfo", res.userInfo)
            wx.setStorageSync("isLogin", that.data.isLogin)
            var _this = this
            let req = {
              avatarUrl: resObj.avatarUrl,
              city: resObj.city,
              code:code,
              country: resObj.country,
              gender: resObj.gender,
              nickName: resObj.nickName,
              phoneNumber: resObj.phoneNumber,
              province: resObj.province
            }
              network.request('member/loginForWechat', req, function (res) {
                wx.setStorageSync("mmTicket", res.content.mmTicket)
              });
            
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
})