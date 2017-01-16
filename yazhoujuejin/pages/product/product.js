// pages/product/product.js
var home=require('../home/home.js')
Page({
  data:{
    flush:false,
    products:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.info(home);
    var that=this;
    home.init_product(that);
  },
  onReady:function(){
    // 页面渲染完成
    this.setData({hidden:true})
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  
  onPullDownRefresh:function(){
  //下拉刷新,
  var that=this;
  that.setData({flush:true})
   home.init_product(that);
  },
  onUnload:function(){
    // 页面关闭
  },
  show_product_detail:function(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: './detail/detail?id='+id
    })
  }
})