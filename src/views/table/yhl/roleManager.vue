<template>
  <div
    id="user"
    class="container"
  >
    <div
      ref="content"
      class="content"
    >
      <!--
      @addDialogVisibled:打开新增窗口
      @deleteSelectedList:删除选中项
      @searchList:搜索
      -->
      <filter-form
        :search-value.sync="searchValue"
        @addDialogVisibled="addPageOpen"
        @deleteSelectedList="deleteList"
        @searchList="searchList"
      />
      <div class="search">
        <el-form
          :model="searchForm"
          :inline="true"
          label-position="top"
        >
          <el-form-item label="用户类型:">
            <el-select
              v-model="searchForm.alwaysShow"
              placeholder="请选择用户类型"
              @change="searchAppType"
            >
              <el-option
                label="全部"
                :value="3"
              />
              <el-option
                label="组织机构"
                :value="1"
              />
              <el-option
                label="个人"
                :value="2"
              />

            </el-select>
          </el-form-item>
          <el-form-item label="证件类型:">
            <el-select
              v-model="searchForm.name"
              placeholder="请选择证件类型"
              @change="searchIdType"
            >
              <el-option
                label="全部"
                :value="5"
              />
              <el-option
                label="身份证"
                :value="0"
              />
              <el-option
                label="营业执照"
                :value="1"
              />
              <el-option
                label="护照"
                :value="2"
              />
              <el-option
                label="军人证"
                :value="3"
              />
              <el-option
                label="警官证"
                :value="4"
              />

            </el-select>

          </el-form-item>

          <el-form-item label="是否启用:">
            <el-select
              v-model="searchForm.updatetime"
              @change="searchSuperUser"
            >
              <el-option
                label="全部"
                :value="2"
              />
              <el-option
                label="是"
                :value="1"
              />
              <el-option
                label="否"
                :value="0"
              />
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <!--
      tableCol:渲染表格时每列的数据
      list:表格所需展示的数据
      @getEditData：打开编辑窗口 + 传递id值
      @tableSort：表格排序
      @deleteList:删除
    -->
      <table-model
        v-loading="loading"
        :table-col="tableCol"
        :list="list"
        :current-page="listQuery.currentPage"
        :page-size="listQuery.pageSize"
        @getDetailData="getDetailData"
        @getEditData="getEditData"
        @tableSort="tableSort"
        @deleteList="deleteList"
      />

      <!--
      @pagination:currentPage 与 pageSize 值变化时更新界面数据
      -->
      <pagination
        v-show="total>0"
        :total="total"
        :current-page="listQuery.currentPage"
        :page-size="listQuery.pageSize"
        @pagination="pagination"
      />
    </div>
    <!-- 新增窗口 -->
    <div
      ref="addPage"
      class="add-page crud-page"
    >
      <div class="page-title">
        新增
      </div>
      <el-form
        ref="addForm"
        label-position="right"
        label-width="140px"
        :model="addData"
        :rules="addDataRules"
      >
        <!-- <div class="title">
          基本信息
        </div> -->
        <el-form-item
          label="id"
        >
          <el-input v-model="addData.id" />
        </el-form-item>
        <el-form-item
          label="uuid"
        >
          <el-input v-model="addData.uuid" />
        </el-form-item>
        <el-form-item
          label="备注"
        >
          <el-input v-model="addData.note" />
        </el-form-item>
        <el-form-item
          label="菜单"
        >
          <el-input v-model="addData.menus" />
        </el-form-item>
        <el-form-item
          label="角色名称"
        >
          <el-input v-model="addData.role_name" />
        </el-form-item>
        <el-form-item
          label="状态"
        >
          <el-input v-model="addData.state" />
        </el-form-item>
        <el-form-item
          label="创建时间"
        >
          <el-date-picker
            v-model="addData.createtime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择创建时间"
          />
        </el-form-item>
        <el-form-item
          label="更新时间"
        >
          <el-date-picker
            v-model="addData.updatetime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="更新时间"
          />
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button @click="addPageClose()">取消</el-button>
        <el-button
          type="primary"
          @click="insertList(addData)"
        >确认</el-button>
      </div>
    </div>
    <!-- 编辑窗口 -->
    <div
      ref="editPage"
      class="edit-page crud-page"
    >
      <div class="page-title">
        编辑
      </div>
      <el-form
        ref="editForm"
        label-position="right"
        label-width="140px"
        :model="editData"
        :rules="editDataRules"
      >
        <!-- <div class="title">
          基本信息
        </div> -->
        <el-form-item
          label="id"
        >
          <el-input v-model="editData.id" />
        </el-form-item>
        <el-form-item
          label="uuid"
        >
          <el-input v-model="editData.uuid" />
        </el-form-item>
        <el-form-item
          label="备注"
        >
          <el-input v-model="editData.note" />
        </el-form-item>
        <el-form-item
          label="菜单"
        >
          <el-input v-model="editData.menus" />
          <menus-tree v-model="editData.menus" />
        </el-form-item>
        <el-form-item
          label="角色名称"
        >
          <el-input v-model="editData.role_name" />
        </el-form-item>
        <el-form-item
          label="状态"
        >
          <el-input v-model="editData.state" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="editData.createtime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="创建时间"
          />
        </el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            v-model="editData.updatetime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="更新时间"
          />
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button @click="cancelEdit()">取消</el-button>
        <el-button
          type="primary"
          @click="updateList(editData)"
        >确认</el-button>
      </div>
    </div>
    <!-- 详情窗口 -->
    <div
      ref="detailPage"
      class="detail-page crud-page"
    >
      <div class="page-title">
        详情
      </div>
      <el-descriptions
        :column="1"
        border
      >
        <el-descriptions-item label="id">{{ detailData.id }}</el-descriptions-item>
        <el-descriptions-item label="uuid">{{ detailData.uuid }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ detailData.note }}</el-descriptions-item>
        <el-descriptions-item label="菜单">{{ detailData.menus }}</el-descriptions-item>
        <el-descriptions-item label="角色名称">{{ detailData.role_name }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ detailData.state }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detailData.createtime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detailData.updatetime }}</el-descriptions-item>
      </el-descriptions>

      <div class="button">
        <el-button @click="detailPageClose()">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { insert, del, update, select } from '/src/api/table/role'
// 过滤表单模块
import filterForm from './components/filterForm.vue'
// 表格组件
import tableModel from './components/tableModel.vue'
// 分页组件
import Pagination from './components/pagination.vue'
import menusTree from './components/menusTree.vue'

export default {
  // name: "User",
  components: {
    filterForm, tableModel, Pagination, menusTree
  },
  data() {
    var idValidator = async(rule, value, callback) => {
      const existCount = await this.addValIsExist(rule.field, value)
      if (existCount > 0) {
        return callback(new Error('id已经存在'))
      }
    }
    var uuidValidator = async(rule, value, callback) => {
      const existCount = await this.addValIsExist(rule.field, value)
      if (existCount > 0) {
        return callback(new Error('uuid已经存在'))
      }
    }
    return {
      searchValue: '',
      loading: true,
      detailData: [],
      orgImgs: [],
      addDataRules: {
        id: [
          { validator: idValidator, trigger: 'blur' }
        ],
        uuid: [
          { validator: uuidValidator, trigger: 'blur' }
        ]
      },
      editDataRules: {
      },
      // 是否显示上传证件照的弹窗
      uploadDialogVisible: false,
      // 表格每列展示的数据
      tableCol: [
        {
          prop: 'id',
          label: 'id',
          width: 80,
          showOverflowTooltip: true,
          sortable: 'custom'
        },
        {
          prop: 'uuid',
          label: 'uuid',
          width: 200,
          showOverflowTooltip: true,
          sortable: 'custom'
        },
        {
          prop: 'note',
          label: '备注',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'menus',
          label: '菜单',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'role_name',
          label: '角色名称',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'state',
          label: '状态',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'createtime',
          label: '创建时间',
          width: 200,
          showOverflowTooltip: true,
          sortable: 'custom'
        },
        {
          prop: 'updatetime',
          label: '更新时间',
          width: 200,
          showOverflowTooltip: true,
          sortable: 'custom'
        }
      ],
      idImages: [],
      // 新增数据
      addDataDefault: {
        uuid: null,
        createtime: new Date().Format('yyyy-MM-dd HH:mm:ss'),
        updatetime: new Date().Format('yyyy-MM-dd HH:mm:ss')
      },
      addData: {},
      // 编辑数据
      editData: {},
      // 表格中展示的数据
      list: [],
      // 所有数据
      allList: [],
      // 查询条件
      listQuery: {
        currentPage: 1,
        pageSize: 10,
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
      },
      // 模糊搜索的内容
      searchContent: [
        {
          relation: 'OR',
          field: 'uuid',
          relationship: 'LIKE'
        },
        {
          relation: 'OR',
          field: 'role_name',
          relationship: 'LIKE'
        }
      ],
      // 分类搜索表单
      searchForm: {
        alwaysShow: 3,
        name: 5,
        updatetime: 2,
        is_staff: 2
      },
      // 统计数据总条数
      total: 0,
      // 状态默认选中项
      activeName: 'all',
      // 上传文件传递的参数
      fileCatalog: { path: '', name: 'uuid()' },
      // 已上传文件的uuid集合
      addFileno: [],
      editFileno: [],
      uploadImageUrl: '',
      editImageUrl: '',
      uploadImageVisible: false,
      editUploadImageVisible: false,
      // 省市不带‘全部’的二级联动数据
      createtimeData: null,
      // 点击编辑获取的已上传的图片
      picArr: [],
      // 所在城市代码
      updatetimeCode: null
    }
  },
  computed: {
    roles() {
      return this.$store.getters.roles
    }
  },
  created() {
    /* 获取当前年月日，作为文件上传的目录 */
    const date = new Date()
    let nowMonth = date.getMonth() + 1
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonth = '0' + nowMonth
    }
    this.fileCatalog.path = date.getFullYear() + '/' + nowMonth + '/' + date.getDate()
  },
  mounted() {
    const where = []
    this.roles.map((v, k) => {
      where.push({
        relation: 'OR',
        field: 'role_name',
        relationship: '=',
        condition: v
      })
    })
    this.listQuery.where = where
    this.selectList(this.listQuery)
  },
  activated() {
    this.$refs.addPage.style.display = 'none'
    this.$refs.editPage.style.display = 'none'
    this.$refs.detailPage.style.display = 'none'
    this.$refs.content.style.display = 'block'
  },
  methods: {
    // 图像上传前做限制
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg'
      const isLIMIT = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPEG/JPG/PNG 格式!')
      }
      if (!isLIMIT) {
        this.$message.error('上传图片大小不能超过10MB!')
      }
      return isJPG && isLIMIT
    },
    // 超过limit设置的值时调用
    onExceed(files, fileList) {
      this.$message.error('只能上传1张图片！！！')
    },
    /* 分类搜索 */
    searchAppType(val) {
      this.searchValChange(val, 3, 'app_type')
    },
    searchIdType(val) {
      this.searchValChange(val, 5, 'name')
    },
    searchSuperUser(val) {
      this.searchValChange(val, 2, 'updatetime')
    },
    // 搜索下拉框值改变时即搜索条件改变时触发
    searchValChange(val, allVal, field) {
      const searchData = {
        relation: 'AND',
        field: field,
        relationship: '=',
        condition: val
      }
      for (let i = 0; i < this.listQuery.where.length; i++) {
        if (this.listQuery.where[i].field === searchData.field) {
          this.listQuery.where.splice(i, 1)
          break
        }
      }
      if (val !== allVal) {
        this.listQuery.where.push(searchData)
      }
      this.selectList(this.listQuery)
    },
    // 模糊搜索
    searchList(condition) {
      if (condition === '') {
        this.listQuery.having = []
      } else {
        this.searchContent.forEach(item => {
          item.condition = '%' + condition + '%'
        })
        this.listQuery.having = this.searchContent
      }
      this.listQuery.currentPage = 1
      this.selectList(this.listQuery)
    },
    // 表单校验，判断加入数据在数据库中是否已存在
    async addValIsExist(fieldName, value) {
      const query = {
        where: [
          {
            relation: 'AND',
            field: fieldName,
            relationship: '=',
            condition: value
          }
        ]
      }
      const res = await select(query)
      return res.data.count
    },
    // 判断编辑的数据在数据库中 除了自己，是否已存在
    async editValIsExist(fieldName, value) {
      const query = {
        where: [
          {
            relation: 'AND',
            field: fieldName,
            relationship: '=',
            condition: value
          },
          {
            relation: 'AND',
            field: 'user_no',
            relationship: '!=',
            condition: this.editData.user_no
          }
        ]
      }
      const res = await select(query)
      return res.data.count
    },
    // 获得新增的数据
    async getAddData(res, selFunc) {
      const query = {
        where: [
          {
            relation: 'AND',
            field: 'id',
            relationship: '=',
            condition: res.data.results[0].insertId
          }
        ]
      }
      const selectRes = await selFunc(query)
      return await selectRes.data.results[0]
    },
    // 打开新增窗口
    addPageOpen() {
      this.addData = Object.assign({}, this.addDataDefault)
      this.$refs.content.style.display = 'none'
      this.$refs.addPage.style.display = 'block'
    },
    // 关闭新增窗口
    addPageClose() {
      this.addFileno = []
      this.$refs.addPage.style.display = 'none'
      this.$refs.content.style.display = 'block'
    },
    // 增
    insertList(data) {
      console.log(data)
      // 表单校验
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          if (!data.uuid) {
            data.uuid = 'uuid()'
          }
          if (!data.id) {
            delete data.id
          }
          const res = await insert(this.formatDataBase(data))
          if (res.data.code && res.data.code === 50014) {
            this.$message({
              type: 'error',
              message: res.data.err[0].reason.errno + ' - ' + res.data.err[0].reason.sqlMessage
            })
          } else {
            if (res.data.results[0].affectedRows === 1 && res.data.results[0].insertId > 0) {
              // 添加数据完成之后恢复菜单
              this.addData = Object.assign({}, this.addDataDefault)

              this.addPageClose()
              const tmpListQuery = Object.assign({}, this.listQuery)
              tmpListQuery['select'] = ['id']
              tmpListQuery.pageSize = 0
              tmpListQuery.currentPage = 1
              const tmpRes = await select(tmpListQuery)
              for (let i = 0; i < tmpRes.data.results.length; i++) {
                if (tmpRes.data.results[i].id === res.data.results[0].insertId) {
                  this.total = tmpRes.data.results.length
                  this.$set(this.listQuery, 'currentPage', Math.ceil((i + 1) / this.listQuery.pageSize))
                  console.log(i % this.listQuery.pageSize)
                  this.$message({
                    message: `新增成功`,
                    type: 'success'
                  })
                  break
                }
              }

              // 计算新增数据在多少页,多少行
              this.selectList(this.listQuery)
            } else if (res.data.results[0].affectedRows === 1 && res.data.results[0].insertId === 0) {
              this.$message({
                message: '数据未修改',
                type: 'warning'
              })
            } else if (res.data.results[0].affectedRows === 2 && res.data.results[0].insertId > 0) {
              this.$message({
                message: '数据修改成功',
                type: 'warning'
              })
            }
          }
        } else {
          this.addPageOpen()
        }
      })
    },
    // 打开详情窗口
    detailPageOpen() {
      this.$refs.content.style.display = 'none'
      this.$refs.detailPage.style.display = 'block'
    },
    // 关闭详情窗口
    detailPageClose() {
      this.$refs.detailPage.style.display = 'none'
      this.$refs.content.style.display = 'block'
      // 清空数据
      this.orgImgs = []
      this.detailData = {}
    },
    // 获取详情数据
    async getDetailData(data) {
      this.detailData = data
      this.detailPageOpen()
    },
    // 打开编辑窗口
    editPageOpen() {
      this.$refs.content.style.display = 'none'
      this.$refs.editPage.style.display = 'block'
    },
    // 关闭编辑窗口
    editPageClose() {
      // this.$refs.uploadEdit.clearFiles()
      // 页面关闭，清空图片展示
      this.picArr = []
      this.editFileno = []

      this.$refs.editPage.style.display = 'none'
      this.$refs.content.style.display = 'block'
    },
    cancelEdit() {
      this.editPageClose()
    },
    // 打开编辑窗口+获取编辑的数据
    async getEditData(data) {
      console.log('打开编辑器')
      this.editData = Object.assign({}, data)
      this.editPageOpen()
    },
    // 改
    updateList() {
      // 表单校验
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const tmpEditData = Object.assign({}, this.editData)
          delete tmpEditData.updatetime
          const res = await update(this.formatDataBase(tmpEditData))
          console.log(res)
          if (res.data.code && res.data.code === 50014) {
            this.$message({
              message: res.data.err[0].reason.errno + ' - ' + res.data.err[0].reason.sqlMessage,
              type: 'error'
            })
          } else {
            if (res.data.results[0].affectedRows === 2 /* && res.data.results[0].insertId > 0*/) { // 如果修改的是唯一索引，insertId=0，否则insertId>0
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.selectList(this.listQuery)
            } else if (res.data.results[0].affectedRows === 1 && res.data.results[0].insertId === 0) {
              this.$message({
                message: '数据未修改',
                type: 'warning'
              })
            }
            this.editPageClose()
          }
        } else {
          this.editPageOpen()
        }
      })
    },
    // 查
    async selectList(data) {
      this.loading = true
      const res = await select(data)
      if (res.data.code && res.data.code === 50014) {
        this.$message({
          type: 'error',
          message: res.data.err.errno + ' - ' + res.data.err.sqlMessage
        })
        this.list = []
        this.total = 0
        this.loading = false
      } else {
        this.listQuery.currentPage = data.currentPage
        this.listQuery.pageSize = data.pageSize
        this.loading = false
        this.total = 0
        if (res.data.results) {
          // 格式化数据
          this.list = this.formatList(res.data.results)
          this.total = res.data.total
        }
      }
    },
    // 分页
    pagination(query) {
      const tmpListQuery = Object.assign({}, this.listQuery)
      tmpListQuery.currentPage = query.currentPage
      tmpListQuery.pageSize = query.pageSize
      this.selectList(tmpListQuery)
    },
    // 排序
    tableSort(query) {
      this.listQuery.field = query.field
      this.listQuery.order = query.order
      this.selectList(this.listQuery)
    },
    // 删除
    deleteList(data) {
      if (data.constructor === Array && data.length === 0) {
        return
      }
      if (data.constructor === Object) {
        data = [data]
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const deleteDate = []
        data.forEach(item => {
          deleteDate.push({ uuid: item.uuid })
        })
        const delLength = deleteDate.length
        const res = await del(deleteDate)
        // 响应结束后的反馈信息
        if (res.data.results[0].affectedRows > 0) {
          this.$message({
            type: 'success',
            message: `删除成功`,
            dangerouslyUseHTMLString: true
          })
          /** 解决删除最后一页全部数据时，显示无数据的bug
          * 1.记录总页数：此时已经实现删除操作，所以total的值需要减删除的条数，Math.ceil是向上取整，保证始终大于等于1
          * 2.判断当前页是否超过总页数，如果超过则证明当前页码需要更新，跳转到最后一页
          */
          const totalPage = Math.max(1, Math.ceil((this.total - delLength) / this.listQuery.pageSize))
          this.listQuery.currentPage = this.listQuery.currentPage > totalPage ? totalPage : this.listQuery.currentPage
          console.log(this.listQuery)
          this.selectList(this.listQuery)
        } else if (res.data.results[0].affectedRows === 0) {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      }).catch(() => {
      })
    },
    // 格式化表格展示的数据
    formatList(oldList) {
      const newList = []
      oldList.forEach(item => {
        // item.createtime = item.createtime.split(',')
        // switch (item.updatetime) {
        //   case 0:
        //     item.updatetime = '否'
        //     break
        //   case 1:
        //     item.updatetime = '是'
        //     break
        //   default:
        //     break
        // }
        // switch (item.alwaysShow) {
        //   case 1:
        //     item.alwaysShow = '组织机构'
        //     break
        //   case 2:
        //     item.alwaysShow = '个人'
        //     break
        //   default:
        //     break
        // }
        // switch (item.name) {
        //   case 0:
        //     item.name = '身份证'
        //     break
        //   case 1:
        //     item.name = '营业执照'
        //     break
        //   case 2:
        //     item.name = '护照'
        //     break
        //   case 3:
        //     item.name = '军人证'
        //     break
        //   case 4:
        //     item.name = '警官证'
        //     break
        //   default:
        //     break
        // }
        newList.push(item)
      })
      return newList
    },
    // 格式化存入数据库的数据
    formatDataBase(data) {
      return data
    },
    // 关闭弹窗
    dialogClose(done) {
      this.$confirm('确认关闭窗口？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    nodeContextmenu(event, obj, node, root) {
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
