微信小程序「随机决定器」，三个功能：掷骰子、石头剪刀布、随机选择
怎么运行？
安装 微信开发者工具
导入项目目录 e:\Random_selector
填 AppID（可用测试号）→ 编译 即可预览
代码在 miniprogram/ 目录下。

用了什么技术？
JavaScript（.js 写逻辑）
WXML / WXSS（结构 + 样式，类似 HTML/CSS）
JSON（app.json 注册页面）
Math.random()（随机，封装在 utils/random.js）
微信 API：wx.navigateTo 跳转页面、wx.vibrateShort 震动等
没有用 Vue/React，也没有 npm 业务依赖。

结构简述
app.js / app.json     → 启动、全局配置
pages/index           → 首页，点卡片进子页面
pages/dice|rps|picker → 三个玩法页
utils/random.js       → 公共随机函数
首页点模块 → wx.navigateTo 跳转 → 各页用 Page() + setData 更新界面和动画。
