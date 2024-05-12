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
            { icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">' +
                        '    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15l4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" fill="currentColor"/>' +
                        '</svg>'},
                link: "https://t.me/tabbled"
            },
            { icon: 'youtube', link: 'https://youtube.com/@tabbled-platform' },
            { icon: 'discord', link: 'https://discord.gg/HaaMEyzT' },
            { icon: 'twitter', link: 'https://twitter.com/the_tabbled' }
        ]
    }
})
