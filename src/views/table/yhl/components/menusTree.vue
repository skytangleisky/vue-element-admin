<template>
  <div>
    <textarea id="nestable-output" style="width: 100%" />
    <div style="display:flex;flex-direction:row;width:100%;justify-content:space-between;">
      <div ref="nestable3" class="dd" style="width:50%">
        <ol class="dd-list" />
      </div>
      <div ref="abc" class="dd abc" style="width:50%">
        <ol class="dd-list" />
      </div>
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
  name: 'MenusTree',
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
        console.log('改变')
        const routeIndex = new Function(newVal || 'return []')() // 路由索引
        const { results } = (await select({})).data // 路由菜单
        function recursive(list) {
          // 将路由索引和路由菜单关联成索引菜单
          list.map((v, k) => {
            for (let i = 0; i < results.length; i++) {
              if (results[i].uuid === v.uuid) {
                const menu = new Function(results[i].menu)()
                list[k] = { ...v, ...menu }
              }
            }
            if (v.children instanceof Array) {
              recursive(v.children)
            }
          })
        }
        recursive(routeIndex)
        const where = []
        function test2(list) { // 将路由菜单和树形控件对应
          for (let k = 0; k < list.length; k++) {
            const v = list[k]
            list[k].content = v.path
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
          }
        }
        test2(routeIndex)
        $(this.$refs.nestable3).off('change', this.updateOutput).off('lostItem', this.updateOutput).off('gainedItem', this.updateOutput).nestable('destroy')
        $(this.$refs.nestable3).nestable({ json: routeIndex }).on('change', this.updateOutput).on('lostItem', this.updateOutput).on('gainedItem', this.updateOutput)
        this.updateOutput($(this.$refs.nestable3))

        // this.treeData = routeIndex;
        const results2 = (await select({ where })).data.results
        const arr = []
        for (let i = 0; i < results2.length; i++) {
          const menu = new Function(results2[i].menu)()
          arr.push({ id: results2[i].uuid, content: menu.path })
        }
        $(this.$refs.abc).nestable('destroy')
        $(this.$refs.abc).nestable({ selfDrag: false, json: arr, beforeDragStop: (l, e, p) => {
          let has = false
          p.parents().map(function() {
            if ($(this).hasClass('abc')) {
              has = true
            }
          })
          console.log('++', has)
          return !has
        // l is the main container
        // e is the element that was moved
        // p is the place where element was moved.
        } })
        console.log('??', arr)
      }
    }
  },
  async mounted() {
  },
  methods: {
    updateOutput(e) {
      function recursive(list) {
        // 将路由索引和路由菜单关联成索引菜单
        list.map((v, k) => {
          if (v.children instanceof Array) {
            recursive(v.children)
          }
          if (v.children) {
            list[k] = { uuid: v.id, children: v.children }
          } else {
            list[k] = { uuid: v.id }
          }
        })
      }
      var list = e.length ? e : $(e.target)
      var output = $('#nestable-output')
      if (window.JSON) {
        output.val(window.JSON.stringify(list.nestable('serialize'))) //, null, 2));

        const arr = list.nestable('serialize')
        recursive(arr)
        console.log('result', arr)
        this.value = 'return ' + JSON.stringify(arr)
        this.$emit('change', this.value)
      } else {
        output.val('JSON browser support required for this demo.')
      }
    }
  }
}
</script>
<style lang="scss">
.dd{position:relative;display:block;margin:0;padding:0;max-width:600px;list-style:none;font-size:13px;line-height:20px}.dd-list{display:block;position:relative;margin:0;padding:0;list-style:none}.dd-list .dd-list{padding-left:30px}.dd-empty,.dd-item,.dd-placeholder{display:block;position:relative;margin:0;padding:0;min-height:20px;font-size:13px;line-height:20px}.dd-handle{display:block;height:30px;margin:5px 0;padding:5px 10px;color:#333;text-decoration:none;font-weight:700;border:1px solid #ccc;background:#fafafa;border-radius:3px;box-sizing:border-box}.dd-handle:hover{color:#2ea8e5;background:#fff}.dd-item>button{position:relative;cursor:pointer;float:left;width:25px;height:20px;margin:5px 0;padding:0;text-indent:100%;white-space:nowrap;overflow:hidden;border:0;background:0 0;font-size:12px;line-height:1;text-align:center;font-weight:700}.dd-item>button:before{display:block;position:absolute;width:100%;text-align:center;text-indent:0}.dd-item>button.dd-expand:before{content:'+'}.dd-item>button.dd-collapse:before{content:'-'}.dd-expand{display:none}.dd-collapsed .dd-collapse,.dd-collapsed .dd-list{display:none}.dd-collapsed .dd-expand{display:block}.dd-empty,.dd-placeholder{margin:5px 0;padding:0;min-height:30px;background:#f2fbff;border:1px dashed #b6bcbf;box-sizing:border-box;-moz-box-sizing:border-box}.dd-empty{border:1px dashed #bbb;min-height:100px;background-color:#e5e5e5;background-size:60px 60px;background-position:0 0,30px 30px}.dd-dragel{position:absolute;pointer-events:none;z-index:9999}.dd-dragel>.dd-item .dd-handle{margin-top:0}.dd-dragel .dd-handle{box-shadow:2px 4px 6px 0 rgba(0,0,0,.1)}.dd-nochildren .dd-placeholder{display:none}
</style>
