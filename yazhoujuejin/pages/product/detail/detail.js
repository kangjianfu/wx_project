// pages/product/product/detail.js
var app = getApp()
Page({
  data:{
    btn_text:"前往预约",
    distabled:false,
    loading:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id=options.id;
    var that=this;
    init_project_detail(id,that)
    init_btn(id,that);
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
  open_ht:function(e){
    console.info(e)
    var url=e.currentTarget.id;
    console.info(url)

    // wx.openDocument({
    //   filePath: url,
    //   success: function (res) {
    //     console.log('打开文档成功')
    //   },
    //   fail:function(){
    //     console.log('打开文档失败')
    //   }
    // })
    wx.downloadFile({
      url: 'https://api.5ipsp.com', 
      success: function(res) {
        console.info(res)
      },
      fail:function(e){
        console.info(e)
      }
    })

  },
  ljyy:function(e){
    wx.navigateTo({
      url: '../pact/pact?id='+this.data.detail.id
    })
  },
  onUnload:function(){
    // 页面关闭
  }
})
//获取产品明细
var init_project_detail=function(id,that){
    wx.request({
      url: app.server_url+'/product/info/by/'+id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        console.info(res.data)
        if(res.data.ret==0){
          var product=res.data.obj;
          product.create_time=product.create_time.substring(0,product.create_time.indexOf('T'));
          product.update_time=product.create_time.substring(0,product.update_time.indexOf('T'));
          product.publish_start_time=product.publish_start_time.substring(0,product.publish_start_time.indexOf('T'));
             //把产品信息放入缓存中
          wx.setStorageSync("product_"+product.id, product);
          that.setData({detail:product})
        }else{
          wx.redirectTo({
            url: '../../home/home',
            success:function(){
              wx.showToast({
                title: ' 网络异常',
                icon: 'loading',
                duration: 2000
              })
            }
          })
        }
      }
    })
}
//判断用户是否预约了该产品
var init_btn=function(id,that){
  var customer_base_info=wx.getStorageSync('customer_base_info');
  var customer_id=customer_base_info.customer.id;
  wx.request({
    url: app.server_url+'/prod_pact/check/pact/status',
    data: {
      customer_id:customer_id,
      product_id:id
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function(res){
      if(res.data.ret==1){
        that.setData({distabled:true,btn_text:'您已经预约过'})
      }
    }
  })
}