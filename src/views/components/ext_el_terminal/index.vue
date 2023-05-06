<template>
  <div id="terminal" style="position:absolute;background: white;right:0;bottom:0;z-index:7;border:2px solid grey;border-bottom-left-radius:6px;border-top-left-radius:6px;border-top-right-radius:6px;overflow:auto;" rows="24" cols="150" />
</template>
<script>
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
export default {
  data() {
    return {
    }
  },
  mounted() {
    const term = new Terminal({
      rendererType: 'dom', // 渲染类型
      convertEol: true, // 启用时，光标将设置为下一行的开头
      scrollback: 100, // 终端中的回滚量
      disableStdin: false, // 是否应禁用输入。
      cursorStyle: 'block', // 光标样式
      cursorBlink: true, // 光标闪烁
      theme: {
        foreground: '#ddd', // 字体
        background: '#060101', // 背景色
        cursor: '#ddd'// 设置光标
      },
      fontWeight: 'bold',
      fontFamily: 'Courier New',
      fontSize: '20px'
    })

    term.open(document.getElementById('terminal'))
    // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    term.onKey(obj => {
      ws.send(obj.key)
    })
    var ws
    connect()
    function connect() {
      ws = new WebSocket('ws://tanglei.top:65535')
      // ws = new WebSocket("ws://websocket.tanglei.top");
      ws.onopen = function() {
      // $('#start').hide();$('#stop').show();
        ws.send(JSON.stringify({ 'type': 'login', 'content': 'log' }))
      }
      ws.onmessage = function(e) {
        // console.log(e.data.replace(RegExp(/(?<=\x1B\x5B)(0;).*?/, 'g'), '').replace(RegExp(/(\x1B\x5B)([^0];).*?(?<=m)/, 'g'), ''))
        // let types = data.match(RegExp(/(?<=\x1B\x5B).*?(?=m)/,'g'));
        // let res = data.split(RegExp(/(?=\x1B\x5B).*?(?<=m)/));
        // console.log(e.data.replace(RegExp(/\x1B\x5B([1-9]*[0-9];)?[1-9]*[0-9]+m/, 'g'), ''))
        term.write(e.data)
      }
      ws.onerror = function() {
      }
      ws.onclose = function() {
        connect()
      }
    }
  },
  destroyed() {
  },
  methods: {
  }
}
</script>
