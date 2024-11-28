import { defineConfig } from 'vitepress'
import  en from './en.mjs'
import  ru  from './ru.mjs'

export default defineConfig({
    locales: {
        root: { label: 'Русский', ...ru },
        en: { label: 'English', ...en },
    },
    themeConfig: {
        logo: {src: '/favicon.png', width: 24, height: 24},

    },
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
        [
            "script",
            {},
            "   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n" +
            "   m[i].l=1*new Date();\n" +
            "   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}\n" +
            "   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n" +
            "   (window, document, \"script\", \"https://mc.yandex.ru/metrika/tag.js\", \"ym\");\n" +
            "\n" +
            "   ym(99065764, \"init\", {\n" +
            "        clickmap:true,\n" +
            "        trackLinks:true,\n" +
            "        accurateTrackBounce:true\n" +
            "   });"
    ],
        ["noscript",{},
            "<div><img src=\"https://mc.yandex.ru/watch/99065764\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div>"]
    ]
})