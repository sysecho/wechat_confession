//app.js
var gio = require("utils/gio-minp.js").default;
// version 是你的小程序的版本号, 发版时请调整
gio('init', 'be0c5825004f8816', 'wx0a2a480aa0822947', { version: '20190709' });

App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null
  }
})