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
            },
            {
                text: 'Конфигурация',
                items: [
                    { text: 'Общее', link: '/ru/configuration/general' },
                    { text: 'Страницы', link: '/ru/configuration/pages' },
                    { text: 'Источники данных', link: '/ru/configuration/datasources' },
                    { text: 'Функции', link: '/ru/configuration/functions' },
                    { text: 'Шаблоны печати', link: '/ru/configuration/templates' },
                    { text: 'Пользователи', link: '/ru/configuration/users' },
                    { text: 'Настройки', link: '/ru/configuration/settings' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/tabbled/tabbled' },
            { icon: 'youtube', link: 'https://www.youtube.com/@tabbled-platform' },
            { icon: 'discord', link: 'https://discord.gg/HaaMEyzT' },
            { icon: 'twitter', link: 'https://twitter.com/the_tabbled' }
        ]
    }
})
