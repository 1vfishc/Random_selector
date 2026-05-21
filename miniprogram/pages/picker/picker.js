/**
 * 随机选择 - 多选项抽取（逗号/换行分隔）
 */
const { parseOptions, pickRandom } = require('../../utils/random')

Page({
  data: {
    inputText: '',
    options: [],
    selected: '',
    hasPicked: false,
    picking: false,
    errorMsg: '',
    statusText: '输入选项，帮你做决定',
    resultSub: '',
  },

  onInput(e) {
    const inputText = e.detail.value
    const options = parseOptions(inputText)
    this.setData({
      inputText,
      options,
      errorMsg: '',
      statusText: options.length > 0
        ? `已识别 ${options.length} 个选项`
        : '输入选项，帮你做决定',
    })
  },

  onPick() {
    const { options, picking } = this.data
    if (picking) return

    if (options.length === 0) {
      this.setData({
        errorMsg: '请输入至少一个选项，用逗号分隔',
        hasPicked: false,
        selected: '',
        statusText: '请先输入选项',
      })
      return
    }

    if (options.length === 1) {
      this.setData({
        selected: options[0],
        hasPicked: true,
        errorMsg: '',
        picking: false,
        statusText: '抽取完成',
        resultSub: '只有一个选项',
      })
      wx.showToast({ title: '只有一个选项', icon: 'none' })
      return
    }

    this.setData({
      picking: true,
      hasPicked: true,
      errorMsg: '',
      statusText: '抽取中…',
      resultSub: '命运正在转动',
    })

    let tick = 0
    const timer = setInterval(() => {
      tick += 1
      this.setData({ selected: pickRandom(options) })

      if (tick >= 14) {
        clearInterval(timer)
        const final = pickRandom(options)
        this.setData({
          selected: final,
          picking: false,
          statusText: '抽取完成',
          resultSub: '就是它了！',
        })
        wx.vibrateShort({ type: 'light' })
      }
    }, 60)
  },

  onClear() {
    this.setData({
      inputText: '',
      options: [],
      selected: '',
      hasPicked: false,
      errorMsg: '',
      picking: false,
      statusText: '输入选项，帮你做决定',
      resultSub: '',
    })
  },
})
