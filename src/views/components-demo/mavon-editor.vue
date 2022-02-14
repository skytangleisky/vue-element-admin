<template>
  <mavon-editor v-model="value" />
</template>

<script>
export default {
  data() {
    return {
      value: '#123',
      defaultData: 'preview'
    }
  }
}
</script>

<style scoped>

</style>
