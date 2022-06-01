<template>
  <div class="container">
    <test />
  </div>
</template>
<script>
import remoteImport from '@/utils/vue-remote-import'
export default {
  'name': 'AirspaceManager',
  components: {
    test: () => remoteImport('/yhl/entry.html', 'airspaceManager')
  },
  data() {
    return {
      beginTime: new Date().getTime()
    }
  },
  mounted() {
    const that = this
    that.$nextTick(() => {
      this.$notify({
        title: '页面加载时间',
        message: (new Date().getTime() - that.beginTime) + 'ms',
        duration: 1000
      })
    })
  }
}
</script>

<style scoped>
  .container{
    height: calc(100vh - 50px);
  }
  .hasTagsView .container{
    height: calc(100vh - 84px);
  }
</style>

