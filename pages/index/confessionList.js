// pages/index/confession.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    size:5,
    confessions: [],
    hasmoreData: true,
    hiddenloading: true,
    sentence:'...',
    froms:'匿名'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getConfessionList(); 
    this.getSentence();   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ page: 1, size: 5, confessions: [], hasmoreData: true, hiddenloading: true})
    this.getConfessionList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ hiddenloading: false })
    this.getConfessionList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

/**
 * 获取句子
 */
  getSentence:function(){
    var self = this;
    wx.request({
      url: 'https://v1.hitokoto.cn/',
      method: 'GET',
      success(res) {               
        console.info(res);
        self.setData({ sentence: res.data.hitokoto});
        self.setData({ froms: res.data.from });
      }
  })
  },

/**
 * 获取列表
 */
  getConfessionList:function(){
    var self = this;
    wx.showLoading({
      title: '飞机快跑...',
      icon: 'loading',
    });
    
    wx.request({
      url: 'https://mp.sysecho.fun/confession/index/listConfessions',
      data: {
        page: self.data.page,
        size: self.data.size
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.success) {
          var rows = res.data.rows;
          var length = self.data.confessions.length;
          if (rows.total == 0) that.setData({hasmoreData: false });
          for (var i = length,j=0; i < rows.length + length; i++,j++) {
            self.data.confessions.push(rows[j])
          }
          
          self.setData({ page: self.data.page + 1, size: 5, confessions: self.data.confessions, hiddenloading: true});
          if (!self.data.hasmoreData) that.setData({ hiddenloading: true });
          
        } else {
          wx.showToast({
            title: '暂时没有数据哦~',
            icon: 'none',
            mask: true,
            duration: 20000
          });
        }
      }
    })
  }
})