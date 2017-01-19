// pages/home/home.js
var app = getApp()
Page({
  data:{
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hover:true,
    mode:"center",
    flush:false,
    products:[]
  },
  onLoad:function(options){
     init_product(this);
  },
  onReady:function(){
    // 页面渲染完成
    this.setData({hidden:true})
  },
  onShow:function(){
    // 页面显示
     //check_customer_status()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onPullDownRefresh:function(){
    //下拉刷新,
    var that=this;
    that.setData({flush:true})
    that.setData({hidden:false})
    init_product(that);
  },
  go_company:function(){
    wx.navigateTo({
      url: '../company/company'
      })
  },
  show_product_detail:function(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '../product/detail/detail?id='+id
    })
  },
  go_news:function(e){
     wx.navigateTo({
      url: '../news/news'
    })
  },
  join_us:function(e){
    wx.navigateTo({
      url: '../join/us'
    })
  }
});
var init_product=function(that){
    wx.request({
      url: app.server_url+'/product/list',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(that.data.flush){
          wx.stopPullDownRefresh();
          that.setData({hidden:true})
        }
        if(res.data.ret==0){
          for(var i in res.data.rows ){
            var product=res.data.rows[i]
            product.create_time=product.create_time.substring(0,product.create_time.indexOf('T'));
            product.update_time=product.create_time.substring(0,product.update_time.indexOf('T'));
          }
          that.setData({products:res.data.rows});
        }else{
          wx.showToast({
            title: '网络异常',
            icon: 'loading'
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
}

module.exports = {
  init_product: init_product
}