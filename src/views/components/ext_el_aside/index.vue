/* eslint-disable require-atomic-updates */
<template>
  <aside ref="left" class="left" style="display:flex;flex-direction:column;position:relative;z-index:1002;flex-shrink:0;">
    <split-pane :resizer_show="resizer_show" split="horizontal" :min-percent="0" :max-percent="100" :default-percent="default_percent">
      <template slot="paneL">
        <div ref="test01" :style="aside_style">
          <div ref="menuHeader" style="position:relative;width:100%;height:30px;flex-shrink:0;box-sizing:border-box;background-color:#3C3F41;display:flex;align-items:center;justify-content:center;display:flex;justify-content:space-between;">
            <div style="color:grey">Project</div>
            <div style="display:flex;flex-direction:row;align-items:center;">
              <div class="iconfont iconcrosshairs btnEffect" style="padding:0 2px;font-size:12px;color:#bbb" />
              <div class="iconfont iconcollapse btnEffect" style="padding:0 2px;font-size:12px;color:#bbb" />
              <el-divider direction="vertical" />
              <div class="iconfont iconcog-fill btnEffect" style="padding:0 2px;font-size:12px;color:#bbb" />
              <div class="iconfont iconminus btnEffect" style="padding:0 2px;font-size:12px;color:#bbb" @click="iconminusClick1" />
            </div>
          </div>
          <div ref="menu" class="menu">
            <div id="rMenu" ref="rMenu">
              <ul style="padding: 0;margin:0;display: none;">
                <li id="reload" ref="reload" class="nav-item" @mousedown="reload()">
                  <a title="Reload" style="color:#0f0;margin:4px;"><i class="fa fa-refresh" />Reload</a>
                </li>
                <li id="NewItem" ref="NewItem" class="nav-item" @mousedown="addTreeNode()">
                  <a title="NewItem" style=";color:#0f0;margin:4px;"><i class="fa fa-plus-square" />NewItem</a>
                </li>
                <li ref="Delete" class="nav-item" @mousedown="removeTreeNode()">
                  <a title="Delete" style="color:#d58857;margin:4px;"><i class="fa fa-trash" />Delete</a>
                </li>
                <li id="Rname" ref="Rename" class="nav-item" @mousedown="editTreeNode()">
                  <a title="Rename" style="color:white;margin:4px;"><i class="fa fa-edit" />Rename</a>
                </li>
                <li ref="DirectLink" class="nav-item" @mousedown="directLink()">
                  <a title="DirectLink" style="color:white;margin:4px;"><i class="fa fa-internet-explorer" />DirectLink</a>
                </li>
                <li id="Download" ref="Download" class="nav-item" @mousedown="下载()">
                  <a title="Download" style="color:white;margin:4px;"><i class="fa fa-download" />Download</a>
                </li>
                <li id="Upload" ref="Upload" class="nav-item" @mousedown="上传()">
                  <a title="Upload" style="color:white;margin:4px;"><i class="fa fa-cloud-upload" />Upload</a>
                </li>
                <li ref="check-node" class="nav-item" @mousedown="checkTreeNode(true)">
                  <a title="Check Node" style="color:white;margin:4px;"><i class="fa fa-check-circle" /> Check Node</a>
                </li>
                <li ref="反选" class="nav-item" @mousedown="invertSelection()">
                  <a title="反选" style="color:white;margin:4px;"><i class="fa fa-delicious route180" /> 反选</a>
                </li>
                <li ref="Uncheck Node" class="nav-item" @mousedown="checkTreeNode(false)">
                  <a title="Uncheck Node" style="color:white;margin:4px;"><i class="fa fa-times-circle" /> Uncheck Node</a>
                </li>
                <li ref="Pack" class="nav-item" @click="pack()">
                  <a title="Pack" style="color:white;margin:4px;"><i class="fa fa-sitemap fa-rotate-90" />Pack</a>
                </li>
                <li ref="Unpack" class="nav-item" @click="unpack()">
                  <a title="Unpack" style="color:white;margin:4px;"><i class="fa fa-sitemap fa-rotate-270" />Unpack</a>
                </li>
                <li ref="reset" class="nav-item" @mousedown="reset()">
                  <a title="Reset" style="color:white;margin:4px;"><i class="fa fa-repeat fa-rotate-270" />Reset</a>
                </li>
                <li ref="copy" class="nav-item" @mousedown="copy()">
                  <a title="Copy" style="color:white;margin:4px;"><i class="fa fa-copy" />Copy</a>
                </li>
                <li ref="cut" class="nav-item" @mousedown="cut()">
                  <a title="Cut" style="color:white;margin:4px;"><i class="fa fa-cut" />Cut</a>
                </li>
              </ul>
            </div>
            <ul ref="treeDemo" class="ztree" style="display:block;margin: 0px; padding: 0px; height: 100%;" @keydown="treeClick" />
          </div>
          <div ref="zTreeLoading" style="position:absolute;top:30px;left:0;right:0;bottom:0px;display:flex;align-items: center;justify-content: center;bordr:1px solid red;background-color:rgb(52, 58, 64);overflow:hidden;overflow:hidden;">
            <div class="loading" />
          </div>
        </div>
      </template>
      <template slot="paneR">
        <div ref="test02" :style="aside_style">
          <div ref="menuHeader" style="position:relative;width:100%;height:30px;flex-shrink:0;height:30px;box-sizing:border-box;background-color:rgb(52, 58, 64);display:flex;align-items:center;justify-content:center;display:flex;justify-content:space-between;">
            <div style="color:grey">Favorites</div>
            <div style="display:flex;flex-direction:row;align-items:center;">
              <div class="iconfont iconcollapse btnEffect" style="padding:0 2px;font-size:12px;color:#bbb" />
              <el-divider direction="vertical" />
              <div class="iconfont iconcog-fill btnEffect" style="padding:0 2px;font-size:12px;color:#bbb" />
              <div class="iconfont iconminus btnEffect" style="padding:0 2px;font-size:12px;color:#bbb" @click="iconminusClick2" />
            </div>
          </div>
          <my-menu style="width:100%;flex:1;overflow:auto;background-color:#545c64" />
        </div>
      </template>
    </split-pane>
    <el-dialog title="新建" :visible.sync="dialogFormVisible" modal-append-to-body :close-on-click-modal="false" append-to-body>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="form.type" placeholder="类型">
            <el-option label="文件" value="file" />
            <el-option label="文件夹" value="folder" />
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-input v-model="form.path" autocomplete="off" disabled :span="8" /></el-col>
        <el-col :span="10">
          <el-input v-model="form.new" :placeholder="form.placeholder" autocomplete="off" :span="8" /></el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newFile">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="上传" :visible.sync="uploadFormVisible" :modal="true" :close-on-click-modal="false" :append-to-body="true">
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        multiple
        :action="baseURL + '/controller/test.php'"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :on-success="onSuccess"
        :data="DATA"
        :file-list="fileList"
        :auto-upload="false"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
    <div class="myBtn" @click="click" />
  </aside>
</template>
<script>
// import "../../../../libs/zTree_v3-master/demo/js/keyboard_navigation.js";
import { baseURL } from '@/utils/request2.js'
import { renameFile, delFile, newFile } from '@/api/test.js'
import '@/utils/scroll.js'
import abc from '../menu/index'
import axios from 'axios'

export default {
  name: 'Aside',
  components: {
    'my-menu': abc
  },
  props: {
    percent: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      emitMessage: {
        from: this.$options.__file,
        type: '',
        data: {}
      },
      process: process,
      AsyncTimes: 0, // 记录加载次数
      First: true, // 第一次加载
      openInfo: [], // 用于存储需要异步展开的路径
      targetId: '', // 用于存储需要展开的目标文件节点的id
      DATA: { path: '' },
      fileList: [],
      aside_style: 'display:flex;flex-direction:column;position:relative;height:100%;flex-shrink:0;overflow:hidden;',
      // aside_style:'display:flex;flex-direction:column;z-index:1002;background-color: rgb(238, 241, 246);position:absolute;top:0;bottom:0;left:0;height:100%',
      formLabelWidth: '100px',
      form: {
        path: '',
        type: 'file',
        'new': '',
        placeholder: 'index.html'
      },
      renameData: {
        path: '',
        ren: '',
        to: ''
      },
      ur: {},
      dialogFormVisible: false,
      uploadFormVisible: false,
      ztree: null,
      default_percent: 50,
      resizer_show: true,
      iconSkinLoading: 'fa fa-spin iconfont iconloading',
      iconSkinOpen: 'fa fa-folder-open iconSkinOpen',
      iconSkinClose: 'fa fa-folder iconSkinClose',
      baseURL
    }
  },
  mounted() {
    const that = this
    // that.iconminusClick1()
    that.iconminusClick2()

    that.$bus.$on('Message', that.processMessage)

    $(that.$refs['treeDemo']).focusout(function() {
      that.hideRMenu()
    })
    $(that.$refs['treeDemo']).mousedown(function() {
      that.hideRMenu()
    })

    // let dox = document.querySelector('.left');
    // dox.onmousedown = ((event) => {
    //     let disx = event.clientX - dox.offsetLeft;
    //     let disy = event.clientY - dox.offsetTop;
    //     console.log(disx);
    //     console.log(disy);
    //     document.onmousemove = ((event) => {
    //         dox.style.left = event.clientX - disx + 'px';
    //         // dox.style.top = event.clientY - disy + 'px';
    //     })
    //     document.onmouseup = ((b) => {
    //         document.onmousemove = null
    //     })
    // })
    // that.info().then((user) => {
    //   that.emitMessage.data = user
    //   that.emitMessage.type = '用户登录后获取的数据'
    //   that.$bus.$emit('Message', that.emitMessage)
    // })
    // that.emitMessage.data = { nickname: 'admin', user_path: '/', sessionid: 'er201hrpd0e2hmgbtqghqgdl05' }
    // that.emitMessage.type = '用户登录后获取的数据'
    // that.$bus.$emit('Message', that.emitMessage)

    window.info().then((user) => {
      that.emitMessage.data = user
      that.emitMessage.type = '用户登录后获取的数据2'
      that.$bus.$emit('Message', that.emitMessage)
      console.log(that.emitMessage)
    })
  },
  beforeDestroy() {
    const that = this
    that.$bus.$off('Message', that.processMessage)
  },
  async deactivated() {
  },
  async activated() {
    const that = this
    var user = await localforage.getItem('user')
    if (user.menu !== undefined && user.menu.scrollTop !== undefined && user.menu.scrollLeft !== undefined) {
      $(that.$refs['menu']).animate({ scrollTop: user.menu.scrollTop, scrollLeft: user.menu.scrollLeft }, 0)
    }
  },
  methods: {
    iconminusClick1() {
      const that = this
      $(that.$refs['test01']).hide()
      that.default_percent = 0
      that.resizer_show = false
      if ($(that.$refs['test01']).is(':hidden') && $(that.$refs['test02']).is(':hidden')) {
        $(that.$refs['left']).hide()
        that.$emit('update:percent', 0)
        that.$emit('update:resizer_show', false)
      }
    },
    iconminusClick2() {
      const that = this
      $(that.$refs['test02']).hide()
      that.default_percent = 100
      that.resizer_show = false
      if ($(that.$refs['test01']).is(':hidden') && $(that.$refs['test02']).is(':hidden')) {
        $(that.$refs['left']).hide()
        that.$emit('update:percent', 0)
        that.$emit('update:resizer_show', false)
      }
    },
    treeClick(e) {
      const that = this
      if (e.code === 'ArrowUp') {
        e.preventDefault()
        const nodes = that.ztree.getSelectedNodes()
        if (nodes && nodes.length > 0) {
          const node = nodes[0].getPreNode()
          if (node) {
            that.ztree.cancelSelectedNode()// 先取消所有的选中状态
            that.ztree.selectNode(node)// 将指定ID的节点选中
            if (!node.isParent) {
              that.tab_active(node.id)
              that.emitMessage.data = { filename: node.id }
              that.emitMessage.type = '处理文件'
              that.$bus.$emit('Message', that.emitMessage)
            }
            $('#' + node.tId).focus()
          }
        }
      } else if (e.code === 'ArrowDown') {
        e.preventDefault()
        const nodes = that.ztree.getSelectedNodes()
        if (nodes && nodes.length > 0) {
          const node = nodes[0].getNextNode()
          if (node) {
            that.ztree.cancelSelectedNode()// 先取消所有的选中状态
            that.ztree.selectNode(node)// 将指定ID的节点选中
            if (!node.isParent) {
              that.tab_active(node.id)
              that.emitMessage.data = { filename: node.id }
              that.emitMessage.type = '处理文件'
              that.$bus.$emit('Message', that.emitMessage)
            }
            $('#' + node.tId).focus()
          }
        }
      }
    },
    processMessage(emitMessage) {
      console.log(emitMessage.from ? emitMessage.from + ' ' + emitMessage.type : emitMessage.type)
      const that = this
      if (emitMessage.type === '在ztree中定位文件位置') {
        that.tab_active(emitMessage.data.filename)
      } else if (emitMessage.type === '用户登录后获取的数据2') {
        that.ur = emitMessage.data
        // that.ztree = $.fn.zTree.init(that.$refs['treeDemo'],that.setting);

        if (that.ztree) {
          that.ztreeReset()
          delete that.ztree
        }
        that.ztree = $.fn.zTree.init(that.$refs['treeDemo'], {
          edit: {
            enable: false,
            editNameSelectAll: true,
            drag: {
              next: false,
              prev: false,
              autoExpandTrigger: true
            }
          },
          data: {
            keep: {
              leaf: true,
              parent: true
            },
            key: {
              title: 'description'
            }
          },
          check: {
            enable: true
          },
          callback: {
            onDblClick: null,
            onClick: this.onlClick,
            onRightClick: this.onRightClick,
            onRename: this.onRename,
            onRemove: this.onRemove,
            beforeRemove: this.beforeRemove,
            onCollapse: this.onCollapse,
            onExpand: this.onExpand,
            onAsyncSuccess: this.onAsyncSuccess,
            onAsyncError: this.onAsyncError,
            beforeAsync: this.beforeAsync,
            beforeDrop: this.beforeDrop,
            onDrop: this.onDrop
          },
          view: {
            expandSpeed: '',
            showTitle: true,
            dblClickExpand: false,
            showLine: true,
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom,
            selectedMulti: true,
            fontCss: function(treeId, node) {
              return node.font ? node.font : {}
            }
          },
          async: {
            type: 'POST', // GET | POST
            // dataType: 'jsonp',
            cache: false,
            enable: true,
            url: baseURL + '/controller/test.php',
            autoParam: ['id', 'name=n', 'level=lv', 'checked', 'chk'],
            otherParam: { 'otherParam': that.ur.user_path },
            dataFilter: function(treeId, parentNode, childNodes) {
              if (childNodes) {
                for (let i = 0; i < childNodes.length; i++) {
                  childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.')
                  if (childNodes[i].isParent) {
                    childNodes[i].iconSkinLoading = that.iconSkinLoading
                    childNodes[i].iconSkinOpen = that.iconSkinOpen
                    childNodes[i].iconSkinClose = that.iconSkinClose
                    // childNodes[i].iconSkinOpen="button";childNodes[i].iconOpen="libs/zTree_v3-master/css/zTreeStyle/img/diy/1_open.png";
                    // childNodes[i].iconSkinClose="button";childNodes[i].iconClose="libs/zTree_v3-master/css/zTreeStyle/img/diy/1_close.png";
                  } else {
                    // childNodes[i].icon="libs/zTree_v3-master/css/zTreeStyle/img/diy/2.png";
                    childNodes[i].iconSkinDocu = childNodes[i].Docu
                  }
                  childNodes[i].font = { 'color': '#bbbbbb' }
                  if (parentNode !== undefined && parentNode.checked)childNodes[i].checked = true// 确保复选框异步加载后的选中状态正确。
                }
              }
              return childNodes
            }
          }
        })
        // $.fn.zTreeKeyboardNavigation(that.ztree, document.body);
      } else if (emitMessage.type === '已退出登录') {
        if (that.ztree) {
          that.ztreeReset()
          delete that.ztree
        }
      } else if (emitMessage.type === 'Project') {
        if ($(that.$refs['test02']).is(':hidden')) {
          that.default_percent = 100
          that.resizer_show = false
        } else {
          that.default_percent = 50
          that.resizer_show = true
        }

        if ($(that.$refs['left']).is(':hidden')) {
          $(that.$refs['left']).show()
        }
        $(that.$refs['test01']).show()
        $(that.$refs['left']).removeClass('hide')
        that.$emit('update:percent', 20)
        that.$emit('update:resizer_show', true)
      } else if (emitMessage.type === 'Favorites') {
        if ($(that.$refs['test01']).is(':hidden')) {
          that.default_percent = 0
          that.resizer_show = false
        } else {
          that.default_percent = 50
          that.resizer_show = true
        }

        if ($(that.$refs['left']).is(':hidden')) {
          $(that.$refs['left']).show()
        }

        $(that.$refs['test02']).show()
        $(that.$refs['left']).removeClass('hide')
        that.$emit('update:percent', 20)
        that.$emit('update:resizer_show', true)
      } else if (emitMessage.type === '窗体左部分大小变化为50%') {
        $(that.$refs['left']).removeClass('hide')
      }
    },
    submitUpload() {
      const that = this
      that.ztree.cancelSelectedNode()
      that.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    onSuccess(res) {
      const that = this
      const node = that.ztree.getNodeByParam('id', this.DATA.path)
      for (let i = 0; i < res.data.length; i++) {
        if (!node.children[i] || res.data[i].id !== node.children[i].id) {
          res.data[i].iconSkinOpen = that.iconSkinOpen
          res.data[i].iconSkinClose = that.iconSkinClose
          res.data[i].iconSkinLoading = that.iconSkinLoading
          res.data[i].iconSkinDocu = res.data[i].Docu

          res.data[i].font = { 'color': '#bbb' }
          const ns = that.ztree.addNodes(node, i, res.data[i], true)
          for (const item of ns) {
            that.ztree.selectNode(item, true, false)
          }
        }
      }
    },
    handleChange(file, fileList) {
      const that = this
      const exists = []
      const node = that.ztree.getNodeByParam('id', this.DATA.path)
      for (let i = 0; i < fileList.length; i++) {
        for (const item of node.children) {
          if (item.name === fileList[i].name && fileList[i].status === 'ready') {
            exists.push(item)
            fileList.splice(i--, 1)
            break
          }
        }
      }
      for (const item of exists) {
        that.$notify({
          title: '上传结果',
          dangerouslyUseHTMLString: true,
          message: item.name + ',文件已经存在',
          type: 'error',
          duration: 3000
        })
        that.ztree.selectNode(item, true, false)
      }
    },
    click() {
      const that = this
      if ($(that.$refs['left']).hasClass('hide')) {
        $(that.$refs['left']).removeClass('hide')
        that.$emit('update:percent', 20)
      } else {
        $(that.$refs['left']).addClass('hide')
        that.$emit('update:percent', 0)
      }
    },
    onlClick(event, treeId, treeNode) {
      const that = this
      if (treeNode !== null) {
        // let parentPath = ''
        // if (treeNode.getParentNode() !== null) {
        //   parentPath = treeNode.getParentNode().id
        // }
        if (treeNode.isParent) {
          // const selectNodes = this.ztree.getSelectedNodes()
          // if (selectNodes.length && selectNodes.slice(-1)[0] === treeNode) {
          //   for (const item of treeNode.children) {
          //     that.ztree.selectNode(item, true, true)
          //   }
          // } else {
          //   for (const item of treeNode.children) {
          //     that.ztree.cancelSelectedNode(item, true, true)
          //   }
          // }
        } else if (!treeNode.isParent) {
          // $('#rightPane').attr("src","?p="+parentPath+"&view="+treeNode.name);
          // $('#rightPane').attr("src","?p="+parentPath+"&edit="+treeNode.name+"&env=ace");
          // $('#rightPane').attr("src","?path="+treeNode.id.split('/').slice(0,-1).join('/')+"&view="+treeNode.name+"&quickView=0");

          // $('iframe')[0].contentWindow.document.location.replace("?path="+treeNode.id.split('/').slice(0,-1).join('/')+"&view="+treeNode.name+"&quickView=0");
          // addTab(treeNode.name,treeNode.id,"?path="+treeNode.id.split('/').slice(0,-1).join('/')+"&view="+encodeURIComponent(treeNode.name)+"&quickView=0",'fa fa-close');

          that.emitMessage.data = { filename: treeNode.id }
          that.emitMessage.type = '处理文件'
          that.$bus.$emit('Message', that.emitMessage)
          // addTab(treeNode.name,treeNode.id,"<?php //echo fm_enc(FM_ROOT_URL  . '/') ?>//" + treeNode.id);

          // $('.lightbox').attr("href","?p="+parentPath+"&view="+treeNode.name+"&quickView=1");
          // $('.lightbox').attr("data-title",treeNode.name);
          // $('.lightbox').ekkoLightbox();

          // $.ajax({
          //     type : "post",
          //     data:  {path:nodes[0].id.split('/').slice(0,-1).join('/'),ajax:true,del:nodes[0].id.split('/').slice(-1)[0]}, //序列化表单数据
          //     success : function(result){
          //         console.log(result);
          //         location.reload();
          //     }
          // });
        }
      }
    },
    onRightClick(event, treeId, treeNode) {
      const that = this
      if (!treeNode && event.target.tagName.toLowerCase() !== 'button' && $(event.target).parents('a').length === 0) {
        that.ztree.cancelSelectedNode()
        this.showRMenu('root', event.clientX, event.clientY)
      } else if (treeNode && !treeNode.noR) {
        that.ztree.selectNode(treeNode, false, true)
        this.showRMenu('node', event.clientX, event.clientY)
      }
      // that.ztree.setting.callback.onClick('','tree',treeNode);//手动触发onClick事件

      treeNode === null ? $(that.$refs['Rname']).css({ 'display': 'none' }) : $(that.$refs['Rname']).css({ 'display': 'block' });
      (treeNode === null || treeNode.isParent) ? $(that.$refs['NewItem']).css({ 'display': 'block' }) : $(that.$refs['NewItem']).css({ 'display': 'none' });
      (treeNode === null || treeNode.isParent) ? $(that.$refs['Download']).css({ 'display': 'none' }) : $(that.$refs['Download']).css({ 'display': 'block' });
      (treeNode === null || treeNode.isParent) ? $(that.$refs['Upload']).css({ 'display': 'block' }) : $(that.$refs['Upload']).css({ 'display': 'none' })
    },
    onRename() {},
    async onRemove(event, treeId, treeNode) {
      const that = this
      const arr = that.ztree.transformToArray(treeNode)
      var user = await localforage.getItem('user')
      for (const i in arr) {
        delete user.expandStatus[arr[i].id]
      }
      await localforage.setItem('user', user)
    },
    beforeRemove(treeId, treeNode) {
      const that = this
      return new Promise((resolve, reject) => {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          delFile({ ajax: 1, path: treeNode.id.split('/').slice(0, -1).join('/'), del: treeNode.id.split('/').slice(-1)[0] }).then((res) => {
            that.$notify({
              title: '删除结果',
              dangerouslyUseHTMLString: true,
              message: res.message,
              type: 'success',
              duration: 3000
            })
            if (res.code === 20000) {
              const node = that.ztree.getNodeByParam('id', treeNode.id)
              const arr = that.ztree.transformToArray(node)
              for (const item of arr) {
                const node = that.ztree.getNodeByParam('id', item.id)
                that.emitMessage.data = { filename: node.id }
                that.emitMessage.type = '文件已经删除'
                that.$bus.$emit('Message', that.emitMessage)
              }
              resolve(true)
            } else {
              reject()
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
          reject()
        })
      })
    },
    async onCollapse(event, treeId, node) {
      var user = await localforage.getItem('user')
      // user.expandStatus[node.id] = false;//换成下面一句代码
      delete user.expandStatus[node.id]// 避免indexDB中记录太多关于节点是否展开状态的数据
      await localforage.setItem('user', user)
    },
    async onExpand(event, treeId, node) {
      const that = this
      var user = await localforage.getItem('user')
      console.log('expand', node.id)
      user.expandStatus[node.id] = true
      await localforage.setItem('user', user)
      const nodes = node.children
      for (const index in nodes) {
        if (!nodes[index].open && user.expandStatus[nodes[index].id]) {
          await that.ztree.reAsyncChildNodesPromise(nodes[index], 'refresh')
        }
      }
    },
    async onAsyncSuccess(event, treeId, treeNode) {
      const that = this
      var user = await localforage.getItem('user')
      const nodes = (treeNode === undefined) ? that.ztree.getNodes() : treeNode.children
      for (const index in nodes) {
        const node = nodes[index]
        const open = user.expandStatus[node.id] === undefined ? false : user.expandStatus[node.id];

        (!node.getParentNode() || node.getParentNode().open) && that.ztree.expandNode(node, open, false, false, false)
        if (!open && node.id === that.openInfo.slice(0, 1)) { // 依次选中展开目标文件的有效路径，当目标文件无效时，可以获取原来目标文件有效时路径的一个现在有效的子路径
          that.openInfo.shift()
          that.ztree.cancelSelectedNode()// 先取消所有的选中状态
          that.ztree.selectNode(node, false, false)// 将指定ID的节点选中
          const user = await localforage.getItem('user')
          user.expandStatus[node.id] = true
          await localforage.setItem('user', user)
          !open && that.ztree.expandNode(node, true, false, true, false)// 将指定ID节点展开
        }
        if (node.id === that.targetId) { // 如果目标文件id有效那么选中它
          that.ztree.cancelSelectedNode()// 先取消所有的选中状态
          that.ztree.selectNode(node, false, false)// 将指定ID的节点选中
        }
      }

      that.AsyncTimes--
      if (that.First && that.AsyncTimes === 0) {
        console.log('completed')
        that.ztree.setting.view.expandSpeed = 'fast'// 1."fast" 2."slow" 3.""
        $(that.$refs['zTreeLoading']).css('display', 'none')
        if (user.menu !== undefined && user.menu.scrollTop !== undefined && user.menu.scrollLeft !== undefined) {
          $(that.$refs['menu']).animate({ scrollTop: user.menu.scrollTop, scrollLeft: user.menu.scrollLeft }, 0)
        }
        $(that.$refs['menu']).bind('scrollstop', async function() {
          var user = await localforage.getItem('user')
          user.menu = { 'scrollTop': $(this).scrollTop(), 'scrollLeft': $(this).scrollLeft() }
          await localforage.setItem('user', user)
        })
        that.First = false
      }
    },
    onAsyncError(event, treeId, node, XMLHttpRequest, textStatus, errorThrown) { const that = this; that.AsyncTimes--; console.error(errorThrown) },
    beforeAsync(treeId, treeNode) {
      const that = this
      that.AsyncTimes++
    },
    beforeDrop() {},
    onDrop() {},
    addHoverDom() {},
    removeHoverDom() {},
    reload() {
      const that = this
      const node = that.ztree.getSelectedNodes()[0]
      if (node) {
        that.ztree.reAsyncChildNodesPromise(node, 'refresh', true).then(async() => {
          var user = await localforage.getItem('user')
          user.expandStatus[node.id] = node.open
          await localforage.setItem('user', user)
          // let node2 = that.ztree.getNodeByParam('id',this.form.path+'/'+this.form.new);
          // that.ztree.selectNode(node2,false,false);//将指定ID的节点选中
        })
      } else {
        that.ztreeReset()
        that.ztree.reAsyncChildNodesPromise(null, 'refresh').then(() => {
          // let node2 = that.ztree.getNodeByParam('id',this.form.path+'/'+this.form.new);
          // that.ztree.selectNode(node2,false,false);//将指定ID的节点选中
        })
      }
    },
    ztreeReset() {
      const that = this
      $(that.$refs['menu']).unbind('scrollstop')
      that.ztree.setting.view.expandSpeed = ''// 1."fast" 2."slow" 3.""
      $(that.$refs['zTreeLoading']).css('display', 'flex')
      that.First = true
    },
    showRMenu(type, x, y) {
      const that = this
      $(that.$refs['rMenu']).find('ul').show()

      // y += document.body.scrollTop;
      // x += document.body.scrollLeft;
      y -= $(that.$refs['treeDemo']).offset().top
      x -= $(that.$refs['treeDemo']).offset().left
      $(that.$refs['rMenu']).css({ 'top': y + 'px', 'left': x + 'px', 'display': 'block' })
    },
    hideRMenu() {
      const that = this
      $(that.$refs['rMenu']).css({ 'display': 'none' })
    },
    addTreeNode() {
      const that = this
      if (that.ztree.getSelectedNodes()[0]) {
        that.dialogFormVisible = true
        that.form.path = that.ztree.getSelectedNodes()[0].id
      } else {
        that.dialogFormVisible = true
        that.form.path = that.ur.user_path
      }
    },
    newFile() {
      var that = this
      that.dialogFormVisible = false
      newFile(that.form).then((res) => {
        if (res.code === 20000) {
          that.$notify({
            title: '创建结果',
            dangerouslyUseHTMLString: true,
            message: res.message,
            type: 'success',
            duration: 3000
          })

          const node = that.ztree.getNodeByParam('id', this.form.path)
          const arr = node ? node.children : that.ztree.getNodes()
          for (let i = 0; i < res.data.length; i++) {
            if (!arr[i] || res.data[i].id !== arr[i].id) {
              res.data[i].iconSkinOpen = that.iconSkinOpen
              res.data[i].iconSkinClose = that.iconSkinClose
              res.data[i].iconSkinLoading = that.iconSkinLoading
              res.data[i].iconSkinDocu = res.data[i].Docu

              res.data[i].font = { 'color': '#bbb' }
              const ns = that.ztree.addNodes(node, i, res.data[i], true)
              for (const item of ns) {
                that.ztree.selectNode(item, false, false)
              }
            }
          }
        } else {
          that.$notify({
            title: '创建结果',
            dangerouslyUseHTMLString: true,
            message: res.message,
            type: 'error',
            duration: 0
          })
        }
      })
    },
    async removeTreeNode() {
      const that = this
      const nodes = that.ztree.getSelectedNodes()
      if (nodes && nodes.length > 0) {
        const arr = that.ztree.transformToArray(nodes[0])
        var user = await localforage.getItem('user')
        for (const i in arr) {
          delete user.expandStatus[arr[i].id]
        }
        await localforage.setItem('user', user)
        that.ztree.removeNode(nodes[0], true)
      }
    },
    async reset() {
      const that = this
      var user = await localforage.getItem('user')
      user.expandStatus = {}
      user.menu = { 'scrollTop': 0, 'scrollLeft': 0 }
      await localforage.setItem('user', user)
      that.ztreeReset()
      that.ztree.reAsyncChildNodesPromise(null, 'refresh').then(() => {
        // let node2 = that.ztree.getNodeByParam('id',this.form.path+'/'+this.form.new);
        // that.ztree.selectNode(node2,false,false);//将指定ID的节点选中
      })
    },
    directLink() {
      const that = this
      const nodes = that.ztree.getSelectedNodes()
      if (nodes && nodes.length > 0) {
        window.open(baseURL + '/' + nodes[0].id)
      } else {
        window.open(baseURL + '/')
      }
    },
    editTreeNode() {
      var that = this
      const nodes = that.ztree.getSelectedNodes()
      if (nodes && nodes.length > 0) {
        const e = nodes[0].id.split('/').slice(0, -1).join('/')
        const t = nodes[0].id.split('/').slice(-1)[0]

        var n = prompt('修改名称', t)
        if (n !== null && n !== '' && n !== t) {
          renameFile({ 'path': e, 'ren': t, 'to': n }).then((res) => {
            if (res.code === 20000) {
              // that.ztree.reAsyncChildNodesPromise( that.ztree.getNodeByParam('id',e), "refresh");
              const node = that.ztree.getNodeByParam('id', e + '/' + t)
              const arr = that.ztree.transformToArray(node)
              console.log(arr)
              for (const i in arr) {
                const node = that.ztree.getNodeByParam('id', arr[i].id)
                const oldFilename = node.id
                const newFilename = node.id.replace(e + '/' + t, e + '/' + n)
                node.id = newFilename
                for (let j = 0; j < res.data.length; j++) {
                  if (res.data[j].id === node.id) {
                    node.iconSkinDocu = res.data[j].Docu
                  }
                }

                node.name = node.id.split('/').slice(-1).join()
                that.ztree.updateNode(node)
                that.emitMessage.data = { oldFilename: oldFilename, newFilename: newFilename }
                that.emitMessage.type = '文件修改了名称'
                that.$bus.$emit('Message', that.emitMessage)
              }
            } else {
              that.$notify({
                title: '修改名称结果',
                dangerouslyUseHTMLString: true,
                message: res.message,
                type: 'error',
                duration: 0
              })
            }
          })
        }
      }
    },
    上传() {
      const that = this
      const nodes = that.ztree.getSelectedNodes()
      let path = ''
      if (nodes && nodes.length > 0) {
        if (nodes[0].isParent) {
          path = nodes[0].id
        } else {
          console.log('不是父节点')
          return
        }
      } else {
        path = ''
      }
      that.DATA.path = path
      this.uploadFormVisible = true
    },
    下载() {
      const that = this
      const nodes = that.ztree.getSelectedNodes()
      if (nodes && nodes.length > 0) {
        const path = nodes[0].id.split('/').slice(0, -1).join('/')
        const dl = nodes[0].id.split('/').slice(-1)[0]
        window.location.href = baseURL + '/controller/test.php?path=' + encodeURIComponent(path) + '&dl=' + encodeURIComponent(dl)
      }
    },
    checkTreeNode(checked) {
      const that = this
      const nodes = that.ztree.getSelectedNodes()
      if (nodes && nodes.length > 0) {
        that.ztree.checkNode(nodes[0], checked, true)
      } else {
        that.ztree.checkAllNodes(checked)
      }
    },
    invertSelection() {
      const that = this
      const nodes = that.ztree.getSelectedNodes()
      if (nodes && nodes.length > 0) {
        if (nodes[0].isParent && nodes[0].children) {
          const children = nodes[0].children
          $.each(children, function(index, node) {
            that.ztree.checkNode(node, !node.checked, true)
          })
        } else {
          that.ztree.checkNode(nodes[0], !nodes[0].checked, true)
        }
      } else {
        const nodes = that.ztree.getNodes()
        $.each(nodes, function(index, node) {
          that.ztree.checkNode(node, !node.checked, true)
        })
      }
    },
    async tab_active($id) {
      const that = this
      if ($id === undefined) {
        that.ztree.cancelSelectedNode()// 先取消所有的选中状态
        return// 表示welcome子frame被选中，需要返回，不继续做处理。
      }
      that.targetId = $id
      that.openInfo = []// 将需要异步展开的节点信息存储的临时数组清空。
      const node1 = that.ztree.getNodeByParam('id', $id)
      if (node1 !== undefined) { // 说明ztree存在主键为id的节点，并可以直接展开。
        that.ztree.cancelSelectedNode()// 先取消所有的选中状态
        that.ztree.selectNode(node1, false, false)// 将指定ID的节点选中
        that.ztree.expandNode(node1, true, false, true, false)// 将指定ID节点展开
      } else { // 说明ztree不存在主键为id的节点，需要异步展开。
        const arr = $id.split('/')
        let lastValidNode
        for (let i = 1; i < arr.length; i++) {
          const tmpNode = that.ztree.getNodeByParam('id', arr.slice(0, i).join('/'))
          if (tmpNode === undefined && ((arr.slice(0, i).join('/').substr(0, (that.ur.user_path.trim('/') + '/').length) === that.ur.user_path.trim('/') + '/') || that.ur.user_path === '/')) {
            that.openInfo.push(arr.slice(0, i).join('/'))
          } else lastValidNode = tmpNode
        }
        if (lastValidNode !== undefined && lastValidNode.isParent) {
          that.ztree.cancelSelectedNode()// 先取消所有的选中状态
          that.ztree.selectNode(lastValidNode, false, false)// 将指定ID的节点选中
          var user = await localforage.getItem('user')
          user.expandStatus[lastValidNode.id] = true
          await localforage.setItem('user', user)
          that.ztree.expandNode(lastValidNode, true, false, true, false)// 将指定ID节点展开
        }
      }
    },
    copy() {
      const that = this
      const nodes = that.ztree.getCheckedNodes(true)
      const ids = []
      for (const item of nodes) {
        ids.push(item.id)
      }
      for (let i = 0; i < ids.length; i++) {
        const node = that.ztree.getNodeByParam('id', ids[i])
        if (node.getCheckStatus().half || (node.getParentNode() && !node.getParentNode().getCheckStatus().half)) {
          ids.splice(i--, 1)
        }
      }
      const node = that.ztree.getSelectedNodes()[0]
      if (node) {
        that.ztree.cancelSelectedNode()
        axios.post(baseURL + '/controller/test.php', { 'file': ids, 'copy_to': node.id, 'finish': 1, 'move': false }).then(res => {
          if (res.data.code === 20000) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (!node.children[i] || res.data.data[i].id !== node.children[i].id) {
                res.data.data[i].iconSkinOpen = that.iconSkinOpen
                res.data.data[i].iconSkinClose = that.iconSkinClose
                res.data.data[i].iconSkinLoading = that.iconSkinLoading

                res.data.data[i].font = { 'color': '#bbb' }
                const ns = that.ztree.addNodes(node, i, res.data.data[i], true)
                for (const item of ns) {
                  that.ztree.selectNode(item, true, false)
                }
              }
            }
          } else {
            that.$notify({
              title: '复制结果',
              dangerouslyUseHTMLString: true,
              message: res.data.message,
              type: 'error',
              duration: 3000
            })
          }
        })
      }
    },
    cut() {
      console.log('cut')
    }
  }
}
</script>
<style>
.myBtn{
  width:12px;height:80px;
  position:absolute;
  top:calc(50% - 40px);
  right:-12px;
  background: url("images/fold_img.png") no-repeat;
  transform: rotate(0deg);
  background-size: 100% 100%;
  cursor: pointer;
}
.myBtn{
  visibility: hidden;
}

.left:hover .myBtn{
  visibility: visible;
}
.myBtn::after{
  content: "";
  width: 6px;
  height: 10px;
  transform: rotate(0deg);
  background: url("images/fold_left.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -5px 0 0 -3px;
}
.myBtn:hover::after{
  content: "";
  width: 6px;
  height: 10px;
  transform: rotate(0deg);
  background: url("images/fold_left_on.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -5px 0 0 -3px;
}
.menu{
  position:relative;
  background-color: rgb(52, 58, 64);
  height:100%;
  overflow:auto;
  padding:0;
  margin:0;
}
.left.hide{
  width:0;
}
.left.hide .myBtn{
  visibility: visible;
}
.left.hide .myBtn::after{
  background: url("images/fold_right.png") no-repeat;
}
.left.hide .myBtn:hover::after{
  background: url("images/fold_right_on.png") no-repeat;
}

.ztree .fa.fa-spin.iconfont.icon-loading{color:#fff;}
.ztree .fa.fa-font{color:#00ff1f}
/*.ztree .fa.fa-info-circle{color:#00ff1f}*/
.ztree .fa.fa-info-circle{color:#ff00ff}
.ztree .fa.fa-folder { color:#87939A}
.ztree .fa.fa-folder-open { color:#87939A;}
.ztree .fa.fa-picture-o { color:#26b99a }
.ztree .fa.fa-file-archive-o { color:#da7d7d }
.ztree .fa.fa-css3 { color:#f36fa0 }
.ztree .fa.fa-file-code-o { color:#007bff }
.ztree .fa.fa-code { color:#cc4b4c }
.ztree .fa.fa-file-text-o { color:#0096e6 }
.ztree .fa.fa-html5 { color:#d75e72 }
.ztree .fa.fa-file-excel-o { color:#09c55d }
.ztree .fa.fa-file-powerpoint-o { color:#f6712e }
.ztree .fa.fa-puzzle-piece{color:#9E7F19}
.ztree .fa{
  color:white;
}
.iconloading{
  color:white;
}

.loading {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-size: cover;
  position: absolute;
  border-top: 3px solid rgba(255, 255, 255, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
  border-left: 3px solid #ffffff;
  box-sizing: border-box;
  -webkit-transform: rotate(360deg);
  -webkit-animation: loader 1.1s infinite linear;
}
@-webkit-keyframes loader {
  0% {-webkit-transform: rotate(0deg);}
  100% {-webkit-transform: rotate(360deg);}
}
a, a:visited {
  opacity: 1.0;
}

#rMenu {position:absolute; display:none;background-color: #555;text-align: left;z-index: 100;border:solid 1px gray;border-radius:4px;overflow: hidden;box-sizing: border-box;min-width: 150px}
#rMenu ul li{
  line-height: 20px;
  margin: 2px;
  padding: 0 0px;
  cursor: pointer;
  border-radius: 2px;
  list-style: none;
  background-color: #4d4d4d;
}
#rMenu ul li:hover{
  background-color: #666;
}

.el-divider{
  opacity: .2;
  cursor:default;
}

.btnEffect{
  cursor:default;
}
.btnEffect:hover{
  background:#ffffff0f;
  border-radius:2px;
}
.btnEffect:active{
  background:#ffffff33;
}

</style>

<style lang="less">
  @import "css/fa.less";
  @import "css/awesome.less";
</style>

<style scoped>
  aside{
    padding:0;
    margin: 0;
    height:100%;
  }

</style>
