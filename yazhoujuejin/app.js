//app.js
App({
  server_url:"https://login.yazhoujuejin.com",
  //restful_url:"https://api.5ipsp.com",
  restful_url:"https://login.yazhoujuejin.com",
  onLaunch: function () {
    try{
       var customer_base_info=wx.getStorageSync('customer_base_info')
      //如果用户基本信息为空
      if(!customer_base_info){
          this.save_openId(this)
      }
    }catch(e){

    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              console.info(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  save_openId:function(app){
    wx.login({
      success: function(res){
        var code=res.code;
        if(code){
           wx.request({
            url: app.restful_url+'/restful/weixin/getOpenid',
            method: 'POST',
             data: {'code':code},
             header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
            success: function(res){
              if(res.statusCode==200){
                wx.setStorageSync('customer_base_info',{openid:res.data.openid})
              }
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getCustomerInfo:function(app){
    wx.request({
      url: app.server_url+'/customer/info/by/openid/:openid',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      }
    })
  }
})
