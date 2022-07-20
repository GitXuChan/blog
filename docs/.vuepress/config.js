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
    description: '徐婵个人博客',
    themeConfig: {
        nav: [{
            text: '首页',
            link: '/'
        },
        {
            text: '低代码',
            link: '/summarize/'
        },
        {
            text: '工具',
            link: '/blog/underscore/'
        },
        {
            text: '开源',
            link: '/openSource/start/'
        }
        ],
        sidebar: {
            '/summarize/': [
                {
                    title: '闪搭的使用总结',
                    collapsable: true,
                    children: [
                        '/summarize/lowcode/0',
                        '/summarize/lowcode/1',
                        '/summarize/lowcode/2',
                        '/summarize/lowcode/3',
                        '/summarize/lowcode/4',
                        '/summarize/lowcode/5',
                        '/summarize/lowcode/6',
                        '/summarize/lowcode/7',
                        '/summarize/lowcode/8',
                        '/summarize/lowcode/9',
                        '/summarize/lowcode/10',
                        '/summarize/lowcode/11',
                        '/summarize/lowcode/12',
                        '/summarize/lowcode/13'
                    ]
                },
                {
                    title: '闪用的使用总结',
                    collapsable: true,
                    children: [
                        '/summarize/lowcodeuse/1',
                        '/summarize/lowcodeuse/2',
                        '/summarize/lowcodeuse/3',
                        '/summarize/lowcodeuse/4',
                        '/summarize/lowcodeuse/5',
                        '/summarize/lowcodeuse/6',
                        '/summarize/lowcodeuse/7'
                    ]
                }
                ,
                {
                    title: '闪联的使用总结',
                    collapsable: true,
                    children: [
                        '/summarize/lowcodeserver/1',
                        '/summarize/lowcodeserver/2',
                        '/summarize/lowcodeserver/3',
                        '/summarize/lowcodeserver/4',
                        '/summarize/lowcodeserver/5',
                        '/summarize/lowcodeserver/6',
                        '/summarize/lowcodeserver/7'
                    ]
                }
            ],
            '/openSource/': [
                {
                    title: '代码人生',
                    collapsable: true,
                    children: [
                        '/openSource/start/'
                    ]
                },
                {
                    title: '组件库',
                    collapsable: true,
                    children: [
                        '/openSource/component/'
                    ]
                },
                {
                    title: '动画库',
                    collapsable: true,
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