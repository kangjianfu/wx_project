// pages/myself/product/edit/edit.js
var app = getApp()
Page({
  data: {
    product: {},
    loading:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var product_id = options.id;
    var that = this;
    if(product_id){
      inint_data(that, product_id);
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  bindDateChange: function(e) {
   this.setData({
      date: e.detail.value
    })
  },
  formSubmit:function(e){
    console.info(e)
    var that=this;
    that.setData({loading:true});
    var data=e.detail.value;
    submit_form(data,that);
  },
  onUnload: function () {
    // 页面关闭
  }
})
var inint_data = function (that, id) {
  wx.showToast({
    title: '加载中...',
    icon: 'loading',
    duration: 8000
  })
  wx.request({
    url: app.server_url + '/product/info/by/' + id,
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function (res) {
      wx.hideToast()
      if (res.data.ret == 0) {
        var product=res.data.obj;
        product.create_time=product.create_time.substring(0,product.create_time.indexOf('T'));
        product.update_time=product.update_time.substring(0,product.update_time.indexOf('T'));
        product.publish_start_time=product.publish_start_time.substring(0,product.publish_start_time.indexOf('T'));
        that.setData({product: product})
        that.setData({date:product.update_time})
      } else {
        wx.navigateBack()
        wx.showToast({
          title: '网络异常...',
          icon: 'loading',
          duration: 3000
        })
      }
    },
    fail: function () {
      wx.navigateBack()
      wx.showToast({
        title: '服务器异常...',
        icon: 'loading',
        duration: 5000
      })
    }
  })
}

var submit_form=function(data,that){
  var customer=wx.getStorageSync('customer_base_info').customer;
  that.setData({loading:true})
  data["update_time"]=that.data.date;
  data.customer_id=customer.id;
  data.product_id=that.data.product.id;
  wx.request({
    url: app.server_url+'/product/wx/update/jzsm',
    data: data,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function(res){
      that.setData({loading:false})
      if(res.data.ret==0){
        wx.switchTab({
          url: '../../myself/myself',
          success: function(res){
              wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }else{
        wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
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