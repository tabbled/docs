import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'ru-RU',
    title: "Tabbled",
    description: "Документация Tabbled платформы",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Домой', link: '/ru/introduction' },
        ],

        sidebar: [
            {
                text: 'Введение',
                items: [
                    { text: 'Что такое Tabbled', link: '/ru/introduction' },
                    { text: 'Быстрый старт', link: '/ru/quick-start' },
                    { text: 'Дорожная карта', link: '/ru/roadmap.md' }
                ]
            },
            {
                text: 'Установка',
                items: [
                    { text: 'Docker', link: '/ru/docker' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/tabbled/tabbled' },
            { icon: 'youtube', link: 'https://youtube.com/@erp-systems' },
            { icon: 'discord', link: 'https://discord.gg/HaaMEyzT' },
            { icon: 'twitter', link: 'https://twitter.com/the_tabbled' }
        ]
    }
})
