// 模块：创建独立的作用域

// 模块规范
// 浏览器端
// AMD 
//    asyncronous module define
//    非浏览器原生支持，代表 requireJS
// CMD
//    common module define
//    懒加载模块方式，代表 sea.js

// 服务端
// CommonJs
//    值拷贝
//    动态声明

// UMD
//    universal module define 前后端同构的模块封装工具，根据环境使用对应的模块规范
//      先判断是否NodeJs环境
//      再判断是否AMD/CMD加载规范
//      都不符合时，暴露到全局

// ES6 module
//    符合前后端统一规范
//      值引用
//      静态声明