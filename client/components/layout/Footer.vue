<script setup>
const { t: globalT } = useMessages('global');
import Icon from "@/public/icon.svg";
</script>

<template>
  <footer class="page-pos md:my-32 my-16">
    <div>
      <NuxtLink class="flex items-end" to="/">
        <Icon class="inline-block md:w-16 md:h-16 w-12 h-12 mr-2" />
        <h4 class="inline-block" v-text="globalT('$company.name')"/>
      </NuxtLink>
      <div class="grid md:grid-cols-4 md:grid-flow-col gap-8 mt-12">
        <div class="md:order-1 order-2">
          <h4 class="font-bold text-lg mb-2" v-text="globalT('$navigation.company')"/>
          <NuxtLink to="/legal"><p class="font-medium text-sm mb-2" v-text="globalT('$navigation.legal')"/></NuxtLink>
          <NuxtLink to="/privacy"><p class="font-medium text-sm mb-2" v-text="globalT('$navigation.privacy')"></p></NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

