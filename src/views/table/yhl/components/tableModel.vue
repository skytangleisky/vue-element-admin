<template>
  <div id="table-model">
    <!--
      highlight-current-row:是否高亮当前行
      header-cell-style:表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
      empty-text:空数据时显示的文本内容
      @sort-change:当表格的排序条件发生变化的时候会触发该事件
    -->
    <el-table
      :data="list"
      style="width: 100%"
      highlight-current-row="true"
      :header-cell-style="{background:'#f5f7fa'}"
      @sort-change="sortChange"
      @selection-change="selectionChange"
    >
      <!-- 复选框 -->
      <el-table-column
        type="selection"
        fixed="left"
      />
      <!-- 序号 -->
      <el-table-column
        label="序号"
        type="index"
        :index="setIndex"
        fixed="left"
      />

      <el-table-column
        v-for="item in tableCol"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
        :show-overflow-tooltip="item.showOverflowTooltip"
        :sortable="item.sortable"
      />

      <el-table-column
        label="操作"
        fixed="right"
        width="150"
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="getDetailData(scope.row)"
          >查看</el-button>
          <el-button
            type="text"
            size="small"
            @click="getEditData(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteList(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<style lang='less' scoped>
</style>

<script>
export default {
  props: {
    // 表格每列展示的数据
    tableCol: {
      default() {
        return []
      },
      type: Array
    },
    // 表格数据
    list: {
      default() {
        return []
      },
      type: Object
    },
    // 当前页
    currentPage: {
      default: 1,
      type: Number
    },
    // 每页大小
    pageSize: {
      default: 5,
      type: Number
    }
  },
  data() {
    return {
      // 查询条件
      query: {
        field: '',
        order: ''
      },
      // 事件总线
      emitMessage: {
        from: this.$options.__file,
        type: '',
        data: {}
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  updated() {

  },
  methods: {
    // 设置表格index值
    setIndex(index) {
      return (this.currentPage - 1) * this.pageSize + 1 + index
    },

    // 删除一条数据
    deleteList(data) {
      this.$emit('deleteList', data)
    },
    // 打开编辑窗口 + 传递当前行数据
    getEditData(data) {
      this.$emit('getEditData', data)
    },
    // 打开编辑窗口 + 传递当前行数据
    getDetailData(data) {
      this.$emit('getDetailData', data)
    },
    // 当表格的排序条件发生变化时
    sortChange(column) {
      this.query.field = column.prop
      if (column.order === 'ascending') {
        this.query.order = 'ASC'
      } else if (column.order === 'descending') {
        this.query.order = 'DESC'
      } else if (column.order === null) {
        this.query.order = 'ASC'
      }
      this.$emit('tableSort', this.query)
    },
    // 当表格的选中数据发生变化时，向‘删除选中项’按钮传输选中的数据
    selectionChange(val) {
      this.emitMessage.type = 'deleteSelectedList'
      this.emitMessage.data = val
      this.$bus.$emit('Message', this.emitMessage)
    }
  }
}
</script>
