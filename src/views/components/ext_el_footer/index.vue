<template>
  <el-footer style="padding:0;position:relative;display:inline-flex;flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:nowrap;font-size:12px;line-height:20px;height:20px;color:red;background:#343a40;box-shadow:rgba(0, 0, 0, 0.14) 0px -4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px;z-index:2002;border-top:1px solid #2b2b2b">
    <el-dropdown placement="top-start">
      <span class="el-dropdown-link" style="outline:none;display:flex;align-items:center;">
        <svg class="stack" :style="btnStyle" aria-hidden="true" @click="btnClick"><use :xlink:href="btnHref" /></svg>
      </span>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="iconfont iconmessage">Event Log</el-dropdown-item>
        <el-dropdown-item icon="iconfont iconstar" @click.native="favoritesClick">Favorites</el-dropdown-item>
        <el-dropdown-item icon="iconfont  iconnpm">npm</el-dropdown-item>
        <el-dropdown-item icon="iconfont iconfolder" @click.native="projectClick">Project</el-dropdown-item>
        <el-dropdown-item icon="iconfont iconrun-solid">Run</el-dropdown-item>
        <el-dropdown-item icon="iconfont iconstruct">Struct</el-dropdown-item>
        <el-dropdown-item icon="iconfont iconterminal-fill">Terminal</el-dropdown-item>
        <el-dropdown-item icon="iconfont iconliebiao">TODO</el-dropdown-item>
        <el-dropdown-item icon="iconfont iconversion">Version Control</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div style="color:grey;display:flex;justify-content:center;align-items:center;flex-wrap:nowrap;white-space:nowrap;">
      Copyright &copy; 2019成都凌虎科技有限公司版权所有
      <a style="color:lightgrey;cursor:pointer;white-space:nowrap;" @click="click">蜀ICP备19030903号</a>
    </div>
    <el-progress :show-text="true" type="line" :color="colors" :stroke-width="16" :text-inside="true" :percentage="percentage" style="right:8px;width:40px;cursor:pointer;user-select:none;flex-shrink:0;" @click.native="progress_click" />
  </el-footer>
</template>
<script>
export default {
  data() {
    return {
      emitMessage: {
        from: this.$options.__file,
        type: '',
        data: {}
      },
      colors: [
        { color: '#ffff00', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      percentage: 100,
      btnHref: '#iconheap',
      btnStyle: 'width:12px;height:12px'
    }
  },
  mounted() {
    const that = this
    that.$bus.$on('Message', that.processMessage)
  },
  destroyed() {
    const that = this
    that.$bus.$off('Message', that.processMessage)
  },
  methods: {
    processMessage(emitMessage) {
      const that = this
      if (emitMessage.type === '进度') {
        that.percentage = Math.floor(Number(emitMessage.data.percentage) * 100) / 100
      }
    },
    click() {
      window.open('https://beian.miit.gov.cn', '_blank')
    },
    progress_click() {
      const that = this
      that.emitMessage.type = 'triggerTerminal'
      that.$bus.$emit('Message', that.emitMessage)
    },
    btnClick() {
      const that = this
      if (that.btnHref === '#iconheap') {
        that.btnHref = '#icontile'; that.btnStyle = 'width:14px;height:14px'
      } else {
        that.btnHref = '#iconheap'; that.btnStyle = 'width:12px;height:12px'
      }
      // $(that.$refs['btn']).find('use').attr('xlink:href','#icontile');
    },
    projectClick() {
      const that = this
      that.emitMessage.type = 'Project'
      that.emitMessage.data = {}
      that.$bus.$emit('Message', that.emitMessage)
    },
    favoritesClick() {
      const that = this
      that.emitMessage.type = 'Favorites'
      that.emitMessage.data = {}
      that.$bus.$emit('Message', that.emitMessage)
    }
  }
}
</script>
<style>
  .stack{
    width: 20px;
    height: 20px;
    fill: grey;
    overflow: hidden;
    cursor: pointer;
    margin-left: 8px;
    margin-right: 8px;
  }
  .stack:hover{
    fill: lightgrey;
  }
  .stack:active{
    fill:grey;
    outline: none;
  }
</style>
<style>
  .el-progress-bar__innerText{
    color:#fff;
  }
  .el-progress-bar__outer{
    border-radius: 15px;
    background:#1b1b1b;
  }
  .el-progress-bar__inner{
    border-radius: 0;
  }
</style>
