// pages/product/pact/pact.js
Page({
  data:{
    btn_text:"立即预约",
    distabled:false,
    loading:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var product_id=options.id;
    var product=wx.getStorageSync('product_'+product_id);
    if(product){
      this.setData({product:product})
    }else{
      wx.switchTab({
        url: '../../home/home'
      })
    }
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