<template>
  <el-container direction="horizontal" style="height:100%">
    <div ref="editor" contenteditable="true" style="position:relative;box-sizing: border-box;height:100%;font-family: Consolas;width:100%;outline:none;" />
    <!--<textarea id="normal-editor" ref="normal-editor" style="width:50%;height:100%;outline:none;" readonly></textarea>-->
  </el-container>
</template>
<script>
import axios from 'axios'
import { baseURL } from '@/utils/request2.js'
export default {
  name: 'Ace',
  props: {
    id: {
      type: String,
      default: ''
    },
    filename: {
      type: String,
      default: '/index.php'
    }
  },
  data() {
    return {
      baseURL,
      emitMessage: {
        from: this.$options.__file,
        type: '',
        data: {}
      },
      editor: undefined
    }
  },
  created() {
    this.$bus.$on('Message', this.processMessage)
  },
  mounted() {
    const that = this

    ace.config.set('basePath', '/libs/ace-builds-master/src/')
    var beautiful = ace.require('ace/ext/beautify')
    ace.require('ace/ext/language_tools')
    that.editor = ace.edit(this.$refs['editor'])
    ace.require('ace/ext/settings_menu').init(that.editor)
    if (that.filename.endsWith('.css.php') || that.filename.endsWith('.css')) {
      that.editor.getSession().setMode({ path: 'ace/mode/css', inline: true })
    } else if (that.filename.endsWith('.js.php')) {
      that.editor.getSession().setMode({ path: 'ace/mode/php', inline: true })
    } else if (that.filename.endsWith('.js')) {
      that.editor.getSession().setMode({ path: 'ace/mode/javascript', inline: true })
    } else if (that.filename.endsWith('.html') || that.filename.endsWith('.htm')) {
      that.editor.getSession().setMode({ path: 'ace/mode/html', inline: true })
    } else if (that.filename.endsWith('.json') || that.filename.endsWith('.gltf')) {
      that.editor.getSession().setMode({ path: 'ace/mode/json', inline: false })
    } else if (that.filename.endsWith('.ini')) {
      that.editor.getSession().setMode({ path: 'ace/mode/ini', inline: true })
    } else if (that.filename.endsWith('.less')) {
      that.editor.getSession().setMode({ path: 'ace/mode/less', inline: true })
    } else if (that.filename.endsWith('.bat')) {
      that.editor.getSession().setMode({ path: 'ace/mode/bat', inline: true })
    } else if (that.filename.endsWith('.php')) {
      that.editor.getSession().setMode({ path: 'ace/mode/php', inline: true })
    } else if (that.filename.endsWith('.vue')) {
      that.editor.getSession().setMode({ path: 'ace/mode/html_elixir', inline: true })
    } else if (that.filename.endsWith('.xml')) {
      that.editor.getSession().setMode({ path: 'ace/mode/xml', inline: true })
    } else {
      that.editor.getSession().setMode({ path: 'ace/mode/txt', inline: true })
    }

    that.editor.setPrintMarginColumn(80)
    that.editor.setShowPrintMargin(false)
    that.editor.setTheme('ace/theme/monokai')
    that.editor.getSession().setTabSize(2)
    // enable autocompletion and snippets
    that.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    })
    that.editor.on('change', function(e) {
      $(that.$refs['normal-editor']).text(that.editor.getSession().getValue())
    })

    that.editor.commands.addCommands([
      {
        name: 'save', bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
        exec: function(editor) {
          // 保存文件操作
          // editor.getSession().getValue();
          // document.getElementById("normal-editor").value;
          /*
          const data = {
            ajax: 1,
            path: that.filename.split('/').slice(0, -1).join('/'),
            content: editor.getSession().getValue(),
            type: 'save',
            edit: that.filename.split('/').slice(-1)[0]
          }
          axios({
            url: baseURL + '/controller/test.php',
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: Object.keys(data).map(function(key) { return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) }).join('&'),
            onUploadProgress: e => {
              const percent = (e.loaded / e.total * 100).toFixed(2)
              that.emitMessage.type = '进度'
              that.emitMessage.data = { percentage: percent }
              that.$bus.$emit('Message', that.emitMessage)
            }
          }).then((res) => {
            if (res.data.code === 20000) {
              console.log('保存成功')
              that.$notify({
                title: '保存成功',
                dangerouslyUseHTMLString: true,
                message: res.data.message,
                duration: 3000,
                type: 'success'
              })
            } else {
              that.$notify({
                title: '保存失败',
                dangerouslyUseHTMLString: true,
                message: res.data.message,
                duration: 3000,
                type: 'error'
              })
            }
          })*/

          const data = {
            ajax: 1,
            path: that.filename.split('/').slice(0, -1).join('/'),
            content: editor.getSession().getValue(),
            type: 'save',
            edit: that.filename.split('/').slice(-1)[0]
          }
          axios({
            url: baseURL + '/controller/test.php',
            method: 'post',
            data,
            onUploadProgress: e => {
              console.log('onUploadProgress', e)
              const percent = (e.loaded / e.total * 100).toFixed(2)
              that.emitMessage.type = '进度'
              that.emitMessage.data = { percentage: percent }
              that.$bus.$emit('Message', that.emitMessage)
            }
          }).then((res) => {
            if (res.data.code === 20000) {
              console.log('保存成功')
              that.$notify({
                title: '保存成功',
                dangerouslyUseHTMLString: true,
                message: res.data.message,
                duration: 3000,
                type: 'success'
              })
            } else {
              that.$notify({
                title: '保存失败',
                dangerouslyUseHTMLString: true,
                message: res.data.message,
                duration: 3000,
                type: 'error'
              })
            }
          })
        }
      },
      {
        name: 'format', bindKey: { win: 'Ctrl-Alt-L', mac: 'Ctrl-Command-L' },
        exec: function(editor) {
          beautiful.beautify(editor.getSession())// 格式化代码
        }
      },
      {
        name: 'showKeyboardShortcuts',
        bindKey: { win: 'Ctrl-Alt-h', mac: 'Command-Alt-h' },
        exec: function(editor) {
          ace.config.loadModule('ace/ext/keybinding_menu', function(module) {
            module.init(editor)
            editor.showKeyboardShortcuts()
          })
        }
      },
      {
        name: 'showSettingsMenu',
        bindKey: { win: 'Ctrl-q', mac: 'Ctrl-q' },
        exec: function(editor) {
          editor.showSettingsMenu()
        },
        readOnly: true
      }
    ])
    // editor.execCommand("showKeyboardShortcuts");
    that.openfile()
  },
  destroyed() {
    const that = this
    that.$bus.$off('Message', that.processMessage)
  },
  methods: {
    processMessage(emitMessage) {
      const that = this
      if (emitMessage.type === '刷新文件') {
        if (emitMessage.data.filename === that.filename && emitMessage.data.id === that.id) {
          that.openfile()
        }
      }
    },
    openfile() {
      const that = this
      that.editor.getSession().setValue('')
      axios({
        url: baseURL + '/controller/test.php',
        method: 'get',
        params: { 'path': that.filename.split('/').slice(0, -1).join('/'), 'dl': that.filename.split('/').slice(-1)[0] },
        headers: { 'content-type': 'text/plain', 'Cache-Control': 'no cache' },
        onDownloadProgress: e => {
          console.log('onDownloadProgress', e)
          const percent = (e.loaded / e.total * 100).toFixed(2)
          that.emitMessage.type = '进度'
          that.emitMessage.data = { percentage: percent }
          that.$bus.$emit('Message', that.emitMessage)
        }
      }).then((res) => {
        if (typeof (res.data) === 'string') {
          that.editor.getSession().setValue(res.data)
        } else {
          that.editor.getSession().setValue(JSON.stringify(res.data, null, 2))
        }
        // that.editor.setValue(res.data);that.editor.moveCursorTo(0, 0);
        // that.editor.getSession().setValue(JSON.stringify(res.data));
        // $(that.$refs["normal-editor"]).text(res.data);
      })
    }
  }
}
</script>
