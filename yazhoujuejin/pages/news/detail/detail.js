// pages/news/detail/detail.js
var app = getApp();
Page({
  data: {
    images: [],
    is_text: false,
    hidden: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var that = this;
    format_html(id,that)
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
  onUnload: function () {
    // 页面关闭
  }
})

var format_html=function(id,that){
   wx.request({
      //url: app.server_url + '/news/info/by/' + id,
      url:app.restful_url+'/restful/news/findById',
      data: {news_id:id},
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        if (res.data.ret) {
          var image_url = []
          var content = res.data.obj.content
          var imgs = content.split("<img src=\"");
          if (imgs.length > 0) {
            for (var i in imgs) {
              var indx = imgs[i].indexOf("\" alt=\"\"");
              if (indx > 0) {
                image_url.push(imgs[i].substr(0, indx))
              } else {
                var d = imgs[i].replace(/&nbsp;/g, "").replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/<br\/>/g, "");
                if (d) {
                  that.setData({ content: d })
                  that.setData({ is_text: true })
                }

              }
            }
            that.setData({ images: image_url })
          }

          that.setData({ hidden: true })
        } else {
          wx.switchTab({
            url: '../../home/home',
            success: function (e) {
              wx.showToast({
                title: '网络异常，获取失败',
                icon: 'loading',
                duration: 10000
              })
            }
          })
        }
      },
      fail: function () {
        wx.switchTab({
            url: '../../home/home',
            success: function (e) {
              wx.showToast({
                title: '网络异常，获取失败',
                icon: 'loading',
                duration: 10000
              })
            }
          })
      }
    })
}