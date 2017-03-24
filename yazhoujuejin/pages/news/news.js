// pages/news/news.js
var app=getApp();
Page({
  data:{
    currentPage:1,
    hover:true,
    news:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    init_page(that);
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
  onUnload:function(){
    // 页面关闭
  },
  show_detail:function(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: './detail/detail?id='+id
    })
  }
})

var init_page=function(that){
    wx.request({
      //url: app.server_url+'/news/list',
      url:app.restful_url+'/restful/news/list',
      data: {page:that.data.currentPage,rows:20},
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.ret){
          var news=res.data.rows;
          for(var i in news){
            news[i].update_time=news[i].update_time.substring(0,news[i].update_time.indexOf(' '))
          }
          that.setData({news:news})
        }else{
          wx.showToast({
            title: '网络异常',
            icon: 'loading'
            })
        }
      }
    })
}