module.exports = {
    title: '程序员徐婵', //  标题
    keywords: "徐婵，微信搜索「程序员徐婵」关注我，长期交流学习。写有《学习源码整体架构系列》。包含jquery源码、underscore源码、lodash源码、sentry源码、vuex源码、axios源码、koa源码、redux源码。前端路上，PPT爱好者，所知甚少，唯善学。",
    description: "徐婵，微信搜索「程序员徐婵」关注我，长期交流学习。写有《学习源码整体架构系列》。包含jquery源码、underscore源码、lodash源码、sentry源码、vuex源码、axios源码、koa源码、redux源码。前端路上，PPT爱好者，所知甚少，唯善学。",
    markdown: {
        lineNumbers: false
    },
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        [
            "script",
            {
                src: "/assets/js/autopush-baidu.js"
            }
        ],
        [
            "script",
            {
                src: "/assets/js/autopush-360.js"
            }
        ]
    ],
    plugins: [['vuepress-plugin-code-copy', true]],
    description: '程序员徐婵个人博客', //描述
    themeConfig: {
        nav: [{
            text: '首页',
            link: '/'
        },
        {
            text: '开源',
            link: '/openSource/start/'
        },
        {
            text: '博客',
            link: '/blog/underscore/'
        }
        ],
        sidebar: {
            '/openSource/': [
                {
                    title: '代码人生',
                    collapsable: false,
                    children: [
                        '/openSource/start/'
                    ]
                },
                {
                    title: '组件库',
                    collapsable: false,
                    children: [
                        '/openSource/component/'
                    ]
                },
                {
                    title: '动画库',
                    collapsable: false,
                    children: [
                        '/openSource/animation/'
                    ]
                }
            ],
            '/blog/': [
                {
                    title: '日常博客',
                    collapsable: true,
                    children: [
                        '/blog/performance/1',
                        '/blog/tabbar/',
                    ]
                }
            ],
        },
        // sidebarDepth: 3,
        lastUpdated: "最后更新时间",
        // 假定 GitHub。也可以是一个完整的 GitLab 网址
        repo: 'https://github.com/GitXuchan',
        // 如果你的文档不在仓库的根部
        docsDir: 'docs',
        // 可选，默认为 master
        docsBranch: 'master',
        // 默认为 true，设置为 false 来禁用
        editLinks: false
    }
}