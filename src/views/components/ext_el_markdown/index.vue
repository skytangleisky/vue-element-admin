<template>
  <div id="test-editormd" ref="test-editormd" style="display: flex;" />
</template>
<script>
import axios from 'axios'
import { baseURL } from '@/utils/request2.js'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    filename: {
      type: String,
      default: baseURL + '/libs/vue/test.md'
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
      testEditor: null
    }
  },
  mounted() {
    const that = this
    that.$bus.$on('Message', that.processMessage)
    axios({
      url: baseURL + '/controller/test.php',
      method: 'get',
      params: { 'path': that.filename.split('/').slice(0, -1).join('/'), 'dl': that.filename.split('/').slice(-1)[0] },
      onDownloadProgress: e => {
        const percent = (e.loaded / e.total * 100).toFixed(2)
        that.emitMessage.type = '进度'
        that.emitMessage.data = { percentage: percent }
        that.$bus.$emit('Message', that.emitMessage)
      }
    }).then((res) => {
      // editormd-fullscreen
      that.testEditor = editormd(that.$refs['test-editormd'], {
        width: '100%',
        height: '100%',
        path: baseURL + '/libs/markdown/lib/', // cdn.tanglei.top/libs/markdown/lib/
        pluginPath: baseURL + '/libs/markdown/plugins/',
        delay: 0,
        theme: 'dark',
        previewTheme: 'dark',
        editorTheme: 'pastel-on-dark',
        markdown: res.data,
        codeFold: true,
        lineWrapping: true,
        placeholder: '',
        // syncScrolling : false,
        saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
        searchReplace: true,
        // watch : false,                // 关闭实时预览
        // htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
        // toolbar  : false,             //关闭工具栏
        // previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
        emoji: true,
        taskList: true,
        tocm: true, // Using [TOCM]
        tex: true, // 开启科学公式TeX语言支持，默认关闭
        flowChart: true, // 开启流程图支持，默认关闭
        sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
        // dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
        // dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        // dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
        // dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
        // dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
        imageUpload: true,
        imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
        imageUploadURL: baseURL + '/libs/markdown/examples/php/upload.php',
        onload: function() {
          // this.fullscreen();
          // this.unwatch();
          // this.watch().fullscreen();
          // this.setMarkdown("#PHP");
          // this.width("100%");
          // this.height(480);
          // this.resize("100%", 640);
          this.previewing()
          const _this = this
          _this.addKeyMap({
            'Ctrl-S': function(cm) {
              const data = {
                ajax: 1,
                path: that.filename.split('/').slice(0, -1).join('/'),
                content: _this.getMarkdown(),
                type: 'save',
                edit: that.filename.split('/').slice(-1)[0]
              }
              axios({
                url: baseURL + '/controller/test.php',
                method: 'post',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: Object.keys(data).map(function(key) { return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) }).join('&'),
                onUploadProgress: e => {
                  const percent = (e.loaded / e.total * 100).toFixed(2) + '%'
                  console.log(percent)
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
          })
        }
      })
    })
  },
  destroyed() {
    const that = this
    that.$bus.$off('Message', that.processMessage)
    delete that.testEditor
  },
  methods: {
    processMessage(emitMessage) {
      const that = this
      if (emitMessage.type === '刷新文件') {
        if (that.filename === emitMessage.data.filename && emitMessage.data.id === that.id) {
          that.openfile()
        }
      }
    },
    openfile() {
      const that = this
      that.testEditor.clear()
      axios({
        url: baseURL + '/controller/test.php',
        method: 'get',
        params: { 'path': that.filename.split('/').slice(0, -1).join('/'), 'dl': that.filename.split('/').slice(-1)[0] },
        onDownloadProgress: e => {
          const percent = (e.loaded / e.total * 100).toFixed(2)
          that.emitMessage.type = '进度'
          that.emitMessage.data = { percentage: percent }
          that.$bus.$emit('Message', that.emitMessage)
        }
      }).then((res) => {
        that.testEditor.setValue(res.data)
        // that.testEditor.setMarkdown(res.data);
        // $(that.$refs["normal-editor"]).text(res.data);
      })
    }
  }
}
</script>
<style>
  .CodeMirror-scroll{
    height:100%;
    width:100%;
  }

  .CodeMirror-scroll::-webkit-scrollbar {
    height: 0px;
    width: 0px;
    background: rgba(0, 0, 0, 0.1);
    border-radius:6px;
    overflow: hidden;
  }
  .editormd-fullscreen{
    z-index: 1002;
  }
  .CodeMirror-gutters{
    z-index: 0;
  }
  .editormd .CodeMirror{
    z-index: 0;
  }
</style>
