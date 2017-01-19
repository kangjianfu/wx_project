// pages/myself/pwd/pwd.js
var app=getApp();
Page({
  data:{
    laoding:false
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
  formSubmit:function(e){
     var that=this;
     update_pwd(that,e);   
  }
})
//显示提示信息
var showMessage=function(msg){
    wx.showModal({
      title:"提示",
      content: msg,
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
           return;
        }
      }
    })
}
//提交修改密码
var update_pwd=function(that,e){
    var old_p=e.detail.value.old;
    var new_1=e.detail.value.new_1;
     var new_2=e.detail.value.new_2;
     if(!old_p){
       showMessage("原密码不能为空")
       return
     }
     if(!new_1){
       showMessage("新密码不能为空")
       return
     }
     if(!new_2){
       showMessage("确认密码不能为空")
       return
     }
     if(old_p.length<6){
       console.info(old_p)
       showMessage("原密码长度太短")
       return
     }
     
     if(new_1.toString().length<6){
       showMessage("新密码长度太短")
       return
     }
     if(new_1!=new_2){
       showMessage("两次新密码不一致")
       return
     }
     that.setData({loading:true});
     var customer_id=wx.getStorageSync('customer_base_info').customer.id
     if(customer_id){
         wx.request({
          url: app.server_url+'/customer/update/pwd',
          data: {
            customer_id:customer_id,
            old_pwd:old_p,
            new_pwd:new_1,
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            that.setData({loading:false});
            if(res.data.ret==0){
                wx.switchTab({
                  url: '../myself',
                  success: function(){
                    showToast(res.data.msg)
                  }
                })
            }else{
                showToast(res.data.msg)
            }
          }
        })
     }else{
       showToast('参数异常')
        that.setData({loading:false});
     }
}

var showToast=function(msg){
  wx.showToast({
  title: msg,
  icon: 'success',
  duration: 2000
  })
}