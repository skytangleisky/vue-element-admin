<template>
  <div
    id="airspace-manage"
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
          <el-form-item label="空域类型:">
            <el-select
              v-model="searchForm.spc_type"
              placeholder="请选择空域类型"
              @change="searchSpcType"
            >
              <el-option
                label="全部"
                :value="9"
              />
              <el-option
                label="微型无人机禁止飞行空域"
                :value="1"
              />
              <el-option
                label="轻型无人机管控空域"
                :value="2"
              />
              <el-option
                label="隔离空域"
                :value="3"
              />
              <el-option
                label="空域申请空域"
                :value="4"
              />
              <el-option
                label="临时关闭空域"
                :value="5"
              />
              <el-option
                label="微型无人机适飞空域"
                :value="6"
              />
              <el-option
                label="轻型无人机适飞空域"
                :value="7"
              />
              <el-option
                label="计划申请空域"
                :value="8"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="空域形状:">
            <el-select
              v-model="searchForm.shape"
              placeholder="请选择空域形状"
              @change="searchShape"
            >
              <el-option
                label="全部"
                :value="6"
              />
              <el-option
                label="网络"
                :value="0"
              />
              <el-option
                label="多边形"
                :value="1"
              />
              <el-option
                label="圆形"
                :value="2"
              />
              <el-option
                label="扇形"
                :value="3"
              />
              <el-option
                label="线缓冲区"
                :value="4"
              />
              <el-option
                label="机场障碍物限制面"
                :value="5"
              />
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <!--
      tableCol:渲染表格时每列的数据
      list:表格所需展示的数据
      @getEditData：打开编辑窗口
      @tableSort：表格排序
      @deleteList:删除
    -->
      <table-model
        :table-col="tableCol"
        :list="list"
        :current-page="listQuery.currentPage"
        :page-size="listQuery.pageSize"
        @getEditData="getEditData"
        @getDetailData="getDetailData"
        @tableSort="tableSort"
        @deleteList="deleteList"
      />

      <!--
      @pagination:currentPage 与 pageSize 值变化时更新界面数据
     -->
      <pagination
        v-show="total>0"
        :total="total"
        :current-page.sync="listQuery.currentPage"
        :page-size.sync="listQuery.pageSize"
        @pagination="pagination"
      />
    </div>

    <!-- 新增窗口 -->
    <div
      ref="addPage"
      class="add-page"
    >
      <div class="page-title">
        新增
      </div>
      <airspace-map
        class="airspace-map"
        cesium-id="cesiumIdAdd"
        @getDataFromDraw="airspaceMapFunc($event)"
      />
      <el-form
        ref="addForm"
        label-position="right"
        label-width="120px"
        :model="addData"
        :rules="dataRules"
      >

        <el-form-item
          label="战区空域代码"
          prop="spc_no_zq"
        >
          <el-input v-model="addData.spc_no_zq" />
        </el-form-item>
        <el-form-item
          label="空域名称"
          prop="name"
        >
          <el-input v-model="addData.name" />
        </el-form-item>
        <el-form-item
          label="空域类型"
          prop="spc_type"
        >
          <el-select
            v-model="addData.spc_type"
            placeholder="请选择空域类型"
          >
            <el-option
              label="微型无人机禁止飞行空域"
              :value="1"
            />
            <el-option
              label="轻型无人机管控空域"
              :value="2"
            />
            <el-option
              label="隔离空域"
              :value="3"
            />
            <el-option
              label="空域申请空域"
              :value="4"
            />
            <el-option
              label="临时关闭空域"
              :value="5"
            />
            <el-option
              label="微型无人机适飞空域"
              :value="6"
            />
            <el-option
              label="轻型无人机适飞空域"
              :value="7"
            />
            <el-option
              label="计划申请空域"
              :value="8"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="空域形状"
          prop="shape"
        >
          <el-select
            v-model="addData.shape"
            placeholder="请选择空域形状"
          >
            <el-option
              label="网络"
              :value="0"
            />
            <el-option
              label="多边形"
              :value="1"
            />
            <el-option
              label="圆形"
              :value="2"
            />
            <el-option
              label="扇形"
              :value="3"
            />
            <el-option
              label="线缓冲区"
              :value="4"
            />
            <el-option
              label="机场障碍物限制面"
              :value="5"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="空域底高"
          prop="bot"
        >
          <el-input-number
            v-model="addData.bot"
            :min="0"
            :step="1000"
          />
        </el-form-item>
        <el-form-item
          label="空域顶高"
          prop="top"
        >
          <el-input-number
            v-model="addData.top"
            :min="0"
            :step="1000"
          />
        </el-form-item>

        <el-form-item
          label="空域数据"
          prop="coor"
        >
          <el-input
            v-model="addData.coor"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          label="开始时间"
          prop="begin"
        >
          <el-date-picker
            v-model="addData.begin"
            placeholder="选择开始时间"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>

        <el-form-item
          label="结束时间"
          prop="end"
        >
          <el-date-picker
            v-model="addData.end"
            placeholder="选择结束时间"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="addData.memo"
            type="textarea"
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
      class="edit-page"
    >
      <div class="page-title">
        编辑
      </div>
      <airspace-map
        class="airspace-map"
        cesium-id="cesiumIdEdit"
        @getDataFromDraw="airspaceMapFunc($event)"
      />
      <el-form
        ref="editForm"
        label-position="right"
        label-width="120px"
        :model="editData"
        :rules="dataRules"
      >

        <el-form-item
          label="战区空域代码"
          prop="spc_no_zq"
        >
          <el-input v-model="editData.spc_no_zq" />
        </el-form-item>
        <el-form-item
          label="空域名称"
          prop="name"
        >
          <el-input v-model="editData.name" />
        </el-form-item>
        <el-form-item
          label="空域类型"
          prop="spc_type"
        >
          <el-select
            v-model="editData.spc_type"
            placeholder="请选择空域类型"
          >
            <el-option
              label="微型无人机禁止飞行空域"
              :value="1"
            />
            <el-option
              label="轻型无人机管控空域"
              :value="2"
            />
            <el-option
              label="隔离空域"
              :value="3"
            />
            <el-option
              label="空域申请空域"
              :value="4"
            />
            <el-option
              label="临时关闭空域"
              :value="5"
            />
            <el-option
              label="微型无人机适飞空域"
              :value="6"
            />
            <el-option
              label="轻型无人机适飞空域"
              :value="7"
            />
            <el-option
              label="计划申请空域"
              :value="8"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="空域形状"
          prop="shape"
        >
          <el-select
            v-model="editData.shape"
            placeholder="请选择空域形状"
          >
            <el-option
              label="网络"
              :value="0"
            />
            <el-option
              label="多边形"
              :value="1"
            />
            <el-option
              label="圆形"
              :value="2"
            />
            <el-option
              label="扇形"
              :value="3"
            />
            <el-option
              label="线缓冲区"
              :value="4"
            />
            <el-option
              label="机场障碍物限制面"
              :value="5"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="空域底高"
          prop="bot"
        >
          <el-input-number
            v-model="editData.bot"
            :min="0"
            :step="1000"
          />
        </el-form-item>
        <el-form-item
          label="空域顶高"
          prop="top"
        >
          <el-input-number
            v-model="editData.top"
            :min="0"
            :step="1000"
          />
        </el-form-item>

        <el-form-item
          label="空域数据"
          prop="coor"
        >
          <el-input
            v-model="editData.coor"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          label="开始时间"
          prop="begin"
        >
          <el-date-picker
            v-model="editData.begin"
            placeholder="选择开始时间"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>

        <el-form-item
          label="结束时间"
          prop="end"
        >
          <el-date-picker
            v-model="editData.end"
            placeholder="选择结束时间"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="editData.memo"
            type="textarea"
          />
        </el-form-item>

      </el-form>
      <div class="button">
        <el-button @click="editPageClose()">取消</el-button>
        <el-button
          type="primary"
          @click="updateList(editData)"
        >确认</el-button>
      </div>
    </div>
    <!-- 详情窗口 -->
    <div
      ref="detailPage"
      class="detail-page"
    >
      <div class="page-title">
        详情
      </div>

      <airspace-map
        class="airspace-map"
        cesium-id="cesiumIdDetail"
        @getDataFromDraw="airspaceMapFunc($event)"
      />

      <el-descriptions :column="1">

        <el-descriptions-item label="战区空域代码">{{ detailData.spc_no_zq }}</el-descriptions-item>
        <el-descriptions-item label="空域名称">{{ detailData.name }}</el-descriptions-item>
        <el-descriptions-item label="空域类型">{{ detailData.spc_type }}</el-descriptions-item>
        <el-descriptions-item label="空域形状">{{ detailData.shape }}</el-descriptions-item>
        <el-descriptions-item label="空域底高">{{ detailData.bot }}</el-descriptions-item>
        <el-descriptions-item label="空域顶高">{{ detailData.top }}</el-descriptions-item>
        <el-descriptions-item label="空域数据">{{ detailData.coor }}</el-descriptions-item>
        <el-descriptions-item label="开始时间">{{ detailData.begin }}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{ detailData.end }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ detailData.memo }}</el-descriptions-item>
      </el-descriptions>

      <div class="button">
        <el-button @click="detailPageClose()">关闭</el-button>
      </div>
    </div>

  </div>

</template>

<script>
// import vueRemoteImport from '../utils/vue-remote-import.js'
// eslint-disable-next-line
import { insert, del, deleteAirspace, updateAirspace, select } from '/src/api/table/t_airspace.js'
// 过滤表单模块
import filterForm from './components/filterForm.vue'
// 表格组件
import tableModel from './components/tableModel.vue'
// 分页组件
import Pagination from './components/pagination.vue'

export default {
  // name: 'AirspaceManage',
  components: {
    filterForm,
    tableModel,
    Pagination,
    airspaceMap: null
  },
  data() {
    return {
      detailData: [],
      // 表格每列展示的数据
      tableCol: [
        {
          prop: 'spc_no_zq',
          label: '战区空域代码',
          width: 120,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: 'name',
          label: '空域名称',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'spc_type',
          label: '空域类型',
          width: 200,
          showOverflowTooltip: false,
          sortable: 'custom'
        },
        {
          prop: 'shape',
          label: '空域形状',
          width: 200,
          showOverflowTooltip: false,
          sortable: 'custom'
        },
        {
          prop: 'coor',
          label: '空域数据',
          width: 240,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'bot',
          label: '空域底高',
          width: 100,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: 'top',
          label: '空域顶高',
          width: 100,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: 'begin',
          label: '开始时间',
          width: 200,
          showOverflowTooltip: false,
          sortable: 'custom'
        },
        {
          prop: 'end',
          label: '结束时间',
          width: 200,
          showOverflowTooltip: false,
          sortable: 'custom'
        },
        {
          prop: 'memo',
          label: '备注',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        }
        /*   {
            prop: "is_active",
            label: "是否有效",
            width: 100,
            showOverflowTooltip: true,
            sortable: false
          }, */

      ],
      // 控制新增弹窗的显示
      addDialogVisible: false,

      // 新增数据
      addData: {
        spc_no_zq: null,
        name: null,
        spc_type: null,
        shape: null,
        coor: null,
        bot: null,
        top: null,
        memo: null,
        is_active: 1,
        begin: null,
        end: null,
        creator: '3bda3efcf3b411ec8a204ccc6a393ecd'
      },
      /* 数据的规则
      trigger: blur 失去焦点时进行验证;change 当值发生变化时进行验证
      */
      dataRules: {
        spc_no_zq: [
          { required: true, message: '请输入战区空域代码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入空域名称', trigger: 'blur' }
        ],
        spc_type: [
          { required: true, message: '请选择空域类型', trigger: 'change' }
        ],
        shape: [
          { required: true, message: '请选择空域形状', trigger: 'change' }
        ],
        coor: [
          { required: true, message: '请输入空域数据', trigger: 'blur' }
        ],
        bot: [
          { required: true, message: '请输入空域底高', trigger: 'blur' }
        ],
        top: [
          { required: true, message: '请输入空域顶高', trigger: 'blur' }
        ],
        begin: [
          { required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        end: [
          { required: true, message: '请选择截至日期', trigger: 'change' }
        ]

      },
      // 控制编辑弹窗的显示
      editDialogVisible: false,
      // 编辑数据
      editData: {},
      // 表格中展示的数据
      list: [],
      // 所有数据
      allList: [],
      // 查询条件
      listQuery: {
        currentPage: 1,
        pageSize: 5,
        field: '',
        order: '',
        where: [
          {
            relation: 'AND',
            field: 'is_active',
            relationship: '=',
            condition: 1
          }
        ],
        having: []
      },
      // 搜索内容
      searchContent: [
        {
          relation: 'OR',
          field: 'spc_no_zq',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'name',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'coor',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'bot',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'top',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'creator',
          relationship: 'LIKE',
          condition: ''
        }
      ],
      // 统计数据总条数
      total: 0,
      searchForm: {
        spc_type: 9,
        shape: 6
      },
      activeName: 'first'
    }
  },
  watch: {

  },
  mounted() {
    this.selectList(this.listQuery)
  },
  activated() {
    this.$refs.addPage.style.display = 'none'
    this.$refs.editPage.style.display = 'none'
    this.$refs.detailPage.style.display = 'none'
    this.$refs.content.style.display = 'block'
  },
  methods: {
    searchSpcType(val) {
      this.searchValChange(val, 9, 'spc_type')
    },
    searchShape(val) {
      this.searchValChange(val, 6, 'shape')
    },

    // 搜索下拉框值改变时即搜索条件改变时触发
    searchValChange(val, allVal, field) {
      const searchData = {
        relation: 'AND',
        field: field,
        relationship: '=',
        condition: val
      }
      if (this.listQuery.where.length === 1) {
        if (val === allVal) {
          this.selectList(this.listQuery)
        } else {
          this.listQuery.where.push(searchData)
          this.selectList(this.listQuery)
        }
      } else {
        if (val === allVal) {
          let flag = true
          this.listQuery.where.forEach((item, index) => {
            if (item.field === field) {
              this.listQuery.where.splice(index, 1)
              this.selectList(this.listQuery)
              flag = true
            } else {
              flag = false
            }
          })
          if (!flag) {
            this.selectList(this.listQuery)
          }
        } else {
          let flag = true
          this.listQuery.where.forEach(item => {
            if (item.field === field) {
              item.condition = val
              flag = true
            } else {
              flag = false
            }
          })
          if (!flag) {
            this.listQuery.where.push(searchData)
          }
          this.selectList(this.listQuery)
        }
      }
    },
    // 打开新增窗口
    addPageOpen() {
      this.$refs.content.style.display = 'none'
      this.$refs.addPage.style.display = 'block'
    },
    // 关闭新增窗口
    addPageClose() {
      this.$refs.addPage.style.display = 'none'
      this.$refs.content.style.display = 'block'
    },

    // 空域申请地图
    airspaceMapFunc(info) {
      console.log('map:', info)
    },

    // 增
    insertList(data) {
      // 表单校验
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          console.log('this.addData', data)
          const res = await insert(data)
          console.log(res)
          if (this.resResult(res, '数据')) {
            this.addData = {}
            this.addPageClose()
            this.selectList(this.listQuery)
          } else {
            this.addPageOpen()
          }

          // }
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
      this.$refs.editPage.style.display = 'none'
      this.$refs.content.style.display = 'block'
    },
    // 打开编辑窗口+获取编辑的数据
    getEditData(data) {
      // 浅拷贝
      // this.editData = Object.assign({}, this.list.filter(item => item.id === id)[0])
      this.editData = data

      // console.log('getEditData赋值的editdata', this.editData)
      this.$nextTick(() => {
        this.editPageOpen()
      })
    },

    // 改
    updateList() {
      // 表单校验
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          console.log('this.editData', this.editData)

          const res = await updateAirspace(this.formatDataBase(this.editData))
          if (this.resResult(res, '数据')) {
            this.selectList(this.listQuery)
          }
          this.editPageClose()
        } else {
          this.editPageOpen()
        }
      })
    },

    // 查
    async selectList(data) {
      const res = await select(data)
      if (res.data.results) {
        // 格式化数据
        this.list = this.formatList(res.data.results)
      }
      this.total = res.data.total
      // console.log('selectList', this.list)
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
    // 分页
    pagination(query) {
      this.listQuery.currentPage = query.currentPage
      this.listQuery.pageSize = query.pageSize
      this.selectList(this.listQuery)
    },
    // 排序
    tableSort(query) {
      this.listQuery.field = query.field
      this.listQuery.order = query.order
      this.selectList(this.listQuery)
    },
    // 删除
    deleteList(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        /*  const newData = []
         if (data instanceof Array) {
           data.forEach(item => {
             newData.push({ "id": item.id })
           })
         } else {
           newData.push({ "id": data.id })
         }
         const delLength = newData.length
         const res = await del(newData)
         console.log(res)
  */

        // 逻辑删除数据
        const deleteDate = []
        if (data instanceof Array) {
          data.forEach(item => {
            item.is_active = 0
            delete item.modified_date
            deleteDate.push(this.formatDataBase(item))
          })
        } else {
          data.is_active = 0
          delete data.modified_date
          deleteDate.push(this.formatDataBase(data))
        }
        const delLength = deleteDate.length
        // console.log("deleteDate", deleteDate)
        const res = await deleteAirspace(deleteDate)

        // 响应结束后的反馈信息
        if (this.delResResult(res, '数据')) {
          /** 解决删除最后一页全部数据时，显示无数据的bug
          * 1.记录总页数：此时已经实现删除操作，所以total的值需要减删除的条数，Math.ceil是向上取整，保证始终大于等于1
          * 2.判断当前页是否超过总页数，如果超过则证明当前页码需要更新，跳转到最后一页
          */
          const totalPage = Math.ceil((this.total - delLength) / this.listQuery.pageSize)
          this.listQuery.currentPage = this.listQuery.currentPage > totalPage ? totalPage : this.listQuery.currentPage
          this.selectList(this.listQuery)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 格式化表格展示的数据
    formatList(oldList) {
      const newList = []
      oldList.forEach(item => {
        switch (item.spc_type) {
          case 1:
            item.spc_type = '微型无人机禁止飞行空域'
            break
          case 2:
            item.spc_type = '轻型无人机管控空域'
            break
          case 3:
            item.spc_type = '隔离空域'
            break
          case 4:
            item.spc_type = '空域申请空域'
            break
          case 5:
            item.spc_type = '临时关闭空域'
            break
          case 6:
            item.spc_type = '微型无人机适飞空域'
            break
          case 7:
            item.spc_type = '轻型无人机适飞空域'
            break
          case 8:
            item.spc_type = '计划申请空域'
            break
          default:
            break
        }
        switch (item.shape) {
          case 0:
            item.shape = '网络'
            break
          case 1:
            item.shape = '多边形'
            break
          case 2:
            item.shape = '圆形'
            break
          case 3:
            item.shape = '扇形'
            break
          case 4:
            item.shape = '线缓冲区'
            break
          case 5:
            item.shape = '机场障碍物限制面'
            break
          default:
            break
        }

        item.bot = item.bot / 1000
        item.top = item.top / 1000
        item.created_date = item.created_date.slice(0, 19)
        item.modified_date = item.modified_date.slice(0, 19)
        newList.push(item)
      })
      return newList
    },
    // 格式化存入数据库的数据
    formatDataBase(data) {
      switch (data.spc_type) {
        case '微型无人机禁止飞行空域':
          data.spc_type = 1
          break
        case '轻型无人机管控空域':
          data.spc_type = 2
          break
        case '隔离空域':
          data.spc_type = 3
          break
        case '空域申请空域':
          data.spc_type = 4
          break
        case '临时关闭空域':
          data.spc_type = 5
          break
        case '微型无人机适飞空域':
          data.spc_type = 6
          break
        case '轻型无人机适飞空域':
          data.spc_type = 7
          break
        case '计划申请空域':
          data.spc_type = 8
          break
        default:
          break
      }
      switch (data.shape) {
        case '网络':
          data.shape = 0
          break
        case '多边形':
          data.shape = 1
          break
        case '圆形':
          data.shape = 2
          break
        case '扇形':
          data.shape = 3
          break
        case '线缓冲区':
          data.shape = 4
          break
        case '机场障碍物限制面':
          data.shape = 5
          break
        default:
          break
      }

      // oldList.created_date = oldList.created_date.slice(0, 19)
      // oldList.modified_date = oldList.modified_date.slice(0, 19)
      data.bot = data.bot * 1000
      data.top = data.top * 1000
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
    /** 响应结束后的反馈信息
 *
 *
 **/
    resResult(res, handle) {
      if (!res.data.results) {
        this.$message({
          message: '数据格式错误',
          type: 'error'
        })
        return false
      } else {
        if (res.data.results[0].affectedRows === 1 && res.data.results[0].insertId > 0) {
          this.$message({
            message: '新增' + handle + '成功',
            type: 'success'
          })
          return true
        } else if (res.data.results[0].affectedRows > 1 && res.data.results[0].insertId > 0) {
          this.$message({
            message: '编辑' + handle + '成功',
            type: 'success'
          })
          return true
        } else if (res.data.results[0].affectedRows === 1 && res.data.results[0].insertId === 0) {
          /* this.$message({
            message: handle + '未修改',
            type: 'success'
          }) */
          return true
        } else {
          this.$message({
            message: handle + '操作失败',
            type: 'error'
          })
          return false
        }
      }
    },
    delResResult(res, handle) {
      if (!res.data.results) {
        this.$message({
          message: '数据格式错误',
          type: 'error'
        })
        return false
      } else {
        if (res.data.results[0].affectedRows === 1 && res.data.results[0].insertId > 0) {
          this.$message({
            message: '删除' + handle + '失败',
            type: 'success'
          })
          return true
        } else if (res.data.results[0].affectedRows > 1 && res.data.results[0].insertId > 0) {
          this.$message({
            message: '删除' + handle + '成功',
            type: 'success'
          })
          return true
        } else {
          this.$message({
            message: handle + '操作失败',
            type: 'error'
          })
          return false
        }
      }
    }

  }
}
</script>

<style lang='less'>
@border-color: #e4e7ed;
@background-color: #f5f7fa;
@primary-color: #409eff;
@text-color: #606266;
.fr {
  float: right;
}
body {
  background-color: @background-color;
  overflow: auto;
}
#airspace-manage {
  height: 100%;
  background: @background-color;
  overflow: auto;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  .content,
  #filter-form {
    border-radius: 8px;
  }
  #filter-form,
  #pagination,
  .search,
  #table-model {
    padding: 16px;
    background-color: #fff;
  }
  #filter-form {
    margin-bottom: 16px;
  }
  .search,
  #table-model {
    padding-bottom: 0;
  }
  .search {
    .el-form {
      .el-form-item {
        margin-bottom: 0px;
        .el-form-item__label {
          padding: 0px;
          line-height: 28px;
        }
      }
    }
  }
  .add-page,
  .edit-page,
  .detail-page {
    display: none;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    .title,
    .el-descriptions__title,
    .page-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
      color: @text-color;
    }
    .button {
      display: flex;
      justify-content: flex-end; //弹性盒子元素将向结束位置对齐
      align-items: center; //侧轴居中
    }
    .page-title {
      font-size: 24px;
      font-weight: 400;
    }
    .title,
    .el-descriptions__title {
      border-left: 4px solid @primary-color;
      padding-left: 8px;
    }
    // description样式
    .el-descriptions-item__label {
      display: block;
      width: 100px;
      text-align: right;
    }
    .el-descriptions-item__content {
      font-weight: 600;
    }
    .airspace-map {
      width: 100%;
      height: 500px;
      border: 1px solid @border-color;
      margin-bottom: 16px;
    }
  }
}
</style>
