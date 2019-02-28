//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userName:'',
    content:''
  },
  formSubmit: function (e) {
    if (!e.detail.value.userName){
      wx.showToast({
        title: '名字都没勇气说吗？', 
        icon: 'none',
        duration: 1500,
        mask: true
      });
      return;
    }
    if (!e.detail.value.content) {
      wx.showToast({
        title: '难道你什么都不想说？',
        icon: 'none',
        mask: true,
        duration: 1500,
      });
      return;
    }
    wx.request({
      url: 'https://www.mmptech.xin:8443/confession/index/submit',
      data: {
        name: e.detail.value.userName,
        content: e.detail.value.content,
        fromeUser: e.detail.value.from
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.success){
          wx.showToast  ({
            title: '已经提交成功，耐心等待推送吧~.~',
            icon: 'success',
            mask: true,
            duration: 20000,
            complete: function(){
              wx.redirectTo({
                url:'confession'
              })
            } 
          });
        }
      }
    })
  }

  
})
