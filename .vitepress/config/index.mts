import { defineConfig } from 'vitepress'
import  en from './en.mjs'
import  ru  from './ru.mjs'

export default defineConfig({
    locales: {
        root: { label: 'English', ...en },
        ru: { label: 'Русский', ...ru }
    },
    head: [['link', { rel: 'icon', href: '/favicon.png' }]],
    themeConfig: {
        logo: {src: '/favicon.png', width: 24, height: 24},
    }

})