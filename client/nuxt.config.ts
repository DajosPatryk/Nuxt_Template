import { locales } from './config/i18n'

export default defineNuxtConfig({
  devtools: {
    enabled: true
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-mail",
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@modernice/nuxt-i18n-modules",
    "shadcn-nuxt",
    "nuxt-svgo"
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  mail: {
    message: {
      to: "internal@avalonia.space",
    },
    smtp: {
      host: "",
      port: 587,
      auth: {
        user: "internal@avalonia.space",
        pass: "",
      },
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales,
    detectBrowserLanguage: true
  },

  i18nModules: {
    dictionary: './lang',
    initial: ['global'],
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  css: [
    '~/assets/app.css',
  ],
})