/**
 * 摇骰盅 - 单骰子
 * 流程：盅悬停露骰 → 落盅盖住 → 摇晃 → 提盅揭晓
 */
const { randomInt } = require('../../utils/random')

/** 落盅 / 摇晃 / 提盅 时长（毫秒） */
const DROP_MS = 700
const SHAKE_MS = 2400
const LIFT_MS = 750

/** 星空点缀坐标 */
const STARS = [
  { top: '6%', left: '10%', opa: 0.6 },
  { top: '12%', left: '72%', opa: 0.8 },
  { top: '18%', left: '38%', opa: 0.5 },
  { top: '8%', left: '55%', opa: 0.7 },
  { top: '22%', left: '85%', opa: 0.6 },
  { top: '15%', left: '22%', opa: 0.9 },
  { top: '28%', left: '48%', opa: 0.4 },
  { top: '10%', left: '90%', opa: 0.5 },
  { top: '32%', left: '15%', opa: 0.7 },
  { top: '25%', left: '62%', opa: 0.6 },
  { top: '4%', left: '35%', opa: 0.8 },
  { top: '20%', left: '8%', opa: 0.5 },
  { top: '14%', left: '78%', opa: 0.65 },
  { top: '30%', left: '28%', opa: 0.55 },
  { top: '7%', left: '48%', opa: 0.75 },
]

Page({
  data: {
    stars: STARS,
    value: 0,
    hasPlayed: false,
    rolling: false,
    /** open=悬停露骰 | closed=落盅 | shake=摇晃 | lifting=提盅中 */
    cupState: 'open',
    statusText: '点击摇开始',
  },

  onShake() {
    if (this.data.rolling) return

    this.setData({
      rolling: true,
      hasPlayed: true,
      cupState: 'closed',
      statusText: '',
    })

    // 1. 骰盅落下盖住（CSS transition 约 0.65s）
    setTimeout(() => {
      this.setData({ cupState: 'shake', statusText: '' })

      let elapsed = 0
      const tickMs = 100
      const shakeTimer = setInterval(() => {
        elapsed += tickMs
        // 盖内随机换点（不可见）
        this.setData({ value: randomInt(1, 6) })

        if (elapsed >= SHAKE_MS) {
          clearInterval(shakeTimer)
          const finalValue = randomInt(1, 6)
          this.setData({ value: finalValue })
          this._liftCup(finalValue)
        }
      }, tickMs)
    }, DROP_MS)
  },

  /** 2. 提盅揭晓 */
  _liftCup(finalValue) {
    this.setData({
      cupState: 'lifting',
      value: finalValue,
    })

    setTimeout(() => {
      this.setData({
        cupState: 'open',
        rolling: false,
        statusText: `点数 ${finalValue}`,
      })
      wx.vibrateShort({ type: 'medium' })
    }, LIFT_MS)
  },
})
