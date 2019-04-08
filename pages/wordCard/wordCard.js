var network = require("../../utils/network.js")
const backgroundAudioManager = wx.getBackgroundAudioManager()
// const innerAudioContext = wx.createInnerAudioContext()
backgroundAudioManager.autoplay =false
Page({
  data:{
    letterInfo:{},
    isFrist:true,
    isEnd:false,
    isRecordShow:true,
    src:'',
    collectionShow:false
  },
  onLoad(options) {
    console.log('options===============' + JSON.stringify(options.id))
    let req = {
      id: options.id
    }
    let _this = this
    network.request('product/oneForWechat', req, function (res) {
      _this.setData({
        letterInfo: res.content
      })
      console.log(_this.data.letterInfo)
    });
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      // 录音失败的回调处理
    });
    this.recorderManager.onStop(function (res) {
      // 停止录音之后，把录取到的音频放在res.tempFilePath
      that.setData({
        src: res.tempFilePath
      })
      console.log(res.tempFilePath)
    });
  },
  collectionTap(e){
    let id = e.currentTarget.dataset.id
    let req = {
      productId:id
    }
    let _this = this
    network.request('product/favoriteInsertForWechat', req, function (res) {
        if(res.code == '0000'){
            _this.setData({
              collectionShow:true
            })
        }
    });
  },
  endRecordingFun(){
   let _this = this
      let cardId = 5;
    this.recorderManager.stop()
      wx.showModal({
        title: '提示',
        content: '需要保存该录音吗？',
        confirmText: '保存',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            var src = _this.data.src;
            console.log("src=====" + src)
            if (!wx.getStorageSync('isLogin')) {
              wx.showToast({
                title: '保存失败，请先登录！',
                icon: 'none'
              })
              return;
            }
            wx.showLoading()
            wx.uploadFile({
              // url: 'http://10.164.239.3:8080/education-web/education/productRecord/uploadRecordingForWechat',
              url: 'https://education.lovehaimi.com/education-web/education/productRecord/uploadRecordingForWechat',
              header: {
                'content-type': 'multipart/form-data',
                'mmTicket': wx.getStorageSync("mmTicket"),
              },
              filePath: src,
              name: 'file',
              formData: {
                'user': wx.getStorageSync("userInfo").nikeName,
                "duration": _this.data.myRecordDuration,
                "productId": 5,
                "type": 2,
              },
              success(res) {
                //recordTime(that, that.data.myRecordDuration)
                wx.hideLoading()
                console.log(res)
                _this.setData({
                  isRecordShow:true
                })
                //do something
                wx.showToast({
                  title: '保存成功',
                  icon: "success"
                })
              },
              fail: function (res) {
                wx.hideLoading()
                wx.showToast({
                  title: '保存失败',
                  icon: "fail"
                })
                console.log(res)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },
  recordingFun(){
    this.recorderManager.start({
      format: 'mp3' // 如果录制acc类型音频则改成aac
    });
    this.setData({
      isRecordShow:false
    })
  },
  reRecordingFun(){
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      // 播放音频失败的回调
    })
    if (!this.data.src){
      wx.showToast({
        title: '请先录音',
        icon: "fail"
      })
    }else{
      this.innerAudioContext.src = this.data.src; // 这里可以是录音的临时路径
      this.innerAudioContext.play()
    }
  },
  playFun(){
    backgroundAudioManager.src = this.data.letterInfo.audioUrl
    backgroundAudioManager.title = this.data.letterInfo.name;
  },
  getLetter(e,param){
    let _this = this
    console.log(e.currentTarget.dataset.categoryid)
    let req = {
      categoryId: e.currentTarget.dataset.categoryid,
      displayOrder: e.currentTarget.dataset.displayorder,
      oper: param
    }
    network.request(' product/preOrNextForWechat', req, function (res) {
      if (res.content.displayOrder != 1){
        _this.setData({
          isFrist: false
        })
      }else{
        _this.setData({
          isFrist: true
        })
      }
      if(res.code == '0009'){
        _this.setData({
          isEnd: true
        })
      }else{
        _this.setData({
          isEnd: false
        })
      }
      _this.setData({
        letterInfo: res.content,
        collectionShow:false
      })

    });
  },
  prevLetter(e){
    if (!this.data.isFrist){
      this.getLetter(e, 'previous')
    }else{
      wx.showToast({
        title: '已经是第一个',
        icon: "none"
      })
    }
   
  },
  nextLetter(e){
    if (!this.data.isEnd) {
      this.getLetter(e, 'next')
    } else {
      wx.showToast({
        title: '已经是最后一个',
        icon: "none"
      })
    }
  
  }
})