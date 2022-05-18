<template>
  <div class="container">
    <test />
  </div>
</template>
<script>
import remoteImport from '@/utils/vue-remote-import'
export default {
  'name': 'Lcc',
  components: {
    test: () => remoteImport('/lcc/entry.html', 'test')
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
    opacity: 0.8;
    position: relative;
    color: black;
    height: calc(100vh - 50px);
  }
  .hasTagsView .container{
    height: calc(100vh - 84px);
  }
</style>

