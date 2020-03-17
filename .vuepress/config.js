module.exports = {
    title: 'Homestack',
    description: 'Homestack is a development environment on steroids',
    themeConfig: {
        repo: 'cangelis/homestack',
        repoLabel: 'Contribute!',
        docsRepo: 'cangelis/homestack-docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        sidebar: {
            '/docs/': [
                {
                    title: 'Documentation',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        '',
                        'getting-started',
                        'networking',
                        'extending',
                        'updating'
                    ]
                },
                {
                    title: 'Available Containers',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        'services/alpine',
                        'services/php',
                        'services/nginx',
                        'services/mysql',
                        'services/redis',
                        'services/elasticsearch',
                        'services/mailhog'
                    ]
                }
            ]
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Docs', link: '/docs/' }
        ]
    },
};
