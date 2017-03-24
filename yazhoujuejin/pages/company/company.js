var app = getApp()
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  },
  show_yyzz:function(e){
    wx.request({
      url: app.restful_url+'/restful/files/list',
      data: {'type':'YYZZ'},
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.ret){
          wx.previewImage({
            current: app.restful_url+res.data.rows[0].url, // 当前显示图片的http链接
            urls: [app.restful_url+res.data.rows[0].url] // 需要预览的图片http链接列表
          })
        }else{
          wx.showToast({
            title: '网络异常',
            icon: 'loading'
            })
        }
      }
    })
  },
  show_smpz:function(e){
    wx.request({
      url: app.restful_url+'/restful/files/list',
      data: {'type':'SMPZ'},
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.ret){
          wx.previewImage({
            current: app.restful_url+res.data.rows[0].url, // 当前显示图片的http链接
            urls: [app.restful_url+res.data.rows[0].url] // 需要预览的图片http链接列表
          })
        }else{
          wx.showToast({
            title: '网络异常',
            icon: 'loading'
            })
        }
      }
    })
  }
})