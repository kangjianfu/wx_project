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
    imageUrls:[],
    products:[]
  },
  onLoad:function(options){
    //初始化轮播图
    init_lbt(this);
    //初始化产品信息
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
  onShareAppMessage: function () {
    return {
      title: '亚洲掘金',
      desc: '亚洲掘金',
      path: '/pages/home/home'
    }
  },
  onPullDownRefresh:function(){
    //下拉刷新,
    var that=this;
    that.setData({flush:true})
    that.setData({hidden:false})
    init_product(that);
    wx.showToast({
      title: '加载中......',
      icon: 'loading',
      duration: 5000
    })
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
      //url: app.server_url+'/product/list',
      url:app.restful_url+'/restful/product/list',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        if(that.data.flush){
          wx.stopPullDownRefresh();
          wx.hideToast()
        }
        if(res.data){
          for(var i in res.data.rows ){
            var product=res.data.rows[i]
            product.create_time=product.create_time.substring(0,product.create_time.indexOf(' '));
            product.update_time=product.update_time.substring(0,product.update_time.indexOf(' '));
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
// 初始化轮播图
var init_lbt=function(that){
  wx.request({
    url: app.restful_url+'/restful/files/list',
    data: {'type':'SY_XLBT'},
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
    success: function(res){
      var data_images=res.data.rows;
      var images=[];
      data_images.forEach(function(e){
       that.data.imageUrls.push(app.restful_url+e.url)
      })
      that.setData({imageUrls:that.data.imageUrls});
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