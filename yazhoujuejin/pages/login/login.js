// pages/login/login.js
var app = getApp()
Page({
  data:{ 
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    phone:0,
    pwd:0,
    plain: false,
    loading: false
    },
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
  edit_pwd:function(){
    wx.navigateTo({
      url: '../forget/pwd'
    })
  },
  register:function(){
    wx.navigateTo({
      url: '../register/register'
    })
  },
  login:function(){
    var that=this;
    var phone=this.data.phone;
    var pwd=this.data.pwd;
    if(phone==0){
      wx.showModal({
      showCancel:false,
      content: '手机号码格式不正确',
      })
      return;
    }
    if(pwd==0){
      wx.showModal({
      showCancel:false,
      content: '密码格式不正确',
      })
      return;
    }
    login(that)
   
  },
  phone_input:function(e){
    var phone=e.detail.value;
    var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
    if(reg.test(phone)){
      this.setData({phone:phone});
    }else{
      this.setData({phone:0});
    }
  },
  pwd_input:function(e){
    var pwd=e.detail.value;
    if(pwd.length>=6){
      this.setData({pwd:pwd});
    }else{
      this.setData({pwd:0});
    }
  }
})

// -- 提交按钮、


var login=function(that){
  var customer_base_info=wx.getStorageSync('customer_base_info')
  var wx_openid=customer_base_info.openid;
  console.info(customer_base_info.customer)
  let phone=that.data.phone, pwd=that.data.pwd;
  wx.request({
    url: app.server_url+'/login/4/wx',
    data: {
      phone:phone,
      password:pwd,
      wx_openid:wx_openid
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function(res){
      console.info(res)
     if(res.data.ret==0){
       var customer=res.data.obj
       customer.openid=wx_openid;
       customer_base_info.customer=customer;
       wx.setStorageSync('customer_base_info',customer_base_info);
       if(customer.status==1){
          wx.redirectTo({
            url: '../assess/assess',
            success:function(){
            wx.showToast({
                    title: '请进行风险评测',
                    icon: 'success',
                    duration: 2000
                    });
            }
          })
       }else{
        wx.switchTab({
          url: '../home/home'
        })
       }
     
     }else{
       wx.showModal({
        title: '提示',
        showCancel:false,
        content: res.data.msg,
      })
     }
    },
    fail: function(e) {
        // wx.redirectTo({
        //   url: '../index/index',
        //   success: function(res){
        //       wx.showToast({
        //       title: '网络异常',
        //       icon: 'loading',
        //       duration: 2000
        //       })
        //   }
        // })
        console.info(e)
    }
  })
}