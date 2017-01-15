// pages/index/index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    check_customer_status()

  },
  onReady: function () {
    // 页面渲染完成
    console.info("onReady")
  },
  onShow: function () {
    // 页面显示
    console.info("onshow")
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  register: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  login: function (e) {
    wx.navigateTo({
      url: '../login/login',
      success: function (res) {
        // success
        //console.info("成功")
      },
      fail: function () {
        // fail
        console.info("失败")
      },
      complete: function () {
        // complete
      }
    })
  }
})

//检查用户是否已经注册或者绑定过
function check_customer_status() {
  var customer_base_info = wx.getStorageSync('customer_base_info')
  var customer = customer_base_info.customer;
  if (customer) {
    if (customer.status == 1) {
      wx.redirectTo({
        url: '../assess/assess',
        success: function () {
          wx.showToast({
            title: '请进行风险评测',
            icon: 'success',
            duration: 2000
          });
        }
      })
    } else {
      wx.switchTab({
        url: '../home/home'
      })
    }
  } else {
    var openid = customer_base_info.openid;
    wx.request({
      url: app.server_url + '/customer/info/by/openid/' + openid,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        if (res.data.ret == 0) {
          customer_base_info.customer = res.data.obj;
          wx.setStorageSync('customer_base_info', customer_base_info)
          if (res.data.obj.status == 1) {
            wx.redirectTo({
              url: '../assess/assess',
              success: function () {
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '进行风险评测',
                })
              }
            })
          } else {
            wx.switchTab({
              url: '../home/home'
            })
          }
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  }
}