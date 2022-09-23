<template>
  <el-container direction="vertical" style="position:relative;height:100%;">
    <div ref="tab" class="tab round" style="width: 100%;overflow: auto;" @mousewheel="handleScroll">
      <ul ref="tags" oncontextmenu="return false;">
        <li v-for="(item,index) in filenames" :id="id" :key="index" :tt="item.filename" :class="item.show==true?'active':''" @mousedown="liMousedown">{{ item.filename }}<i class="fa fa-close" @mousedown="iMousedown" /></li>
      </ul>
    </div>

    <div class="tab-content" style="flex: 1;overflow:auto;border:2px solid #3b3b3b;border-radius:4px;position:relative;box-sizing:border-box;">
      <div v-for="(item,index) in filenames" v-show="filenames[index].show" :id="id" :key="filenames[index].filename" style="position:absolute;left:0;top:0;right:0;bottom:0;">
        <el-main1 v-if="item.editor=='Ace'" :id="id" :key="filenames[index].filename" :filename="filenames[index].filename" style="width:100%;height:100%" />
        <el-markdown v-else-if="item.editor=='Markdown'" :id="id" :key="filenames[index].filename" :filename="filenames[index].filename" style="width:100%;height:100%" />
        <el-image v-else-if="item.editor=='Image'" :id="id" :key="filenames[index].filename" :filename="filenames[index].filename" />
        <el-welcome v-else-if="item.editor=='Welcome'" :id="id" :key="filenames[index].filename" :filename="filenames[index].filename" />
      </div>
    </div>

    <div id="tab-menu" ref="tab-menu" tabindex="-1" style="display:none;background: #555555;position:absolute;width: 100px;top:0px;left:0px;z-index:4;outline: none;z-index:1001" oncontextmenu="return false;">
      <ul style="padding: 0;margin:0;display: block;">
        <li class="nav-item" @mousedown="tab_refresh">
          <a title="NewItem" style=";color:lightgrey;margin:4px;"><i class="fa fa-refresh fa-rotate-0" style="padding-right: 4px" />刷新</a>
        </li>
        <li class="nav-item" @mousedown="tab_position">
          <a title="Position" style=";color:lightgrey;margin:4px;"><i class="fa fa-location-arrow fa-rotate-0" style="padding-right: 4px" />定位</a>
        </li>
        <li class="nav-item" @mousedown="tab_browser">
          <a title="Position" style=";color:lightgrey;margin:4px;"><i class="fa fa-internet-explorer fa-rotate-0" style="padding-right: 4px" />预览</a>
        </li>
        <li class="nav-item" @mousedown="tab_closeRight">
          <a title="Position" style=";color:lightgrey;margin:4px;"><i class="" style="padding-right: 4px" />关闭右侧</a>
        </li>
        <li class="nav-item" @mousedown="tab_closeLeft">
          <a title="Position" style=";color:lightgrey;margin:4px;"><i class="" style="padding-right: 4px" />关闭左侧</a>
        </li>
        <li class="nav-item" @mousedown="tab_closeOther">
          <a title="Position" style=";color:lightgrey;margin:4px;"><i class="" style="padding-right: 4px" />关闭其他</a>
        </li>
        <li class="nav-item" @mousedown="tab_closeAll">
          <a title="Position" style=";color:lightgrey;margin:4px;"><i class="" style="padding-right: 4px" />关闭所有</a>
        </li>
      </ul>
    </div>
  </el-container>
</template>

<script>
import ext_el_markdown from '../ext_el_markdown'
import ext_el_ace from '../ext_el_ace'
import ext_el_main from '../ext_el_main'
import ext_el_image from '../ext_el_image'
import { baseURL } from '@/utils/request2.js'
// import ext_el_welcome from '../ext_el_welcome/index.js.php'

export default {
  components: {
    'el-main1': ext_el_ace,
    'el-markdown': ext_el_markdown,
    'el-image': ext_el_image,
    'el-welcome': ext_el_main
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    filenames: {
      type: Array,
      default: function() {
        // return [{filename:"libs/vue/test.md",show:true,editor:'Markdown'},{filename:"libs/vue/index.php",show:true,editor:'Ace'}];
        return [
          { filename: 'Welcome!', show: false, editor: 'Welcome' },
          { filename: 'libs/vue/test.md', show: false, editor: 'Markdown' },
          { filename: 'welcome.php', show: false, editor: 'Ace' },
          { filename: 'emoji/经典表情245/12/害羞.png', show: true, editor: 'Image' }
        ]
      }
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
      currentFilename: '',
      right: true,
      flag: false
    }
  },
  created() {
    this.$bus.$on('Message', this.processMessage)
  },
  mounted() {
    const that = this

    that.scrollRight()
    $(that.$refs['tab-menu']).focusout(function() {
      $(that.$refs['tab-menu']).css({ 'display': 'none' })
    })
    $(that.$refs['tab-menu']).mousedown(function() {
      $(that.$refs['tab-menu']).css({ 'display': 'none' })
    })
    $(that.$refs['tab']).bind('mousewheel', function(event, delta, deltaX, deltaY) {
      $(that.$refs['tab-menu']).css({ 'display': 'none' })
    })
    $(that.$refs['tags']).dragsort()
    $(that.$refs['tab']).scroll(function() {
      var scrollLeft = $(this).scrollLeft() // 滚动条的宽度
      var scrollWidth = $(this).width()// 当前视图宽度
      if (scrollLeft + scrollWidth >= $(that.$refs['tags']).outerWidth(true)) {
        that.right = true
      } else {
        that.right = false
      }
    })

    /* document.onkeydown = function(e){
          if(e.code=="ArrowUp"){
              let zTree = $.fn.zTree.getZTreeObj("treeDemo");
              let arr = zTree.transformToArray(zTree.getNodes());
              let nodes = zTree.getSelectedNodes();
              if (nodes && nodes.length>0) {
                  for(let i=arr.length-1;i>0;i--){
                      if(arr[i].id == nodes[0].id){
                          zTree.cancelSelectedNode();//先取消所有的选中状态
                          zTree.selectNode(arr[i-1],false,false);//将指定ID的节点选中

                          let treeNode = arr[i-1];
                          if(!treeNode.isParent)
                              addTab(treeNode.name,treeNode.id,"?path="+treeNode.id.split('/').slice(0,-1).join('/')+"&view="+encodeURIComponent(treeNode.name)+"&quickView=0",'fa fa-close');
                      }
                  }
              }
              return false;
          }else if(e.code=="ArrowDown"){
              let zTree = $.fn.zTree.getZTreeObj("treeDemo");
              let arr = zTree.transformToArray(zTree.getNodes());
              let nodes = zTree.getSelectedNodes();
              if (nodes && nodes.length>0) {
                  for(let i=0;i<arr.length-1;i++){
                      if(arr[i].id == nodes[0].id){
                          zTree.cancelSelectedNode();//先取消所有的选中状态
                          zTree.selectNode(arr[i+1],false,false);//将指定ID的节点选中

                          let treeNode = arr[i+1];
                          if(!treeNode.isParent)
                          addTab(treeNode.name,treeNode.id,"?path="+treeNode.id.split('/').slice(0,-1).join('/')+"&view="+encodeURIComponent(treeNode.name)+"&quickView=0",'fa fa-close');
                      }
                  }
              }
              return false;
          }
      };*/
  },
  beforeDestroy() {
    const that = this
    that.$bus.$off('Message', that.processMessage)
  },
  methods: {
    handleScroll(e) {
      this.$refs.tab.scrollLeft += e.deltaY
    },
    openfile(filename) {
      const that = this
      const ext = '.' + filename.split('/').slice(-1)[0].split('.').pop().toLowerCase()
      if (['.md'].indexOf(ext) > -1) {
        that.processFilename(filename, 'Markdown')
        return true
      } else if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico', '.cur', '.svg'].indexOf(ext) > -1) {
        that.processFilename(filename, 'Image')
        return true
      } else if (['.php', '.html', '.css', '.js', '.md', '.txt', '.json', '.ini', '.less', '.bat', '.vue', '.gltf', '.xml'].indexOf(ext) > -1) {
        that.processFilename(filename, 'Ace')
        return true
      } else if (filename.split('/').pop().indexOf('.') === -1) {
        that.processFilename(filename, 'Ace')
        return true
      }
      return false
    },
    processMessage(emitMessage) {
      const that = this
      if (emitMessage.type === '处理文件') {
        if (!that.openfile(emitMessage.data.filename)) {
          that.$notify({
            title: '警告',
            dangerouslyUseHTMLString: true,
            message: emitMessage.data.filename.split('/').slice(-1)[0] + '文件格式暂时不支持',
            duration: 3000,
            type: 'error'
          })
        }
      } else if (emitMessage.type === '文件已经删除') {
        that.remove(emitMessage.data.filename)
      } else if (emitMessage.type === '文件修改了名称') {
        const oldFilename = emitMessage.data.oldFilename
        const newFilename = emitMessage.data.newFilename
        for (let i = 0; i < that.filenames.length; i++) {
          if (that.filenames[i].filename === oldFilename) {
            that.filenames[i].filename = newFilename
            if (!that.openfile(newFilename)) {
              that.remove(that.oldFilename)
              that.remove(that.newFilename)
              that.$notify({
                title: '警告',
                dangerouslyUseHTMLString: true,
                message: newFilename.split('/').slice(-1)[0] + '文件格式暂时不支持',
                duration: 3000,
                type: 'error'
              })
            }
          }
        }
      } else if (emitMessage.type === '已退出登录') {
        for (let i = 0; i < that.filenames.length; i++) {
          if (that.filenames[i].affix) continue
          that.filenames.splice(i--, 1)
        }
      }
    },
    tab_refresh($e) {
      const that = this
      that.emitMessage.data = { filename: that.currentFilename, id: that.id }
      that.emitMessage.type = '刷新文件'
      that.$bus.$emit('Message', that.emitMessage)
    },
    tab_position() {
      const that = this
      that.emitMessage.data = { filename: that.currentFilename }
      that.emitMessage.type = '在ztree中定位文件位置'
      that.$bus.$emit('Message', that.emitMessage)
    },
    liMousedown($e) {
      const that = this
      if ($e.which === 1) {
        for (const item of that.filenames) {
          if (item.filename === $($e.currentTarget).attr('tt')) {
            item.show = true
          } else {
            item.show = false
          }
        }
        $(that.$refs['tab-menu']).css({ 'display': 'none' })
      } else if ($e.which === 3) {
        $e.stopPropagation()
        $e.preventDefault()
        for (const item of that.filenames) {
          if (item.filename === $($e.currentTarget).attr('tt')) {
            item.show = true
          } else {
            item.show = false
          }
        }
        let x = $e.clientX
        let y = $e.clientY
        x -= $(that.$refs['tab']).offset().left
        y -= $(that.$refs['tab']).offset().top

        $(that.$refs['tab-menu']).css({ left: x + 'px', top: y + 'px' })

        $(that.$refs['tab-menu']).css({ 'display': 'block' })
        $(that.$refs['tab-menu']).focus()
        that.currentFilename = $($e.currentTarget).attr('tt')
      } else {
        $(that.$refs['tab-menu']).css({ 'display': 'none' })
      }
    },
    iMousedown($e) {
      $e.stopPropagation()
      $e.preventDefault()
      const that = this
      if (that.flag) {
        for (let i = 0; i < that.filenames.length; i++) {
          if (that.filenames[i].affix && that.filenames[i].filename === $($e.currentTarget).closest('li').attr('tt')) { return }
        }
      }

      that.remove($($e.currentTarget).closest('li').attr('tt'))
    },
    remove($id) {
      const that = this
      const prev = $(that.$refs['tags']).find("[tt='" + $id + "']").prev()
      const next = $(that.$refs['tags']).find("[tt='" + $id + "']").next()
      let id
      if (next.length) {
        id = next.attr('tt')
      } else if (prev.length) {
        id = prev.attr('tt')
      }
      let tmp = false
      for (let i = 0; i < that.filenames.length; i++) {
        if (that.filenames[i].filename === $id) {
          tmp = true
        }
      }
      if (!tmp) return // 移除的 文件或文件夹 不在ext_el_tags中，不做处理。

      for (let i = 0; i < that.filenames.length; i++) {
        if (that.filenames[i].filename === id) {
          that.filenames[i].show = true
        } else {
          that.filenames[i].show = false
        }
        if (that.filenames[i].filename === $id) {
          if (that.flag) {
            if (that.filenames[i].affix) continue
          }
          that.filenames.splice(i--, 1)
        }
      }
    },
    scrollRight() {
      const that = this
      that.right && $(that.$refs['tab']).scrollLeft($(that.$refs['tags']).outerWidth(true) - $(that.$refs['tab']).width())
    },
    processFilename($filename, $editor) {
      const that = this
      let areadyExist = false
      for (const item of that.filenames) {
        if (item.filename === $filename) {
          item.show = true
          areadyExist = true
        } else {
          item.show = false
        }
      }
      if (!areadyExist) {
        that.filenames.push({
          filename: $filename,
          show: true,
          editor: $editor
        })
        that.$nextTick(() => {
          $(that.$refs['tags']).dragsort()
          that.scrollRight()
        })
      }
    },
    tab_browser($e) {
      const that = this
      // that.emitMessage.data = {filename:that.currentFilename};
      // that.emitMessage.type = "在iframe中显示";
      // that.$bus.$emit("Message",that.emitMessage);

      window.open(baseURL + '/' + that.currentFilename)
    },
    tab_closeRight($e) {
      const that = this
      const ids = []
      let next = $(that.$refs['tags']).find("[tt='" + that.currentFilename + "']").next()
      while (next.length) {
        ids.push(next.attr('tt'))
        next = next.next()
      }
      for (const item of ids) {
        console.log(item)
        for (let i = 0; i < that.filenames.length; i++) {
          if (that.filenames[i].filename === item) {
            if (that.filenames[i].affix) continue
            that.filenames.splice(i--, 1)
          }
        }
      }
    },
    tab_closeLeft($e) {
      const that = this
      const ids = []
      let prev = $(that.$refs['tags']).find("[tt='" + that.currentFilename + "']").prev()
      while (prev.length) {
        ids.push(prev.attr('tt'))
        prev = prev.prev()
      }
      for (const item of ids) {
        console.log(item)
        for (let i = 0; i < that.filenames.length; i++) {
          if (that.filenames[i].filename === item) {
            if (that.filenames[i].affix) continue
            that.filenames.splice(i--, 1)
          }
        }
      }
    },
    tab_closeOther($e) {
      const that = this
      for (let i = 0; i < that.filenames.length; i++) {
        if (that.filenames[i].filename === that.currentFilename) continue

        if (that.filenames[i].affix) continue
        that.filenames.splice(i--, 1)
      }
    }, tab_closeAll($e) {
      const that = this
      for (let i = 0; i < that.filenames.length; i++) {
        if (that.filenames[i].affix) continue
        that.filenames.splice(i--, 1)
      }
      if (that.filenames.length > 0) { that.filenames[that.filenames.length - 1].show = true }
    }
  }
}

</script>
<style>
  #tab-menu {position:absolute;display: none;background-color: #555;text-align: left;z-index: 100;border:solid 1px gray;border-radius:4px;overflow: hidden;box-sizing: border-box;min-width: 60px;}
  #tab-menu ul li{
    margin: 2px;
    padding: 0 0px;
    cursor: pointer;
    border-radius: 2px;
    list-style: none outside none;
    background-color: #4d4d4d;
  }
  #tab-menu ul li:hover{
    background-color: #666;
  }

  .tab::-webkit-scrollbar {
    height: 0px;
    width: 0px;
    color: transparent;
  }
</style>
