<template>
  <!-- 分页 -->
  <!--
    page-size:每页显示条数
    page-sizes：每页显示个数选择器的选项设置
    current-page：当前页
    @size-change：pageSize 改变时会触发
    current-change：currentPage 改变时会触发
   -->
  <div id="pagination">
    <el-pagination
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20, 30]"
      style="width:100%;"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    // 统计总数据条数
    total: {
      required: true,
      type: Number
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

    }
  },
  created() {

  },
  methods: {
    // 每页显示条数改变触发
    sizeChange(val) {
      this.$emit('update:pageSize', val)
      this.$emit('pagination', { currentPage: this.currentPage, pageSize: val })
    },
    // 当前页数改变触发
    currentChange(val) {
      this.$emit('update:currentPage', val)
      this.$emit('pagination', { currentPage: val, pageSize: this.pageSize })
    }
  }
}
</script>
