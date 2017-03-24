// pages/product/pact/pact.js
var app = getApp()
Page({
  data: {
    btn_text: "立即预约",
    distabled: false,
    lxr_status:false,
    lxr_mc:'',
    pact_money: 0,
    desc: '暂无备注',
    loading: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var product_id = options.id;
    var product = wx.getStorageSync('product_' + product_id);
    let customer =wx.getStorageSync('customer_base_info').customer;
    this.setData({customer:customer})
    if(customer.real_name){
           this.setData({lxr_status:true});
           this.setData({lxr_mc:customer.real_name})
    }
    if (product) {
      this.setData({ product: product })
      this.setData({pact_money:product.start_buy_money/10000})
    } else {
      wx.switchTab({
        url: '../../home/home'
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
    this.setData({ hidden: true })
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
    var lxr = this.data.lxr_mc;
    var pact_money = this.data.pact_money
    let product=this.data.product;
    let customer_id=this.data.customer.id
    if (lxr=='') {
      wx.showModal({
        showCancel: false,
        content: '请填写联系人姓名',
      })
      this.setData({ loading: !this.data.loading })
      return;
    }
    if (pact_money*10000<product.start_buy_money) {
      wx.showModal({
        showCancel: false,
        content: '预约金额必须大于项目起购金额',
      })
      this.setData({ loading: !this.data.loading })
      return;
    }
    wx.showToast({
      title: '提交中',
      icon: 'loading',
      duration: 5000
    })
    wx.request({
      //url: app.server_url + '/prod_pact/add/pact/item',
      url:app.restful_url+'/restful/product/addPact',
      data: {
        customer_id: customer_id,
        product_id: product.id,
        contacts_name: lxr,
        pact_money:pact_money,
        description: this.data.desc
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        if (res.data.ret) {
           wx.hideToast()
            wx.switchTab({
            url: '../../home/home',
            success: function (e) {
              wx.showToast({
                title: '预约成功',
                icon: 'success',
                duration: 2000
              })
            }, fail: function (e) {

            }
          })
        } else {
          wx.hideToast();
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
      this.setData({ lxr_mc: lxr });
    } else {
      this.setData({ lxr_mc: '' });
    }
  },
  check_money: function (e) {
    var money = e.detail.value;
    if(money*10000<this.data.product.start_buy_money){
     this.setData({pact_money:this.data.product.start_buy_money/10000})
    }else{
      this.setData({pact_money:money})
    }
  },
  check_desc: function (e) {
    var desc = e.detail.value;
    this.setData({ desc: desc })
  },
  onUnload: function () {
    // 页面关闭
  }
})