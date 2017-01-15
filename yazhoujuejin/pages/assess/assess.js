// pages/assess/assess.js
var app = getApp()
Page({
  data:{
    disabled:true,
    loading:false,
    page_result:{}
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
  radioChange:function(e){
    var cur_id=e.currentTarget.id;
    var page_result=this.data.page_result;
    page_result[cur_id]=e.detail.value
    var size=0
    var result=[];
    for (var key in page_result){
       if (page_result.hasOwnProperty(key)){
         result.push(key+page_result[key])
         size++;
       }
    }
    if(size==12){
      this.setData({result:result})
      this.setData({disabled:false})
    }
  },
  submit:function(e){
    var params=this.data.result.join(",")
    this.setData({loading:true})
    var customer_base_info=wx.getStorageSync('customer_base_info')
    var customer=customer_base_info.customer;
    wx.request({
      url: app.server_url+"/risk/questionnaire/answer",
      data: {result:params,phone:customer.phone},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.ret==0){
          customer.status=2;
          customer.risk_type=res.data.result;
          customer.risk_desc=res.data.description;
          wx.setStorageSync('customer_base_info', customer_base_info)
          wx.switchTab({
            url: '../home/home',
            success:function(){
              wx.showToast({
                  title: res.data.result,
                  icon: 'success',
                  duration: 2000
              });
              // wx.showModal({
              // title: res.data.result,
              // showCancel:false,
              //  content: res.data.res.data.description,
              // })
            }
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
})