import type { Global } from './local/global'

declare module '@modernice/vue-i18n-modules' {
  export interface DefineModules {
    global: Global,
  }
}
