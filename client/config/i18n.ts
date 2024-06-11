import type { LocaleObject } from 'vue-i18n-routing'

export const locales = [
  {
    code: 'en',
    iso: 'en-US',
    isCatchallLocale: true,
  },
  {
    code: 'de',
    iso: 'de-DE',
  },
] as const satisfies LocaleObject[]

export const localeCodes = locales.map((locale) => locale.code)

export function localeToISO(code: string) {
  const locale = locales.find((locale) => locale.code === code)
  return locale ? locale.iso : undefined
}
