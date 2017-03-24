// pages/forget/pwd.js
var app = getApp()
Page({
  data:{
    plain: false,
    disabled: true,
    loading_sub:false,
    disabled_sub:true,
    btn_text:'获取验证码',
    send_flag:true,
    phone:0,
    pwd:0,
    code:0,
    loading: false},
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
  send_code:function(){
    send_code(this)
  },
  code_input:function(e){
    var code=e.detail.value;
    this.setData({code:code})
  },
  pwd_input:function(e){
    var pwd=e.detail.value;
    var l=pwd.length;
    if(l>=6){
      this.setData({pwd:pwd})
      if(this.data.phone!=0){
        this.setData({disabled_sub:false});
      }
    }else{
        this.setData({disabled_sub:true});
      this.setData({pwd:0})
    }
  },
  submit:function(){
    var that=this;
    submit_btn(that)
  },
  phone_input:function(e){
    check_phone(e,this);
  }
})
//-----------------------------------
//验证手机号  
var check_phone=function(e,that){
   var phone=e.detail.value;
    var l=phone.length;
    var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
    if(l<11){
      that.setData({disabled:true});
      that.setData({disabled_sub:true});
      that.setData({phone:0})
    }else{
      if(reg.test(phone)&&that.data.send_flag){
          that.setData({disabled:false})
          that.setData({phone:phone})
          if(that.data.pwd.length>=6){
            that.setData({disabled_sub:!that.data.disabled_sub});
          }
      }else{
        that.setData({phone:0})
        that.setData({disabled_sub:true});
      }
    }
}
//-----------------------------------
//发送修改密码验证码 
var send_code=function(that){
 var phone=that.data.phone;
 that.setData({loading:!that.data.loading})
 that.setData({disabled:!that.data.disabled});
  if(phone){
        wx.request({
        //url: app.server_url+'/login/send/edit/code/'+phone,
        url:app.restful_url+'/restful/login/sendCode4Pwd/'+phone,
        method: 'POST', 
        success: function(res){
          if(res.data.ret){
            that.setData({send_flag:false});
            that.setData({loading:!that.data.loading})
            var time=120;
            var time_id=setInterval(function(){
            time--
            that.setData({btn_text:time+"秒"})
            if(time<=0){
              clearInterval(time_id)
              that.setData({disabled:!that.data.disabled});
              that.setData({btn_text:"重新获取"});
              that.setData({send_flag:true});
              }
             },1000)
          }else{
             that.setData({send_flag:true});
              wx.showToast({
              title: '手机号未注册',
              icon: 'success',
              duration: 1500,
              success:function(){
                that.setData({loading:!that.data.loading})
                that.setData({disabled:!that.data.disabled});
                }
              })
          }
        },
        fail: function(e) {
          wx.showToast({
            title: '网络异常',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }else{
      that.setData({loading:!this.data.loading})
      that.setData({disabled:!that.data.disabled});
    }
}

//-----------------------------------
//进行提交操作
var submit_btn=function(that){
    var phone=that.data.phone;
    var code=that.data.code;
    var pwd=that.data.pwd;
    var send_flag=that.data.send_flag;
    that.setData({loading_sub:true})
    if(send_flag){
      wx.showToast({
        title: '验证码已过期',
        icon: 'success',
        duration: 2000
        })
        that.setData({loading_sub:false})
        return;
    }
    if(code.length<=3){
      wx.showToast({
        title: '验证码格式错误',
        icon: 'success',
        duration: 2000
        })
         that.setData({loading_sub:false})
        return;
    }
    wx.request({
      //url: app.server_url+'/login/update/pwd/'+phone,
      url:app.restful_url+'/restful/login/updatePwd/'+phone,
      data: {code:code,password:pwd},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        if(res.data.ret){
          wx.redirectTo({
            url: '../login/login',
            success: function(res){
              wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
              })
            }
          })
        }else{
           that.setData({loading_sub:false})
          wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
              })
        }
      },
      fail: function() {
        wx.redirectTo({
          url: '../index/index',
          success: function(res){
              wx.showToast({
              title: '网络异常',
              icon: 'loading',
              duration: 2000
              })
          }
        })
      }
    })
}