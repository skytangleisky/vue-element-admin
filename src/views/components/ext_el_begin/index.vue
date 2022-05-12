<template>
  <div class="container">
    <!--    <iframe v-show="unlogin" ref="iframe" src="../../demos/project/html5/游戏/15款实用多元的登录界面模板/login13.html" style="width:50%;height:100%;z-index:10;background:#fff;position:fixed;left:0;right:0;top:0;bottom:0;z-index:3000;width:100vw;height:100vh;border:none"/>-->
    <el-container direction="vertical" style="width:100%;height:100%;">
      <ext-el-header />
      <split-pane :resizer_show="resizer_show" split="vertical" :min-percent="20" :max-percent="100" :default-percent="percent" @click="click">
        <template slot="paneL"><ext-el-aside :resizer_show.sync="resizer_show" :percent.sync="percent" /></template>
        <template slot="paneR"><ext-el-tags style="width:100%;height:100%" :filenames="filenames" /></template>
      </split-pane>
      <terminal :style="style" />
      <ext-el-footer />
    </el-container>
    <tencent v-show="unlogin" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:2004;" />
  </div>
</template>

<script>
import ext_el_header from '../ext_el_header'
import ext_el_footer from '../ext_el_footer'
import ext_el_tags from '../ext_el_tags'
import terminal from '../ext_el_terminal'
import tencent from '../ext_el_tencent/index.vue'

import ext_el_aside from '../ext_el_aside'

export default {
  components: {
    'ext-el-header': ext_el_header,
    'ext-el-aside': ext_el_aside,
    'ext-el-tags': ext_el_tags,
    'ext-el-footer': ext_el_footer,
    'terminal': terminal,
    'tencent': tencent
  },
  data() {
    return {
      emitMessage: {
        from: this.$options.__file,
        type: '',
        data: {}
      },
      style: 'z-index:2004;visibility:hidden;bottom:20px;',
      filenames: [{ filename: 'Welcome!', editor: 'Welcome', show: true, affix: true }],
      unlogin: false,
      percent: 20,
      resizer_show: true
    }
  },
  beforeCreate() {
    window.beginTime = new Date().getTime()
  },
  mounted() {
    var that = this
    window.unloginClose = this.unloginClose
    that.$bus.$on('Message', emitMessage => {
      if (emitMessage.type === '在iframe中显示') {
        console.log(emitMessage)
        $(that.$refs['iframe']).attr('src', '/' + emitMessage.data.filename)
      } else if (emitMessage.type === '显示登录界面') {
        $('.sweep').css({ 'display': 'none' })
        that.unlogin = true
      }
    })
    that.$nextTick(() => {
      this.$notify({
        title: '页面加载时间',
        message: (new Date().getTime() - window.beginTime) + 'ms',
        duration: 1000
      })
    })

    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('height', window.innerHeight + 'px')
    })
    document.documentElement.style.setProperty('height', window.innerHeight + 'px')
    that.$bus.$on('Message', that.processMessage)
  },
  destroyed() {
    const that = this
    that.$bus.$off('Message', that.processMessage)
  },
  methods: {
    processMessage(emitMessage) {
      const that = this
      if (emitMessage.type === 'triggerTerminal') {
        if (that.style === 'z-index:2004;visibility:hidden;bottom:20px;') {
          that.style = 'z-index:2004;visibility:visible;opacity:1.0;bottom:20px;'
        } else {
          that.style = 'z-index:2004;visibility:hidden;bottom:20px;'
        }
      } else if (emitMessage.type === '隐藏登录窗口') {
        const that = this
        that.unlogin = false
      }
    },
    unloginClose() {
      const that = this
      that.unlogin = false
    },
    click(e) {
      const that = this
      that.percent = 50
      that.emitMessage.type = '窗体左部分大小变化为50%'
      that.emitMessage.data = {}
      that.$bus.$emit('Message', that.emitMessage)
    }
  }
}
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  .el-avatar>img{
    width:100%;
    height:100%;
  }

  #waifu{
    margin-bottom: 20px;
    transform: translateY(0px);
  }
</style>
<style scoped>
  .container{
    height: calc(100vh - 50px);
    position: relative;
    background: #2b2b2b
  }
  .hasTagsView .container{
    height: calc(100vh - 84px);
    position: relative;
  }
</style>
