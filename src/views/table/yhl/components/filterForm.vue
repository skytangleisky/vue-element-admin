<template>
  <div id="filter-form">
    <el-row>
      <el-col
        :xs="14"
        :sm="8"
      >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="addDialogVisibled()"
        >
          新增
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteSelectedList()"
        >
          删除选中项
        </el-button>

      </el-col>

      <el-col
        :xs="10"
        :sm="8"
        :md="5"
        style="float:right"
      >
        <!-- @input:在 Input 值改变时触发 -->
        <el-input
          v-model="searchValue"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          @input="getSearchContent "
          @keyup.enter.native="searchList()"
        />

      </el-col>
    </el-row>
  </div>
</template>

<style lang='less' scoped>
.el-autocomplete {
  width: 100%;
}
</style>

<script>
export default {
  props: {
    searchValue: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      // 选中的数据集合
      selectedData: [],
      // 搜索的条件
      condition: ''
      // 搜索框input中v-model绑定的值
    }
  },
  watch: {
    searchValue(newValue, oldValue) {
      this.$emit('update:searchValue', newValue)
    }
  },
  created() {
    this.$bus.$on('Message', this.getSelectData)
  },
  mounted() {

  },
  beforeDestroy() {
    this.$bus.$off('Message', this.getSelectData)
  },
  methods: {
    // 打开新增数据窗口
    addDialogVisibled() {
      this.$emit('addDialogVisibled')
    },

    // 获取表格传递过来的选中数据
    getSelectData(emitMessage) {
      // console.log('emitMessage', emitMessage)
      if (emitMessage.type === 'deleteSelectedList') {
        this.selectedData = emitMessage.data
      }
    },
    // 删除选中项
    deleteSelectedList() {
      this.$emit('deleteSelectedList', this.selectedData)
    },
    // 当搜索输入框的数据变化时，获取到输入的新值
    getSearchContent(val) {
      // 去除首位空格
      this.condition = val.replace(/(^\s*)|(\s*$)/g, '')
    },
    // 搜索数据
    searchList() {
      this.$emit('searchList', this.condition)
    }
  }
}
</script>
