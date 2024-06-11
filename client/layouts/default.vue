<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";
import { useTheme } from '~/composables/useTheme';

const { theme } = useTheme();
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})
</script>

<template>
  <div>
    <Html
        :lang="head.htmlAttrs?.lang ?? 'en'"
        :dir="head.htmlAttrs?.dir ?? 'ltr'"
    >

    <Head>
      <Title>Nuxt Template</Title>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
        />
      </template>
      <template v-for="link in head.link" :key="link.id">
        <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
        />
      </template>
    </Head>

    <Body :class="theme">
      <Header/>
      <div class="router">
        <slot/>
      </div>
      <Footer/>
    </Body>

    </Html>
  </div>
</template>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
  transition: all 240ms ease-in-out;
}
.page-enter-from {
  @apply opacity-0 -translate-y-10;
}
.page-leave-to {
  @apply opacity-0 -translate-y-10;
}
</style>