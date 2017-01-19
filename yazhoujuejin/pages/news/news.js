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
    console.info(id)
    wx.navigateTo({
      url: './detail/detail?id='+id
    })
  }
})

var init_page=function(that){
    wx.request({
      url: app.server_url+'/news/list',
      data: {page:that.data.currentPage,rows:10},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.ret==0){
          var news=res.data.rows;
          for(var i in news){
            news[i].create_time=news[i].create_time.substring(0,news[i].create_time.indexOf('T'))
          }
          that.setData({news:news})
        }else{
          console.info("网络异常")
        }
      }
    })
}