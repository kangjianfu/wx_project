// pages/product/product/detail.js
var app = getApp()
Page({
  data:{
    btn_text:"前往预约",
    distabled:false,
    loading_text:"加载中...",
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
    var url=e.currentTarget.id;
    var that=this;
    open_doc(that,url);
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
        if(res.data.ret==0){
          var product=res.data.obj;
          product.create_time=product.create_time.substring(0,product.create_time.indexOf('T'));
          product.update_time=product.update_time.substring(0,product.update_time.indexOf('T'));
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

//打开文档
var open_doc=function(that,url){
  that.setData({hidden:false,loading_text:"获取文件中..."})
    wx.getSavedFileList({
      success: function(res){
        if(res.fileList.length==0){
            wx.downloadFile({
              url: url,
              success: function(res){
                var temp_path=res.tempFilePath
                  wx.saveFile({
                    tempFilePath: temp_path,
                    success: function(res) {
                      var savedFilePath = res.savedFilePath
                      console.info(savedFilePath)
                      that.setData({hidden:true})
                      wx.openDocument({
                        filePath: savedFilePath,
                        success: function (res) {
                         that.setData({hidden:true})
                        }
                      })
                    }
                  })
              },fail:function(e){
               wx.showToast({
                  title: '网络异常，文件下载失败。',
                  icon: 'success',
                  duration: 2000
                })
                that.setData({hidden:true});
              }
            })
        }else{
          //获取文件
          var fileList=res.fileList;
          for(var i in fileList){
            var path=fileList[i].filePath;
            console.info(path)
            if(path.indexOf('pdf')>0){
              console.info(path)
              that.setData({hidden:true})
              wx.openDocument({
                  filePath: path,
                  success: function (res) {
                    that.setData({hidden:true})
                    console.info("打开成功。。。。")
                  },fail:function(e){
                      connsole.info(e);
                      console.info("打开失败。。。。")
                  }
              })
              return;
            }else{
              console.info("文件我i炸豆腐")
            }
          }
        }
      },
      fail: function() {
        
      }
    })
}