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
    //var submit_url=app.server_url+"/risk/questionnaire/answer";
    var submit_url=app.restful_url+"/restful/customer/evaluate";
    var redict_url='../home/home'
    var flag=false;
    if(customer.assess_type){
     //说明是重新评测的
      flag=true;
    }
    wx.request({
      url: submit_url,
      data: {result:params,customer_id :customer.id},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        if(res.data.ret){
          if(!flag){
            customer.status='正常';
          }
          customer.assess_type=res.data.obj.result;
          customer.assess_description=res.data.obj.description;
          wx.setStorageSync('customer_base_info', customer_base_info)
          if(flag){
              wx.navigateBack({
                delta: 1
              })
          }else{
             wx.switchTab({
              url: redict_url,
              success:function(){
                wx.showToast({
                    title: res.data.result,
                    icon: 'success',
                    duration: 2000
                });
              }
            })
          }
         
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