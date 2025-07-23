# 数通中台 --创业项目

> 打造一个电商的后台管理系统,尝试性的在原有功能基础上引入大语言模型,替代运营的常规工作,并且能够引入一个自动爬取并分析意向用户,通过各种途径推广产品

## 项目技术栈

> 前端: Vue3 + SCSS + JavaScript + Pinia + Element Plus
> [点击访问](https://github.com/xieleihan/dataCommunicationCenter)
>
> 后端: Nodejs + Koa 
> [点击访问](https://github.com/xieleihan/dataCommunicationCenter_backend)
>
> 数据库: MySQL
> **在后端仓库的sql文件夹**

## 项目结构

```text
-dataCommunicationCenter
    │─ src // 项目源码
    │   ├ main.js // 入口文件
    │   ├ App.vue // 顶层根Vue
    │   ├ api // API请求
    │   │    ├ index.js // 封装请求
    │   │    ├ request.js // 导出接口请求
    │   │    └ websocket.js // 导出websocket方法
    │   ├ assets // 资源文件
    │   │    ├ font // 字体文件
    │   │    ├ icon // 图标资源
    │   │    ├ images // 图片资源
    │   │    ├ json // json资源
    │   │    └ template // 模版资源 
    │   ├ components // 组件
    │   │    ├ layout // 布局组件
    │   │    ├ shopping // 购买组件
    │   │    ├ start // 起始组件
    │   │    └ system // 系统组件
    │   ├ layout // 布局文件
    │   ├ router // 路由
    │   │    └ index.js // 路由文件
    │   ├ store // Pinia存储
    │   │    ├ Modules // 存储模块
    │   │    │    ├ router.js // 存储URL路径的模块
    │   │    │    └ generalStore.js // 通用模块
    │   │    └ index.js // 导出store
    │   ├ styles // 样式
    │   │    └ base.moudle.scss // 公共变量样式
    │   ├ utils // 工具函数
    │   ├ views // 视图
    │   └ style.css // 初始化项目样式
    │
    ├ vite.config.js // vite构建
    │
    ├ index.html // 入口主页模板
    │
    ├ package.json // npm包管理 
    │
    └ README.md // 阅读文档
```

## 结尾

> 感谢该项目中所运用到的开源项目的开发者,该项目永久开源,任何的使用,如果使用过程中有任何问题可以提`Issues`,或者有任何的修改也欢迎提`PR`