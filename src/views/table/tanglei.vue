<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        id
      </el-checkbox>
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      :key="tableKey"
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        label="Index"
        type="index"
        :index="indexMethod"
        fit
        width="80px"
        fixed="left"
      />
      <el-table-column
        type="selection"
        width="55"
        fixed="left"
      />
      <el-table-column v-if="showReviewer" label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="UUID" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.uuid }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="更新时间">
        <template slot-scope="{row}">
          <span>{{ row.updatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="账户名" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" min-width="120px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像地址" min-width="120px" align="center">
        <template slot-scope="{row}">
          <img :src="row.avatar.indexOf('http')===0||row.avatar.indexOf('https')===0 ? row.avatar : baseURL + '/' + row.avatar" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column label="访问路径" min-width="120px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.user_path }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="邮箱">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="登录方式">
        <template slot-scope="{row}">
          <span>{{ row.login_type }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="邮箱验证时间">
        <template slot-scope="{row}">
          <span>{{ row.email_verified_at }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="密码">
        <template slot-scope="{row}">
          <span>{{ row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="谷歌双因子秘钥">
        <template slot-scope="{row}">
          <span>{{ row.two_factor_secret }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="谷歌双因子恢复码">
        <template slot-scope="{row}">
          <span>{{ row.two_factor_recovery_codes }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="TOKEN" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.remember_token }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="{row}">
          <span>{{ row.pageviews }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([list[1], list[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="deleteSelection()">删除选中的数据</el-button>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <div class="show-d">
      <el-tag>The default order :</el-tag> {{ oldList }}
    </div>
    <div class="show-d">
      <el-tag>The after dragging order :</el-tag> {{ newList }}
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="username" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="temp.password" :autosize="{ minRows: 6, maxRows: 10}" type="input" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="avatar" prop="avatar">
          <el-input v-model="temp.avatar" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="user_path" prop="user_path">
          <el-input v-model="temp.user_path" type="input" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchPv } from '/src/api/article'
import { fetchList, deleteUser, updateUser, createUser } from '/src/api/user'
import { getToken } from '/src/utils/auth'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Sortable from 'sortablejs'
import { baseURL } from '@/utils/request2.js'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

export default {
  name: 'MultipleTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      baseURL,
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: 'id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: true,
      temp: {
        id: undefined,
        importance: 1,
        username: '',
        password: '',
        user_path: '',
        remark: '',
        timestamp: '',
        title: '',
        type: '',
        avatar: '',
        remember_token: '',
        status: ''
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false,
      sortable: null,
      oldList: [],
      newList: [],
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await fetchList(this.listQuery)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
      })
    },
    setSort() {
      const el = this.$refs.multipleTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remember_token: getToken(),
        remark: '',
        username: 'vue-element-admin',
        password: '111111',
        timestamp: new Date(),
        title: '',
        avatar: 'https://scpic2.chinaz.net/Files/pic/pic9/202105/apic32889_s.jpg',
        status: 'published',
        login_type: '普通登录',
        type: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          this.temp.id = null
          const { data } = await createUser(this.temp)
          if (data === '保存成功') {
            // this.list.unshift(this.temp)
            this.list.length !== 0 && this.list.length % this.listQuery.limit === 0 && (this.total += 1, this.list = [])
            this.listQuery.page = Math.floor(this.total / this.listQuery.limit + 1)
            await this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Error',
              message: 'Created Error',
              type: 'error',
              duration: 2000
            })
          }
        }
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          const { data } = await updateUser(tempData)
          if (data === '保存成功') {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Failed',
              message: 'Update Failed',
              type: 'warning',
              duration: 2000
            })
          }
          // updateArticle(tempData).then(() => {
          //   const index = this.list.findIndex(v => v.id === this.temp.id)
          //   this.list.splice(index, 1, this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: 'Success',
          //     message: 'Update Successfully',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    async handleDelete(row, index) {
      // this.list.splice(index, 1)
      this.delete([{ id: row.id }])
    },
    async deleteSelection() {
      const tmp = []
      this.multipleSelection.forEach(row => {
        tmp.push({ id: row.id })
      })
      this.delete(tmp)
    },
    async delete(data) {
      await deleteUser(data)
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.length === data.length && this.listQuery.page > 1 && this.listQuery.page >= Math.floor(this.total / this.listQuery.limit) && (this.listQuery.page -= 1)// 表格删除数据后计算page的位置
      if (this.list.length === 1) this.list = []// 防止页面切换时索引自动更新
      this.getList()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      if (sort === `+${key}`) {
        return 'ascending'
      } else if (sort === `+${key}`) {
        return 'descending'
      } else {
        return ''
      }
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else if (order === 'descending') {
        this.listQuery.sort = '-id'
      } else {
        this.listQuery.sort = 'id'
      }
      this.handleFilter()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    indexMethod(index) {
      return (this.listQuery.page - 1) * this.listQuery.limit + index + 1
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  /*border-radius: 10px;*/
  border-radius: 50%;
  border: 1px solid #2b2b2b3f;
}
</style>
