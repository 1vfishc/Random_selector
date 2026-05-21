# AI 辅助开发记录 — 随机决定器小程序

本文档记录使用 Cursor AI 从 0 搭建本小程序时的主要问题与解决方案，便于团队复盘与后续迭代。

---

## 1. 项目形态：TypeScript 模板 vs 纯 JavaScript

**问题**：工作区自带微信官方 TS 脚手架（`app.ts`、`Component` 示例页），需求明确要求 `app.js` 与 `Page` 写法，且要可直接运行。

**解决方案**：
- 在 `miniprogram/` 下新建 `app.js` 及全部页面的 `.js` 文件；
- `app.json` 仅注册业务页面，移除模板自带的 `logs` 页；
- 保留 `project.config.json` 中 `miniprogramRoot: miniprogram/`，用微信开发者工具打开项目根目录即可编译运行。

---

## 2. 目录如何划分才利于扩展

**问题**：三个功能差异大，若全堆在首页会导致 `index.js` 臃肿、难维护。

**解决方案**：
- **首页** `pages/index`：只做导航与功能列表配置（`features` 数组）；
- **功能页** 各独立目录：`dice`、`rps`、`picker`，每页四件套（js/json/wxml/wxss）；
- **工具层** `utils/random.js`：统一 `randomInt`、`pickRandom`、`parseOptions`，新功能可复用。

扩展新功能步骤：新建 `pages/xxx` → 在 `app.json` 的 `pages` 中注册 → 在首页 `features` 增加一项。

---

## 3. 骰子 1～6 点的 UI 实现

**问题**：仅用数字展示不够直观；用 `wx:for` 动态生成圆点数量时，与 CSS 网格定位的 `nth-child` 规则容易错位。

**解决方案**：
- 骰子 DOM 固定 6 个 `.dot` 节点；
- 父级 class 为 `dice-1` … `dice-6`，用 WXSS 按标准骰子布局控制 `display` 与 `grid-area`；
- 掷骰时用 `setInterval` 快速切换点数模拟动画，结束后 `wx.vibrateShort` 增强反馈。

---

## 4. 石头剪刀布的胜负逻辑

**问题**：需同时随机「玩家」与「对手」，并给出胜/负/平文案。

**解决方案**：
- `CHOICES` 配置表集中管理名称与 emoji；
- `judge(playerId, opponentId)` 用「克制表」`{ rock: scissors, ... }` 判断，避免冗长 if-else；
- 出拳过程同样用定时器做短暂随机动画再定格。

---

## 5. 多选项输入的解析

**问题**：用户可能用换行、中文逗号、英文逗号、分号混合输入。

**解决方案**：
- `parseOptions(text)` 用正则 `/[\n,，;；]+/` 拆分并 `trim`、过滤空串；
- 实时 `bindinput` 更新 `options.length` 提示；
- 0 个选项时按钮逻辑拦截并显示 `errorMsg`。

---

## 6. 全局样式与体验统一

**问题**：多页面若各自写按钮样式，后续改主题成本高。

**解决方案**：
- `app.wxss` 定义 `.page`、`.card`、`.btn-primary`、`.result-box` 等公共类；
- 导航栏统一紫色 `#5B6EF5`，与按钮渐变一致。

---

## 7. 在微信开发者工具中运行

1. 打开 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)；
2. 导入项目，目录选择 **`e:\Random_selector`**（含 `project.config.json` 的根目录）；
3. AppID 可使用测试号或项目内已有 AppID；
4. 编译后从首页进入三个子功能验证。

---

*文档由 AI 辅助生成，可根据实际迭代继续追加条目。*
