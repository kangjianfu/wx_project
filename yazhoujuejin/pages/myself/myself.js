// pages/myself/myself.js
var app = getApp()
Page({
  data:{
    type:"default",
    plain:"false",
    actionSheetHidden:true,
    loading:"ture",
    defaultSize:"default"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
   
      var that = this
      //get_wx_userInfo(that)
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
  },
  contact_us:function(e){
      wx.showActionSheet({
      itemList: ['010-56241848'],
      itemColor:'#204F9D',
      success: function(res) {
          if(res.tapIndex>=0){
            wx.makePhoneCall({
              phoneNumber: '010-56241848',
              success: function(res) {
                console.info("拨打电话成功")
              }
            })
          }
      },
      fail: function(res) {
        console.info("失败。。。。")
        return
      }
    })
  },
  actionSheetChange:function(e){
    console.info(e)
  },
  show_sheet:function(e){
      wx.showActionSheet({
      itemList: ['确定退出'],
      itemColor:'#e10500',
      success: function(res) {
          var openid=wx.getStorageSync('customer_base_info').openid
          if(res.tapIndex>=0){
            wx.removeStorageSync('customer_base_info');
              wx.redirectTo({
              url: '../index/index?id='+openid
            })
          }
      },
      fail: function(res) {
        console.info("失败。。。。")
        return
      }
    })
  },
  hide_sheet:function(e){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  exit:function(e){
     wx.removeStorageSync('customer_base_info');
      wx.redirectTo({
      url: '../index/index'
    })
  }
})
