
module.exports = {
  request: request,
  requestLoading: requestLoading
}


const rootDocment = 'https://education.lovehaimi.com/education-web/education/'//release 
 //const rootDocment = 'http://10.164.239.3:8080/education-web/education/';//sit 
// const rootDocment = 'http://10.164.239.114:8081/education-web/education/';//uat

function request(url, params, success, fail) {
  this.requestLoading(url, params, "", success, fail)
}

// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, params, message, success, fail) {
  console.log(params)
  wx.showLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: rootDocment + url,
    data: params,
    header: {
      'content-type': 'application/json',
      'mmTicket': wx.getStorageSync("mmTicket")
    },
    method: 'post',
    success: function (res) {
      //console.log(res.data)
      wx.hideLoading()
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function (res) {
      console.log(res)
      wx.hideLoading()
      fail()
    },
    complete: function (res) {

    },
  })
}




