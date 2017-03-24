// pages/myself/myself.js
var app = getApp()
Page({
  data:{
    type:"default",
    plain:"false",
    actionSheetHidden:true,
    loading:"ture",
    defaultSize:"default"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var customer=wx.getStorageSync('customer_base_info').customer;
    this.setData({customer:customer})
 
  },
  onReady:function(){
    // 页面渲染完成

  },
  onShow:function(){
    // 页面显示
      var customer_base_info=wx.getStorageSync('customer_base_info');
      var assess_type=customer_base_info.customer.assess_type
      this.setData({assess_type:assess_type})
      this.setData({customer:customer_base_info.customer})
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  contact_us:function(e){
    //联系我们
      wx.showActionSheet({
      itemList: ['010-56241848'],
      itemColor:'#e10500',
      success: function(res) {
          if(res.tapIndex>=0){
            wx.makePhoneCall({
              phoneNumber: '010-56241848',
              success: function(res) {
                console.info("拨打电话成功")
              }
            })
          }
      },
      fail: function(res) {
        console.info("失败。。。。")
        return
      }
    })
  },
  go_smfxpc:function(e){
    //跳转私募风险评测
     wx.showActionSheet({
      itemList: ['重新进行评测'],
      itemColor:'#e10500',
      success: function(res) {
          if(res.tapIndex>=0){
            wx.navigateTo({
              url: '../assess/assess'
            })
          }
      },
      fail: function(res) {
        console.info("失败。。。。")
        return
      }
    })
  },
  go_fxts:function(e){
    wx.navigateTo({
      url: './fxts/fxts'
    })
  },
  go_editPwd:function(e){
    wx.navigateTo({
      url: './pwd/pwd'
    })
  },
  sys_seting:function(e){
    var customer=wx.getStorageSync('customer_base_info').customer;
    var item_1_name='绑定微信'
    var item_2_name='修改产品净值'
    if(customer.wx_openid){
      item_1_name='取消绑定微信'
    }
    //系统配置
     wx.showActionSheet({
      //itemList: [item_1_name,item_2_name],
      itemList: [item_2_name],
      itemColor:'#e10500',
      success: function(res) {
          // if(res.tapIndex==0){
          //     bind_wx()
          // }
          if(res.tapIndex==0){
            wx.navigateTo({
              url: './product/list',
              fail:function(e){
                console.info(e)
              }
            })
          }
      },
      fail: function(res) {
        console.info("失败。。。。")
        return
      }
    })
  },
  actionSheetChange:function(e){
    console.info(e)
  },
  show_sheet:function(e){
      wx.showActionSheet({
      itemList: ['确定退出'],
      itemColor:'#e10500',
      success: function(res) {
          var openid=wx.getStorageSync('customer_base_info').openid
          if(res.tapIndex>=0){
            wx.removeStorageSync('customer_base_info');
              wx.redirectTo({
              url: '../index/index?id='+openid
            })
          }
      },
      fail: function(res) {
        console.info("失败。。。。")
        return
      }
    })
  }
})
//展示消息
var showToast=function(msg){
    wx.showToast({
    title:msg,
    icon: 'success',
    duration: 2000
    })
}
//绑定/解绑
var bind_wx=function(){
  var customer_base_info=wx.getStorageSync('customer_base_info');
  var url =app.server_url+"/customer/wx/bind/openid"
  if(customer_base_info.customer.wx_openid){
    url=app.server_url+"/customer/wx/unbind/openid"
  }
  wx.request({
    url: url,
    data: {
      customer_id:customer_base_info.customer.id,
      openid:customer_base_info.openid,
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function(res){
      console.info(res)
      if(res.data.ret==0){
        if(customer_base_info.customer.wx_openid){
          customer_base_info.customer.wx_openid=null;
        }else{
          customer_base_info.customer.wx_openid=customer_base_info.openid;
        }
        wx.setStorageSync('customer_base_info', customer_base_info)
      }
       showToast(res.data.msg);
    },
    fail: function() {
       showToast("网络异常");
    }
  })
}
