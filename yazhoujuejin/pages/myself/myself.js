// pages/myself/myself.js
var app = getApp()
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      var that = this
      get_wx_userInfo(that)
      var customer_base_info=wx.getStorageSync('customer_base_info');
      that.setData({customer:customer_base_info.customer})
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
var get_wx_userInfo=function(that){
   //调用应用实例的方法获取全局数据
   app.getUserInfo(function(userInfo){
      //更新数据
      if(!userInfo.avatarUrl){
        userInfo.avatarUrl='../../static/images/icon_3.png'
      }
      console.info(userInfo)
      that.setData({
        userInfo:userInfo
      })
    })
    
}