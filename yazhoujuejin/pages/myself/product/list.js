// pages/myself/product/list.js
var app=getApp();
Page({
  data:{
    hidden:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    showToast("加载中...",8000)
    init_product(that);
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
  edit_product:function(e){
    var id=e.currentTarget.id
    if(id){
       wx.navigateTo({
       url: '../../product/edit/edit?id='+id
      })
    }
  },
  onUnload:function(){
    // 页面关闭
  }
})
//展示消息
var showToast=function(msg,time){
    wx.showToast({
    title:msg,
    icon: 'loading',
    duration: time
    })
}
var init_product=function(that){
     wx.request({
      url: app.server_url+'/product/list',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.ret==0){
          for(var i in res.data.rows ){
            var product=res.data.rows[i]
            product.create_time=product.create_time.substring(0,product.create_time.indexOf('T'));
            product.update_time=product.create_time.substring(0,product.update_time.indexOf('T'));
          }
          that.setData({products:res.data.rows});
          wx.hideToast()
        }else{
          wx.showToast({
            title: '网络异常',
            icon: 'loading'
            })
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页
          })
        }
      }
    })
}