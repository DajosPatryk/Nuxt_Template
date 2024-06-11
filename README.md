# Nuxt 3 - Modern & Performance Oriented Template

Development package based on Vue3.
Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

> **Note:**
> This package was made by Avalonia for personal use. It includes pages for legal and privacy policies.

## Setup

Make sure to install the dependencies:

```bash
# bun
cd ./client
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# bun
cd ./client
bun run dev
```

## Production

Build the application for production:

```bash
# bun
cd ./client
bun run build
```

Locally preview production build:

```bash
# bun
cd ./client
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Package

This package was made in consideration for most optimal production performance. It also uses powerful, crispy and clean UI packages.
The package includes:
- NuxtJs Mailer - For sending out E-mails through NuxtJs server.
- NuxtJs Content - For loading formatted markdown files, great for policies and blogs.
- Language framework [i18n](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/i18n) - Uses @nuxtjs/i18n, vue-i18n-routing for browser and cookie language detection, and @modernice/nuxt-i18n-modules for lazy loaded language packs.
- PostCSS - Base post-processed CSS language.
- UI Components: [ShadCn-Vue](https://www.shadcn-vue.com/docs/components/accordion.html) - Visit the link to install more components.
- Tailwind - Theme engine, a powerful custom configuration is included.
- Global Theme Variable - A theme variable class that is hooked onto default layout as a class.
- Radix Icons - Crispy and modern 15x15 vector icons.
- SF UI Text - Apple's free-to-use font. Crispy base font-family fitting all other installed packages.
- Header - A beautiful and easily expandable Header element inspired by [OpenAI](https://openai.com/) Web-App state 11.06.2024.

> **Note:**
> In order to switch locale you can use the following function
> ```
> const {localize} = useExtension()
> const switchLocalePath = useSwitchLocalePath()
> async function switchLocale(locale: string) {
> await localize(locale)
> await navigateTo({ hash: '' }, { replace: true })
> await navigateTo(switchLocalePath(locale))
> }
> ```