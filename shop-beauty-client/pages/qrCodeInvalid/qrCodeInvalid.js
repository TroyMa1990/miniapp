// pages/QrCodeInvalid/QrCodeInvalid.js
const app = getApp();
const weet = require('../../weet2/weet.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.getSetting({
          success: function (res) {
              if (!res.authSetting['scope.userInfo']) {
                  wx.redirectTo({
                      url: '../authorization/authorization'
                  })
              }
          }
      })
  },
    toScaven: function () {
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                let type = res.result.split('&')[0].split('=')[1]
                let code = res.result.split('&')[1].split('=')[1]
                if (type == 'exchange') {
                    weet.zan.get('staff/pre-scan-exchange-code?code=' + code, {}).then(res => {
                        if (res.statusCode == 200) {
                            if (res.data.status == 'success') {
                                wx.navigateTo({
                                    url: '../businessPay/businessPay',
                                })
                                wx.setStorageSync('exchangeData', res.data.data)
                                wx.setStorageSync('exchangeCode', code)
                            }
                            if (res.data.status == 'failed') {
                                if (res.data.errorno == 1) {
                                    wx.navigateTo({
                                        url: '../jurisdiction/jurisdiction',
                                    })
                                }
                                if (res.data.errorno == 2) {
                                    wx.navigateTo({
                                        url: '../qrCodeInvalid/qrCodeInvalid',
                                    })
                                }
                            }

                        }
                        else {
                            wx.showModal({
                                title: '提示',
                                content: res.data.msg,
                                showCancel: false
                            })

                        }

                    })
                }
                if (type == 'pay') {
                    weet.zan.get('staff/scan-code?code=' + code, {}).then(res => {
                        if (res.statusCode == 200) {
                            if (res.data.status == 'success') {
                                wx.navigateTo({
                                    url: '../businessBuckle/businessBuckle',
                                })
                                wx.setStorageSync('buckleData', res.data.data)
                                wx.setStorageSync('payCode', code)
                            }
                            if (res.data.status == 'failed') {
                                if (res.data.errorno == 1) {
                                    wx.navigateTo({
                                        url: '../jurisdiction/jurisdiction',
                                    })
                                }
                                if (res.data.errorno == 2) {
                                    wx.navigateTo({
                                        url: '../qrCodeInvalid/qrCodeInvalid',
                                    })
                                }
                            }


                        }
                        else {
                            wx.showModal({
                                title: '提示',
                                content: res.data.msg,
                                showCancel: false
                            })
                        }
                    })
                }

            }
        })

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})