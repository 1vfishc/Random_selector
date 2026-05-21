/**
 * 首页 - 功能模块入口
 * modules 中 theme 用于卡片主题色，themeClass 用于样式区分
 */
Page({
  data: {
    modules: [
      {
        id: 'dice',
        title: '掷骰子',
        desc: '随机 1～6 点，帮你做决定',
        tag: '运气',
        image: '/images/dice.png',
        url: '/pages/dice/dice',
        theme: '#5B6EF5',
        themeClass: 'theme-dice',
      },
      {
        id: 'rps',
        title: '石头剪刀布',
        desc: '选出手势，对战随机对手',
        tag: '对战',
        image: '/images/rps.png',
        url: '/pages/rps/rps',
        theme: '#EC4899',
        themeClass: 'theme-rps',
      },
      {
        id: 'picker',
        title: '随机选择',
        desc: '输入多个选项，随机抽一个',
        tag: '抉择',
        image: '/images/picker.png',
        url: '/pages/picker/picker',
        theme: '#10B981',
        themeClass: 'theme-picker',
      },
    ],
  },

  onTapModule(e) {
    const { url } = e.currentTarget.dataset
    if (!url) return
    wx.navigateTo({ url })
  },
})
