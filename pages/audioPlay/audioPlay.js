var network = require("../../utils/network.js")
const innerAudioContext = wx.createInnerAudioContext()
var fromFlag = 0;
Page({
  data: {
    hiddenName:true,
    slider1:0,
    audioObj:{},
    currentTime:'00:00',
    id:null,
    loop:false,
    lyricShow:true,
    noLike:false
  },
  onShow() {
   
  },
  onReady(e) {
   
   
  },
  like(){
    let _this = this
    let req = {
      productId:this.data.id
    }
    network.request('product/favoriteInsertForWechat', req, function (res) {
      if(res.code == "5040"){
        wx.showToast({
          title: "请先登录",
          icon: "none"
        })
      }else{
        _this.setData({
          noLike: true
        })
        wx.showToast({ title: '收藏成功' })
      }
    });
  },
  noLike(){
    this.setData({
      noLike: false
    })
    wx.showToast({title:'取消收藏'})
  },
  slider4change(e){
    console.log(JSON.stringify(e.detail.value))
    let value = e.detail.value
    this.setData({ slider1: value });
    var duration = innerAudioContext.duration;
    console.log('value=' + duration)
    value = parseInt(value * duration / 100)
    console.log(('valuevaluevalue=') + value)
    innerAudioContext.seek(value)
  },
  closeLyrics(){
    this.setData({
      lyricShow: true
    })
  },
  openLyrics(){
    let _this = this
    let url = this.data.audioObj.content
    wx.request({
      url: url,
      data: {},
      success: function (res) {
        _this.setData({
          contentText:sliceNull(parseLyric(res.data)),
          lyricShow:false
        })
        //console.log(this.data.contentText)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  audioPlay() {
    innerAudioContext.play()
    this.setData({
      hiddenName: true
    })
  },
  audioPause() {
    console.log('pause')
    innerAudioContext.pause()
   
    this.setData({
      hiddenName: false
    })
  },
  audio14() {
    innerAudioContext.seek(14)
  },
  audioStart() {
    innerAudioContext.seek(0)
  },
  loop(){
    if(this.data.loop){
      this.setData({
        loop: false
      })
    }else{
      this.setData({
        loop: true
      })
    }
  },
  getOtherSing(type){
    console.log('idididididid'+this.data.id)
    let req = {
      id: this.data.id,
      oper: type
    }
    var _this = this;
    network.request('relate/preOrNextChoiceForWechat', req, function (res) {
      _this.data.id = res.content.id
      _this.setData({
        audioObj: res.content
      })
      _this.Initialization()
    });
  },
  nextSong(){
    this.getOtherSing('next')
  },
  prevSong(){
    this.getOtherSing('previous')
  },
  onLoad(options) {
    let id = options.id
    console.log('id=========='+id)
    this.setData({
      id: id
    })
    this.getInit(id)
    
    innerAudioContext.onCanplay(() => {
      let _this = this
      setTimeout(function(){
        var min = parseInt((innerAudioContext.duration) / 60);
        var sec = parseInt((innerAudioContext.duration) % 60);
        //填充字符串，使3:1这种呈现出 03：01 的样式
        if (min.toString().length == 1) {
          min = `0${min}`;
        }
        if (sec.toString().length == 1) {
          sec = `0${sec}`;
        } 
        _this.setData({
          time: `${min}:${sec}`
        })
      },500)
    })
    innerAudioContext.onEnded(() => {
      if (this.data.loop) {
        console.log('触发了啊')
        this.Initialization()
      } else {
        this.getOtherSing('next')
      }
    })
    innerAudioContext.onPlay(()=>{
      console.log('执行没有')
      innerAudioContext.currentTime //不加的话进度更新方法不执行，timeupdata方法必须在这里调用，否则，暂停后播放，
      this.Initialization()
    })
  },

  Initialization(){
    innerAudioContext.src = this.data.audioObj.audioUrl
    innerAudioContext.title = this.data.audioObj.name;
    innerAudioContext.play();
    innerAudioContext.onTimeUpdate(() => {
      let currentTime = ''
      innerAudioContext.currentTime
      var min = parseInt((innerAudioContext.currentTime + 1) / 60);
      var sec = parseInt((innerAudioContext.currentTime + 1) % 60);
      //填充字符串，使3:1这种呈现出 03：01 的样式
      if (min.toString().length == 1) {
        min = `0${min}`;
      }
      if (sec.toString().length == 1) {
        sec = `0${sec}`;
      }
      let precent = innerAudioContext.currentTime / innerAudioContext.duration * 100;
      if (precent >= 100) {
        innerAudioContext.seek(0)
      }
      this.setData({
        slider1: innerAudioContext.currentTime / innerAudioContext.duration * 100,
        currentTime: `${min}:${sec}`
      })
    })
  },
  getInit(id){
    var _this = this
    let req = {
      id: id
    }
    network.request('product/oneForWechat', req, function (res) {
      _this.setData({
        audioObj: res.content
              })
      _this.Initialization()
    });
  }
 
})
var parseLyric = function (text) {

  //将文本分隔成一行一行，存入数组
  var lines = text.split('\n')
  console.log(lines)

  //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
  lines[lines.length - 1].length === 0 && lines.pop();

  return lines;
}
//去除空白

var sliceNull = function (lrc) {
  var result = []
  for (var i = 0; i < lrc.length; i++) {
    if (lrc[i].length > 1) {
      result.push(lrc[i])
    }
  }
  console.log(result)
  return result
}
