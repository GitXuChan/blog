(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{421:function(t,a,s){"use strict";s.r(a);var e=s(10),n=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"loreal-ui-cli"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#loreal-ui-cli"}},[t._v("#")]),t._v(" "),a("H2Icon"),t._v(" Loreal UI CLI")],1),t._v(" "),a("p",[t._v("Loreal UI CLI 是一款针对于 "),a("strong",[t._v("微信小程序")]),t._v(" 以及 "),a("strong",[t._v("Loreal UI")]),t._v(" 的脚手架，通过 Loreal UI CLI 可以快速搭建一套带有 "),a("strong",[t._v("按需加载")]),t._v(" 功能和 "),a("strong",[t._v("Loreal UI")]),t._v(" 组件库的项目模板。")]),t._v(" "),a("h2",{attrs:{id:"特性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特性"}},[t._v("#")]),t._v(" 特性")]),t._v(" "),a("ul",[a("li",[t._v("提供 "),a("code",[t._v("create")]),t._v(" 命令，您可以通过此命令快速搭建一套项目模板")]),t._v(" "),a("li",[t._v("提供 "),a("code",[t._v("load")]),t._v(" 命令，此命令可以实现 Loreal UI  "),a("strong",[t._v("按需加载")]),t._v(" 功能")])]),t._v(" "),a("h2",{attrs:{id:"快速上手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快速上手"}},[t._v("#")]),t._v(" 快速上手")]),t._v(" "),a("h3",{attrs:{id:"新项目引入"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#新项目引入"}},[t._v("#")]),t._v(" 新项目引入")]),t._v(" "),a("p",[t._v("执行以下命令可以快速创建一个基于 Loreal UI CLI 的项目：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 推荐")]),t._v("\nnpx lin-ui-cli create lin-ui-demo\n")])])]),a("p",[t._v("or")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" lin-ui-cli -g\nlin-ui-cli create lin-ui-demo\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[a("code",[t._v("npx")]),t._v(" 命令会在本地创建一个临时目录，等使用完之后就会删除，不会占用空间"),a("br"),t._v(" "),a("code",[t._v("npm install -g")]),t._v(" 全局安装会在本地保存一份安装的文件")])]),t._v(" "),a("p",[t._v("当项目创建完成后，会返回如下提示语句：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Successfully created project lin-ui-demo, directory name is lin-ui-demo\nNext: Please run cd lin-ui-demo && npm install or yarn\n")])])]),a("p",[t._v("到此一个基于 Loreal UI 的微信小程序项目已经安装完成，在每次上传之前会触发 "),a("strong",[t._v("按需加载")]),t._v(" 功能，无用组件或文件将不会被打包。")]),t._v(" "),a("h3",{attrs:{id:"旧项目迁移"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#旧项目迁移"}},[t._v("#")]),t._v(" 旧项目迁移")]),t._v(" "),a("p",[t._v("首先，您在进行此操作前需有一个基于 Loreal UI 的微信小程序项目，并在 "),a("strong",[t._v("本地设置")]),t._v(" 中勾选 "),a("code",[t._v("使用npm模块")]),t._v(" 选项。\n打开小程序的项目根目录，执行下面的命令（如果使用了云开发，需要进入 miniprogram 文件夹下执行下面的命令）。")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" init -y\n")])])]),a("p",[t._v("接着，继续执行下面的命令。")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" lin-ui-cli\n")])])]),a("br"),t._v(" "),a("p",[t._v("在微信开发者工具配置文件 "),a("strong",[t._v("project.config.json")]),t._v(" 文件里写入以下代码：")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"beforeUpload"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"npx lin-ui-cli load"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("创建 "),a("strong",[t._v("lin-ui.config.json")]),t._v(" "),a("a",{attrs:{href:"#linui-config-json-attributes%EF%BC%89"}},[t._v("配置文件")]),t._v("（可选），在文件里写入：")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"lib"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"miniprogram_npm/lin-ui"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("到此 Loreal UI CLI 脚手架已经安装完成，在每次上传之前会触发 "),a("strong",[t._v("按需加载")]),t._v(" 功能，无用组件或文件将不会被打包。")]),t._v(" "),a("h2",{attrs:{id:"lin-ui-config-json-attributes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lin-ui-config-json-attributes"}},[t._v("#")]),t._v(" lin-ui.config.json (Attributes）")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("参数")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("说明")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("类型")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("可选值")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("默认值")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("lib")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("配置 Loreal UI 组件所在路径")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("String")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("miniprogram_npm/lin-ui")])])])]),t._v(" "),a("RightMenu")],1)}),[],!1,null,null,null);a.default=n.exports}}]);