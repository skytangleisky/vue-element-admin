<template>
  <el-tree
    :data="treeData"
    node-key="id"
    :props="defaultProps"
    :expand-on-click-node="false"
    :default-expand-all="false"
    :highlight-current="true"
    :default-expanded-keys="expandedKeys"
    :draggable="true"
    :allow-drop="!allowDrop"
    :allow-drag="!allowDrag"
    @node-click="nodeClick"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
    @node-expand="nodeExpand"
    @node-collapse="nodeCollapse"
  >
    <template slot-scope="{ node, data }">
      <span :style="{'font-size':'12px','color':data.hidden?'red':'green'}">
        <i
          v-if="data.meta&&data.meta.icon&&data.meta.icon.includes('el-icon')"
          :class="[data.meta.icon,'sub-el-icon']"
        />
        <svg-icon
          v-else-if="data.meta&&data.meta.icon"
          :icon-class="data.meta.icon"
        />
        &emsp;
        <span>{{ node.label }}&emsp;</span><span style="color:black;border:1px solid grey;background:orange;border-radius:4px;">{{ data.uuid }}</span>
        &emsp;
        <el-button v-clipboard:copy="data.uuid" v-clipboard:success="clipboardSuccess" v-clipboard:error="clipboardError" size="mini" round type="primary" icon="el-icon-document" style="padding:3px 6px" />
      </span>
    </template>
  </el-tree>
</template>
<script>
import { select } from '@/api/table/menu'
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
  directives: {
    clipboard
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: 'return []'
    }
  },
  data() {
    return {
      // expandedKeys: JSON.parse(localStorage.getItem('menusTree')) || [],
      expandedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [],
      listQuery: {
        currentPage: 1,
        pageSize: 5,
        field: '',
        order: '',
        where: [
          // {
          //   relation: "AND",
          //   field: "updatetime",
          //   relationship: "=",
          //   condition: 1
          // }
        ],
        having: []
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      async handler(newVal, oldVal) {
        this.treeData = []
        const routeIndex = new Function(newVal || 'return []')() // 路由索引
        const { results } = (await select({})).data// 路由菜单
        function test(list) { // 将路由索引和路由菜单关联成索引菜单
          list.map((v, k) => {
            for (let i = 0; i < results.length; i++) {
              if (results[i].uuid === v.uuid) {
                const menu = new Function(results[i].menu)()
                list[k] = { ...v, ...menu }
              }
            }
            if (v.children instanceof Array) {
              test(v.children)
            }
          })
        }
        test(routeIndex)

        function test2(list) { // 将路由菜单和树形控件对应
          list.map((v, k) => {
            list[k].label = v.path
            list[k].id = v.uuid
            if (v.children instanceof Array) {
              test2(v.children)
            }
          })
        }
        test2(routeIndex)
        this.treeData = routeIndex
      }
    }
  },
  async mounted() {
  },
  methods: {
    clipboardError() {
      console.error('copy error')
    },
    clipboardSuccess(v) {
      this.$message({
        message: v.text + ' copied!',
        type: 'success',
        duration: 1500
      })
    },
    nodeExpand(obj, node, root) {
      for (let i = 0; i < this.expandedKeys.length; i++) {
        if (this.expandedKeys[i] === obj.id) {
          this.expandedKeys.splice(i, 1)
        }
      }
      this.expandedKeys.push(obj.id)
      // localStorage.setItem('menusTree', JSON.stringify(this.expandedKeys))
    },
    nodeCollapse(obj, node, root) {
      for (let i = 0; i < this.expandedKeys.length; i++) {
        if (this.expandedKeys[i] === obj.id) {
          this.expandedKeys.splice(i, 1)
        }
      }
      // localStorage.setItem('menusTree', JSON.stringify(this.expandedKeys))
    },
    nodeClick(obj, node, root) {
      this.searchValue = obj.uuid
      // this.searchList(this.searchValue)
    },
    nodeContextmenu(event, obj, node, root) {
    },
    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      const routeIndex = JSON.parse(JSON.stringify(this.treeData))
      function test(list) { // 将路由菜单精简为路由索引
        list.map((v, k) => {
          if (v.children) {
            list[k] = { uuid: v.id, children: v.children }
          } else {
            list[k] = { uuid: v.id }
          }
          if (v.children instanceof Array) {
            test(v.children)
          }
        })
      }
      test(routeIndex)
      this.value = 'return ' + JSON.stringify(this.treeData)
      this.$emit('change', this.value)
      console.log('>>', routeIndex)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      // if (dropNode.data.label === '二级 3-1') {
      //   return type !== 'inner'
      // } else {
      //   return true
      // }
    },
    allowDrag(draggingNode) {
      // return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    }
  }
}
</script>
