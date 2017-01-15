// pages/company/company.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.info(options)
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
  clear_store:function(e){
    var customer_base_info=wx.getStorageSync('customer_base_info')
    console.info("缓存数据是是。。。。。。"+JSON.stringify(customer_base_info))
    wx.removeStorageSync('customer_base_info')
    var customer_base_info1=wx.getStorageSync('customer_base_info')
    console.info("情况完缓存............"+JSON.stringify(customer_base_info1))
  }
})