<template>
  <div>
    <el-button @click="click" />
    <textarea id="nestable-output" style="width: 100%" />
    <div id="nestable" class="dd">
      <ol class="dd-list">
        <li id="abc" class="dd-item" data-id="1">
          <div class="dd-handle">Item 1</div>
        </li>
        <li class="dd-item" data-id="2">
          <div class="dd-handle">Item 2</div>
          <ol class="dd-list">
            <li class="dd-item" data-id="3">
              <div class="dd-handle">Item 3</div>
            </li>
            <li class="dd-item" data-id="4">
              <div class="dd-handle">Item 4</div>
            </li>
            <li class="dd-item" data-id="5">
              <div class="dd-handle">Item 5</div>
              <ol class="dd-list">
                <li class="dd-item" data-id="6">
                  <div class="dd-handle">Item 6</div>
                </li>
                <li class="dd-item" data-id="7">
                  <div class="dd-handle">Item 7</div>
                </li>
                <li class="dd-item" data-id="8">
                  <div class="dd-handle">Item 8</div>
                </li>
              </ol>
            </li>
            <li class="dd-item" data-id="9">
              <div class="dd-handle">Item 9</div>
            </li>
            <li class="dd-item" data-id="10">
              <div class="dd-handle">Item 10</div>
            </li>
          </ol>
        </li>
        <li class="dd-item" data-id="11">
          <div class="dd-handle">Item 11</div>
        </li>
        <li class="dd-item" data-id="12">
          <div class="dd-handle">Item 12</div>
        </li>
      </ol>
    </div>
  </div>
  <!--<el-tree
    style="border:1px solid red;"
    ref="tree"
    :data="treeData"
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
        <el-button size="mini" round type="primary" icon="el-icon-delete" style="padding:3px 6px" @click="delClick(node)" />
      </span>
    </template>
  </el-tree>-->
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
        const routeIndex = new Function(newVal || 'return []')() // 路由索引
        const { results } = (await select({})).data // 路由菜单
        function test(list) {
          // 将路由索引和路由菜单关联成索引菜单
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
        const where = []
        function test2(list) {
          // 将路由菜单和树形控件对应
          list.map((v, k) => {
            list[k].label = v.path
            list[k].id = v.uuid
            where.push({
              relation: 'AND',
              field: 'uuid',
              relationship: '!=',
              condition: v.uuid
            })
            if (v.children instanceof Array) {
              test2(v.children)
            }
          })
        }
        test2(routeIndex)
        this.treeData = routeIndex
        const results2 = (await select({ where })).data.results
        console.log(results2)
      }
    }
  },
  async mounted() {
    var updateOutput = function(e) {
      var list = e.length ? e : $(e.target)
      var output = list.data('output')
      if (window.JSON) {
        output.val(window.JSON.stringify(list.nestable('serialize'))) //, null, 2));
      } else {
        output.val('JSON browser support required for this demo.')
      }
    }
    $('#nestable')
      .nestable({
        group: 1
      })
      .on('change', updateOutput)
    updateOutput($('#nestable').data('output', $('#nestable-output')))
  },
  methods: {
    click() {
      $('#abc').remove()
      $('#nestable').data('output').val(window.JSON.stringify($('#nestable').nestable('serialize')))
    },
    delClick(node) {
      this.$refs.tree.remove(node)
      this.change()
    },
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
    nodeContextmenu(event, obj, node, root) {},
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
      this.change()
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
    },
    change() {
      const routeIndex = JSON.parse(JSON.stringify(this.treeData))
      function test(list) {
        // 将路由菜单精简为路由索引
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
    }
  }
}
</script>
<style>
/**
 * Nestable
 */

.dd {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  max-width: 600px;
  list-style: none;
  font-size: 13px;
  line-height: 20px;
}

.dd-list {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}
.dd-list .dd-list {
  padding-left: 30px;
}
.dd-collapsed .dd-list {
  display: none;
}

.dd-item,
.dd-empty,
.dd-placeholder {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  min-height: 20px;
  font-size: 13px;
  line-height: 20px;
}

.dd-handle {
  display: block;
  height: 30px;
  margin: 5px 0;
  padding: 5px 10px;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #ccc;
  background: #fafafa;
  background: -webkit-linear-gradient(top, #fafafa 0%, #eee 100%);
  background: -moz-linear-gradient(top, #fafafa 0%, #eee 100%);
  background: linear-gradient(top, #fafafa 0%, #eee 100%);
  -webkit-border-radius: 3px;
  border-radius: 3px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.dd-handle:hover {
  color: #2ea8e5;
  background: #fff;
}

.dd-item > button {
  display: block;
  position: relative;
  cursor: pointer;
  float: left;
  width: 25px;
  height: 20px;
  margin: 5px 0;
  padding: 0;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  border: 0;
  background: transparent;
  font-size: 12px;
  line-height: 1;
  text-align: center;
  font-weight: bold;
}
.dd-item > button:before {
  content: "+";
  display: block;
  position: absolute;
  width: 100%;
  text-align: center;
  text-indent: 0;
}
.dd-item > button[data-action="collapse"]:before {
  content: "-";
}

.dd-placeholder,
.dd-empty {
  margin: 5px 0;
  padding: 0;
  min-height: 30px;
  background: #f2fbff;
  border: 1px dashed #b6bcbf;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.dd-empty {
  border: 1px dashed #bbb;
  min-height: 100px;
  background-color: #e5e5e5;
  background-image: -webkit-linear-gradient(
      45deg,
      #fff 25%,
      transparent 25%,
      transparent 75%,
      #fff 75%,
      #fff
    ),
    -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff
          75%, #fff);
  background-image: -moz-linear-gradient(
      45deg,
      #fff 25%,
      transparent 25%,
      transparent 75%,
      #fff 75%,
      #fff
    ),
    -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff
          75%, #fff);
  background-image: linear-gradient(
      45deg,
      #fff 25%,
      transparent 25%,
      transparent 75%,
      #fff 75%,
      #fff
    ),
    linear-gradient(
      45deg,
      #fff 25%,
      transparent 25%,
      transparent 75%,
      #fff 75%,
      #fff
    );
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
}

.dd-dragel {
  position: absolute;
  pointer-events: none;
  z-index: 9999;
}
.dd-dragel > .dd-item .dd-handle {
  margin-top: 0;
}
.dd-dragel .dd-handle {
  -webkit-box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.1);
}
</style>
