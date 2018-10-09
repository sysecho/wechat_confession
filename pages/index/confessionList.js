// pages/index/confession.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:5,
    confessions: [],
    hasmoreData: true,
    hiddenloading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getConfessionList();
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
    console.log('刷新数据')
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('加载更多')
    this.setData({ hiddenloading: false })
    this.getConfessionList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getConfessionList: function(){
    var self = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
    });
    
    wx.request({
      url: 'https://www.mmptech.xin/confession/index/listConfessions',
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
          if (rows.total == 0) that.setData({hasmoreData: false });
          for (var i = self.data.confessions.length; i < rows.length + self.data.confessions.length; i++) {
            self.data.confessions.push(rows[i])
          }
          
          self.setData({ page: self.data.page + 1, size: 5, confessions: rows, hiddenloading: true});
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