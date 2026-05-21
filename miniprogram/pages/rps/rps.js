/**
 * 石头剪刀布 - 用户选择出拳，对手随机，显示胜负
 */
const { pickRandom } = require('../../utils/random')

const CHOICES = [
  { id: 'rock', name: '石头', emoji: '✊', themeClass: 'choice-rock' },
  { id: 'scissors', name: '剪刀', emoji: '✌️', themeClass: 'choice-scissors' },
  { id: 'paper', name: '布', emoji: '✋', themeClass: 'choice-paper' },
]

function judge(userId, opponentId) {
  if (userId === opponentId) return 'draw'
  const beats = { rock: 'scissors', scissors: 'paper', paper: 'rock' }
  return beats[userId] === opponentId ? 'win' : 'lose'
}

const RESULT_MAP = {
  win: { text: '你赢了', sub: '恭喜胜出', class: 'result-win', icon: '🎉' },
  lose: { text: '你输了', sub: '下次再来', class: 'result-lose', icon: '😅' },
  draw: { text: '平局', sub: '势均力敌', class: 'result-draw', icon: '🤝' },
}

Page({
  data: {
    choices: CHOICES,
    userChoice: null,
    opponent: null,
    hasPlayed: false,
    playing: false,
    resultText: '',
    resultSub: '',
    resultIcon: '',
    resultClass: '',
    statusText: '选择你的出拳',
  },

  onSelectChoice(e) {
    const { id } = e.currentTarget.dataset
    if (!id || this.data.playing) return

    const userChoice = CHOICES.find((c) => c.id === id)
    if (!userChoice) return

    this.setData({
      playing: true,
      hasPlayed: true,
      userChoice,
      opponent: null,
      resultText: '对战中',
      resultSub: '对手正在出拳…',
      resultIcon: '⚔️',
      resultClass: 'result-pending',
      statusText: '对战进行中',
    })

    let tick = 0
    const timer = setInterval(() => {
      tick += 1
      this.setData({ opponent: pickRandom(CHOICES) })

      if (tick >= 10) {
        clearInterval(timer)
        const opponent = pickRandom(CHOICES)
        const outcome = judge(userChoice.id, opponent.id)
        const { text, sub, class: resultClass, icon } = RESULT_MAP[outcome]
        this.setData({
          opponent,
          resultText: text,
          resultSub: sub,
          resultIcon: icon,
          resultClass,
          playing: false,
          statusText: '对战结束',
        })
        wx.vibrateShort({ type: 'medium' })
      }
    }, 70)
  },

  onReset() {
    this.setData({
      userChoice: null,
      opponent: null,
      hasPlayed: false,
      playing: false,
      resultText: '',
      resultSub: '',
      resultIcon: '',
      resultClass: '',
      statusText: '选择你的出拳',
    })
  },
})
