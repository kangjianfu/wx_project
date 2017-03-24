// pages/myself/product/edit/edit.js
var app = getApp()
var util=require('../../../utils/util.js')
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
  let product=wx.getStorageSync('product_'+id);
  let now=new Date();
  let update_time=util.formatTime(now);
  update_time=update_time.substring(0,update_time.indexOf(' '))
  if(product){
      that.setData({product: product})
      that.setData({date:update_time})
  }else{
    wx.request({
      url: app.restful_url + '/restful/product/findById/'+id,
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.ret){
          let result=res.data.obj;
          that.setData({product: result})
          that.setData({date:update_time})
          wx.setStorageSync("product_"+result.id, product);
        }else{
          wx.navigateBack()
          wx.showToast({
            title: '网络异常...',
            icon: 'loading',
            duration: 3000
          })
        }
      }
    })
  }
}

var submit_form=function(data,that){
  var customer=wx.getStorageSync('customer_base_info').customer;
  that.setData({loading:true})
  data["update_time"]=that.data.date+" 16:18:18";
  data.update_user=customer.id;
  data.product_id=that.data.product.id;
  wx.request({
    //url: app.server_url+'/product/wx/update/jzsm',
    url:app.restful_url+'/restful/product/updateRatio',
    data: data,
    header: {'content-type':'application/x-www-form-urlencoded'},
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function(res){
      that.setData({loading:false})
      if(res.data.ret){
        wx.removeStorageSync('product_'+data.product_id);
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