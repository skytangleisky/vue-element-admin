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
  mounted() {
    const that = this
    that.$bus.$on('Message', that.processMessage)
    that.openfile('/' + encodeURI(that.filename))
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
      console.log(src)
      $(that.$refs['img']).attr('src', src + '?t=' + Math.random())
    }
  }
}
</script>
