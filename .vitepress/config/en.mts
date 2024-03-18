import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'en-US',
    title: "Tabbled",
    description: "Documentation of Tabbled platform",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/introduction' },
        ],

        sidebar: [
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/tabbled/tabbled' },
            { icon: 'youtube', link: 'https://youtube.com/@erp-systems' },
            { icon: 'discord', link: 'https://discord.gg/HaaMEyzT' },
            { icon: 'twitter', link: 'https://twitter.com/the_tabbled' }
        ]
    }
})
