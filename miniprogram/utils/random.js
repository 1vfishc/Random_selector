/**
 * 随机工具模块 - 各功能页共用，便于单元测试与替换算法
 */

/**
 * 生成 [min, max] 闭区间内的随机整数
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomInt(min, max) {
  const lo = Math.ceil(min)
  const hi = Math.floor(max)
  return Math.floor(Math.random() * (hi - lo + 1)) + lo
}

/**
 * 从数组中随机取一项
 * @param {Array} list
 * @returns {*} 无元素时返回 null
 */
function pickRandom(list) {
  if (!list || list.length === 0) return null
  return list[randomInt(0, list.length - 1)]
}

/**
 * 解析用户输入的选项文本（支持换行、中英文逗号、分号分隔）
 * @param {string} text
 * @returns {string[]}
 */
function parseOptions(text) {
  if (!text || !String(text).trim()) return []
  return String(text)
    .split(/[\n,，;；]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

module.exports = {
  randomInt,
  pickRandom,
  parseOptions,
}
