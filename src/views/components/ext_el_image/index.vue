<template>
  <img ref="img">
</template>
<script>
import { baseURL } from '@/utils/request2.js'
export default {
  props: {
    filename: {
      type: String,
      default: 'uploads/images/0.png'
    }
  },
  data() {
    return {
      baseURL
    }
  },
  created() {
    this.$bus.$on('Message', this.processMessage)
  },
  mounted() {
    const that = this
    that.openfile('/' + that.filename)
  },
  destroyed() {
    const that = this
    that.$bus.$off('Message', that.processMessage)
  },
  methods: {
    processMessage(emitMessage) {
      const that = this
      if (emitMessage.type === '刷新文件') {
        if (that.filename === emitMessage.data.filename && emitMessage.data.id === that.id) {
          that.openfile('/' + that.filename)
        }
      }
    },
    openfile(src) {
      const that = this
      src = baseURL + src
      src = src.split('/').slice(0, -1).join('/') + '/' + encodeURIComponent(src.split('/').slice(-1).join())
      console.log(src)
      $(that.$refs['img']).attr('src', src + '?t=' + Math.random())
    }
  }
}
</script>
