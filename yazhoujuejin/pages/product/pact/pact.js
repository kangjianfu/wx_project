// pages/product/pact/pact.js
var app = getApp()
Page({
  data: {
    btn_text: "立即预约",
    distabled: false,
    lxr: 0,
    phone: 0,
    desc: '暂无备注',
    loading: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var product_id = options.id;
    var product = wx.getStorageSync('product_' + product_id);
    if (product) {
      this.setData({ product: product })
    } else {
      wx.switchTab({
        url: '../../home/home'
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
    this.setData({hidden:true})
  },
  onShow: function () {
    // 页面显示
  },
  check_desc: function (e) {
    this.setData({ desc: e.detail.vaule });
  },
  onHide: function () {
    // 页面隐藏
  },
  //立即预约
  ljyy: function (e) {
    this.setData({ loading: !this.data.loading })
    var lxr = this.data.lxr;
    var phone = this.data.phone
    var that=this;
    if (lxr == 0) {
      wx.showModal({
        showCancel: false,
        content: '联系人格式不正确',
      })
      this.setData({ loading: !this.data.loading })
      return;
    }
    if (phone == 0) {
      wx.showModal({
        showCancel: false,
        content: '手机号格式不正确',
      })
      this.setData({ loading: !this.data.loading })
      return;
    }
    var customer_id = wx.getStorageSync('customer_base_info').customer.id;
    var product_id = this.data.product.id;
    wx.request({
      url: app.server_url + '/prod_pact/add/pact/item',
      data: {
        customer_id: customer_id,
        product_id: product_id,
        contacts: this.data.lxr,
        contacts_phone: this.data.phone,
        description: this.data.desc
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        that.setData({ loading: !that.data.loading })
        if (res.data.ret == 0) {
          wx.switchTab({
            url: '../../home/home',
            success: function (e) {
              wx.showToast({
                title: '预约成功',
                icon: 'success',
                duration: 2000
              })
            },fail:function(e){
              console.info(e);
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })

  },
  check_lxr: function (e) {
    var lxr = e.detail.value;
    if (lxr && lxr.length > 1) {
      this.setData({ lxr: lxr });
    } else {
      this.setData({ lxr: 0 });
    }
  },
  check_phone: function (e) {
    var ph = e.detail.value;
    var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(ph)) {
      this.setData({ phone: ph });
    } else {
      this.setData({ phone: 0 });
    }
  },
  check_desc:function(e){
     var desc = e.detail.value;
     this.setData({desc:desc})
  },
  onUnload: function () {
    // 页面关闭
  }
})