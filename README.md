# 项目名：青春邮约

### 项目简介：在重邮帮上的新生报名系统，供大一新生查看部门信息、参与组织报名和查看录取结果

> 目录结构

```
youyue
├── build
│   ├── css
│   │   └── app.b5d3b990.css        
│   ├── fonts
│   │   └── PingFang SC.10d106f2.TTF
│   ├── img
│   │   ├── approve.8594ef8c.png
│   │   ├── iconsuc.fa6e5288.svg
│   │   ├── loading.6a30c8ab.gif
│   │   ├── prompt.0bbcbdf0.png
│   │   ├── RedRock.85f27aeb.svg
│   │   └── wrong.fdaab3f3.png
│   ├── js
│   │   ├── app.a5ec62d9.js
│   │   ├── app.a5ec62d9.js.map
│   │   ├── chunk-vendors.137b0210.js
│   │   └── chunk-vendors.137b0210.js.map
│   ├── favicon.ico
│   └── index.html
├── config
│   ├── dev.env.js
│   └── pro.env.js
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   ├── font
│   │   │   ├── font.css
│   │   │   └── PingFang SC.TTF
│   │   ├── img
│   │   │   ├── approve.png
│   │   │   ├── close.png
│   │   │   ├── dpoint.png
│   │   │   ├── haschoose.png
│   │   │   ├── iconsuc.png
│   │   │   ├── iconsuc.svg
│   │   │   ├── loading 1.png
│   │   │   ├── loading.gif
│   │   │   ├── nochoose.png
│   │   │   ├── point.png
│   │   │   ├── prompt.png
│   │   │   ├── RedRock.png
│   │   │   ├── RedRock.svg
│   │   │   ├── success.png
│   │   │   ├── union.png
│   │   │   ├── unionblack.png
│   │   │   └── wrong.png
│   │   └── js
│   │       ├── resetdata.js
│   │       └── resetdepart.js
│   ├── components
│   │   ├── failure.vue
│   │   ├── home.vue
│   │   ├── infor_change.vue
│   │   ├── infor_confirm.vue
│   │   ├── introduce.vue
│   │   ├── result.vue
│   │   └── success.vue
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   ├── views
│   │   ├── Failure.vue
│   │   ├── Home.vue
│   │   ├── Infor_change.vue
│   │   ├── Infor_confirm.vue
│   │   ├── Intro.vue
│   │   ├── Result.vue
│   │   └── Success.vue
│   ├── App.vue
│   ├── main.js
│   └── sentry.js
├── babel.config.js
├── package-lock.json
├── package.json
├── README.md
└── vue.config.js
```

### 技术栈：Vue、Vue-router、Vuex

### 项目运行方式：在重邮帮小程序里点击进入

### 项目亮点/难点:对于token的处理，对特定组织排序的处理

### 项目不足：

1. change和confirm两页重复的代码太多，最早没有把他们拆分写成组件
2. 对一些公共函数没有进行模块化处理
3. 最早没有使用less和sass进行辅助编写，导致css整体比较凌乱
4. 图片引用了大量svg，png太糊了(有待解决)
5. vuex的使用不太规范
6. loading页的加法很蠢，应该改成路由跳转

### 接口文档

[接口说明]: https://www.showdoc.cc/970376013174712？page_id=5050103626722039	"密码:RedrockStaff"
[接口文档]: https://documenter.getpostman.com/view/6173433/T1LFnqHG

### 项目成员：郑志宇

### 上线时间：9.03

### 代码的GitHub/GitLab地址

[GitLab]: https://gitlab.redrock.team/web/youyue.git
[GitHub]: https://github.com/kczssd/youyue.git

### 网盘备份链接

[红岩网盘]: https://pan.redrock.team/library/8f9d18c2-0a8d-44c3-b943-3e50878d6c47/youyue/

### 线上地址

[地址]: https://we.redrock.team/game/youyue





