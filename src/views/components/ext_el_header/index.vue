<template>
  <el-header style="line-height:50px;height:50px;display:flex;justify-content:space-between; font-size: 12px;background-color: #343a40;color: #bbb;position: relative;box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);z-index: 1001;border-bottom:1px solid #2b2b2b">
    <div id="rollParent" ref="rollParent">
      <div id="rollContent" onmousedown="javascript:window.location.reload();"> Union </div>
    </div>
    <div id="datetime" style="font-size:20px;font-weight:bold;display:flex;justify-content:center;align-items:center;" />
    <div style="display:flex;justify-content:center;align-items:center;">
      <el-dropdown style="display:flex;" trigger="click">
        <el-avatar style="width:28px;height:28px;background: transparent;outline:none;" shape="square" :src="user.avatar" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-show="status=='unlogin'" @click.native="login">登&emsp;录</el-dropdown-item>
          <el-dropdown-item @click.native="donation">捐&emsp;赠</el-dropdown-item>
          <el-dropdown-item>设&emsp;置</el-dropdown-item>
          <el-dropdown-item>帮&emsp;助</el-dropdown-item>
          <el-dropdown-item v-show="status=='logined'" divided @click.native="logout">退&emsp;出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="vertical-align:center;display:inline-block;padding:0 8px;">{{ user.nickname }}</span>
    </div>
  </el-header>
</template>
<script>

import { setPay, Tips_Click } from './pay.js'
import axios from 'axios'
import { baseURL } from '@/utils/request2.js'
export default {
  data() {
    return {
      baseURL,
      emitMessage: {
        from: this.$options.__file,
        type: '',
        data: {}
      },
      user: {
        avatar: baseURL + '/emoji/经典表情245/12/得意.png',
        nickname: '游客'
      },
      defaultUser: { avatar: baseURL + '/emoji/经典表情245/12/得意.png', nickname: '游客' },
      status: 'unlogin'
    }
  },
  created() {
    this.$bus.$on('Message', this.processMessage)
  },
  mounted() {
    this.timer = setInterval((function f() {
      document.getElementById('datetime').innerHTML = new Date().Format('yyyy-MM-dd HH:mm:ss')
      return f
    })(), 1000)
    setPay(function() {
      console.log('支付模块初始化完成')
    })
  },
  activated() {
    console.log('activated')
    this.timer && window.clearInterval(this.timer)
    this.timer = setInterval((function f() {
      document.getElementById('datetime').innerHTML = new Date().Format('yyyy-MM-dd HH:mm:ss')
      return f
    })(), 1000)
  },
  deactivated() {
    console.log('deactivated')
    window.clearInterval(this.timer)
  },
  beforeDestroy() {
    const that = this
    that.$bus.$off('Message', that.processMessage)
    window.clearInterval(this.timer)
  },
  methods: {
    processMessage(emitMessage) {
      const that = this
      if (emitMessage.type === '用户登录后获取的数据') {
        const user = emitMessage.data
        that.user.nickname = user.nickname || user.username
        that.user.avatar = user.avatar
        that.status = 'logined'
      }
    },
    login() {
      const that = this
      that.emitMessage.type = '显示登录界面'
      that.emitMessage.data = {}
      that.$bus.$emit('Message', that.emitMessage)
    },
    logout() {
      const that = this
      axios.delete(process.env.VUE_APP_BASE_API + '/libs/db/src/login.php', { logout: true }, { withCredentials: false, timeout: 10000 }).then(res => {
        $.removeCookie('Admin-Token', { path: '/' })
        that.emitMessage.type = '已退出登录'
        that.emitMessage.data = {}
        that.$bus.$emit('Message', that.emitMessage)

        that.user = { ...that.defaultUser }
        that.status = 'unlogin'
        // window.top.location.replace(window.top.location.origin+window.top.location.pathname)
      })
    },
    donation() {
      const Order = {}
      Order.total_amount = 1
      Order.subject = '捐赠'
      Order.out_trade_no = Date.now().toString()
      Tips_Click('微信支付', Order, function() {
        alert('支付成功')
      })
    }
  }
}
</script>
<style lang="less">
@width: 100px;
@time: 10s;
#rollParent{
  overflow:hidden;
  width: @width;
  border:border(4px);
  // border: 2px solid red;
  // border-radius: 6px;
}
#rollContent{
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width: fit-content;
  box-sizing:border-box;
  font-weight: bold;cursor:pointer;
  background:-webkit-gradient(linear, left top, right top, from(#21BFD7), color-stop(25%, #2C84F0), to(#A626FB));
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size:24px;
  animation: @time wordsLoop linear infinite normal;
  // border: 1px solid yellow;
  // border-radius: 6px;
}
#rollParent:hover #rollContent{
  animation-play-state: paused;
}
@keyframes wordsLoop{
  0%{
    transform: translateX(@width);
  }
  100%{
    transform: translateX(-100%);
  }
}
</style>
