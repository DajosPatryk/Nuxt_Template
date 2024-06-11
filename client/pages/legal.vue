<script lang="ts" setup>
const { locale } = useI18n()

const { data: doc } = useAsyncData(`legal:${locale.value}`, async () => {
  try {
    return await queryContent(`legal/${locale.value}`).findOne()
  } catch (e) {
    return await queryContent(`legal/en`).findOne()
  }
})
</script>

<template>
    <div class="page-pos">

      <div class="section">
        <ContentRenderer v-if="doc" :value="doc"/>
      </div>

    </div>
</template>