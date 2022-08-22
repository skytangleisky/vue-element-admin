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
              v-model="searchForm.modified_date"
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
        新增窗口
      </div>
      <el-form
        ref="addForm"
        label-position="right"
        label-width="140px"
        :model="addData"
        :rules="addDataRules"
      >
        <div class="title">
          基本信息
        </div>

        <el-form-item
          label="uuid"
          prop="uuid"
        >
          <el-input v-model="addData.uuid" />
        </el-form-item>
        <el-form-item
          label="path"
          prop="path"
        >
          <el-input v-model="addData.path" />
        </el-form-item>
        <el-form-item
          label="component"
          prop="component"
        >
          <el-input v-model="addData.component" />
        </el-form-item>
        <el-form-item
          label="redirect"
          prop="redirect"
        >
          <el-input v-model="addData.redirect" />
        </el-form-item>
        <el-form-item
          label="hidden"
          prop="hidden"
        >
          <el-input v-model="addData.hidden" />
        </el-form-item>
        <el-form-item
          label="name"
          prop="name"
        >
          <el-select
            v-model="addData.name"
            placeholder="请选择证件类型"
          >
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
        <el-form-item
          label="meta"
          prop="meta"
        >
          <el-input v-model="addData.meta" />
        </el-form-item>

        <el-form-item
          label="alwaysShow"
          prop="alwaysShow"
        >
          <el-select
            v-model="addData.alwaysShow"
            placeholder="请选择用户类型"
            disabled
          >
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
        <el-form-item
          label="remoteEntry"
          prop="remoteEntry"
        >
          <el-input v-model="addData.remoteEntry" />
        </el-form-item>
        <el-form-item
          label="remoteComponent"
          prop="remoteComponent"
        >
          <el-input v-model="addData.remoteComponent" />
        </el-form-item>
        <el-form-item label="营业执照">
          <!--
              on-preview: 点击文件列表中已上传的文件时的钩子
              on-remove: 文件列表移除文件时的钩子
              before-upload: 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
              limit: 最大允许上传个数
              multiple: 是否支持多选文件
              show-file-list: 是否显示已上传文件列表
             -->

          <el-upload
            ref="uploadAdd"
            class="avatar-uploader"
            action="/tanglei/controller/test.php"
            list-type="picture-card"
            :data="fileCatalog"
            :before-upload="beforeUpload"
            :on-exceed="onExceed"
            :on-preview="addImagePreview"
            :on-remove="addImageRemove"
            :on-success="addImageSuccess"
            :on-error="onError"
            :limit="1"
            :auto-upload="true"
            :multiple="true"
            :show-file-list="true"
          >
            <i class="el-icon-plus" />
            <el-dialog :visible.sync="uploadImageVisible">
              <img
                width="100%"
                :src="uploadImageUrl"
                alt=""
              >
            </el-dialog>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过10M</div>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="created_date"
          prop="created_date"
        >
          <el-cascader
            v-model="addData.created_date"
            :options="created_dateData"
            filterable
          />
        </el-form-item>
        <el-form-item
          label="address"
          prop="address"
        >
          <el-input v-model="addData.address" />
        </el-form-item>
        <el-form-item label="modified_date">
          <el-switch v-model="addData.modified_date" />
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
        编辑窗口
      </div>
      <el-form
        ref="editForm"
        label-position="right"
        label-width="140px"
        :model="editData"
        :rules="editDataRules"
      >
        <div class="title">
          基本信息
        </div>

        <el-form-item
          label="账号"
          prop="uuid"
        >
          <el-input v-model="editData.uuid" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="path"
        >
          <el-input v-model="editData.path" />
        </el-form-item>
        <el-form-item
          label="真实姓名"
          prop="component"
        >
          <el-input v-model="editData.component" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="redirect"
        >
          <el-input v-model="editData.redirect" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="hidden"
        >
          <el-input v-model="editData.hidden" />
        </el-form-item>
        <el-form-item
          label="证件类型"
          prop="name"
        >
          <el-select
            v-model="editData.name"
            placeholder="请选择证件类型"
          >
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
        <el-form-item
          label="证件号码"
          prop="meta"
        >
          <el-input v-model="editData.meta" />
        </el-form-item>

        <el-form-item
          label="用户类型"
          prop="alwaysShow"
        >
          <el-select
            v-model="editData.alwaysShow"
            placeholder="请选择用户类型"
            disabled
          >
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
        <el-form-item
          label="公司名称"
          prop="remoteEntry"
        >
          <el-input v-model="editData.remoteEntry" />
        </el-form-item>
        <el-form-item
          label="统一社会信用代码"
          prop="remoteComponent"
        >
          <el-input v-model="editData.remoteComponent" />
        </el-form-item>
        <el-form-item label="营业执照">
          <!--
              on-preview: 点击文件列表中已上传的文件时的钩子
              on-remove: 文件列表移除文件时的钩子
              before-upload: 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
              limit: 最大允许上传个数
              on-exceed: 文件超出个数限制时的钩子
              multiple: 是否支持多选文件
              show-file-list: 是否显示已上传文件列表
              file-list: 上传的文件列表
             -->

          <!--

              -->

          <el-upload
            ref="uploadEdit"
            action="/tanglei/controller/test.php"
            list-type="picture-card"
            :data="fileCatalog"
            :before-upload="beforeUpload"
            :limit="1"
            :on-exceed="onExceed"
            :on-error="onError"
            :auto-upload="true"
            :multiple="true"
            :show-file-list="true"
            :file-list="picArr"
            :on-remove="editImageRemove"
            :on-preview="editImagePreview"
            :on-success="editImageSuccess"
          >
            <i class="el-icon-plus" />
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过10M</div>
          </el-upload>
          <el-dialog :visible.sync="editUploadImageVisible">
            <img
              width="100%"
              :src="editImageUrl"
              alt=""
            >
          </el-dialog>

        </el-form-item>
        <el-form-item
          label="所在城市"
          prop="created_date"
        >
          <el-cascader
            v-model="editData.created_date"
            :options="created_dateData"
            filterable
          />
        </el-form-item>
        <el-form-item
          label="具体地址"
          prop="address"
        >
          <el-input v-model="editData.address" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="editData.modified_date" />
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
      class="detail-page"
    >
      <div class="page-title">
        详情
      </div>
      <el-descriptions :column="1">
        <el-descriptions-item label="账号">{{ detailData.uuid }}</el-descriptions-item>
        <el-descriptions-item label="密码">{{ detailData.path }}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{ detailData.component }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ detailData.redirect }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ detailData.hidden }}</el-descriptions-item>
        <el-descriptions-item label="证件类型">{{ detailData.name }}</el-descriptions-item>
        <el-descriptions-item label="证件号码">{{ detailData.meta }}</el-descriptions-item>
        <el-descriptions-item label="用户类型">{{ detailData.alwaysShow }}</el-descriptions-item>
        <el-descriptions-item label="公司名称">{{ detailData.remoteEntry }}</el-descriptions-item>
        <el-descriptions-item label="统一社会信用代码">{{ detailData.remoteComponent }}</el-descriptions-item>
        <el-descriptions-item label="营业执照">
          <div
            v-for="(item,index) in orgImgs"
            :key="index"
            class="orgImgs"
          >
            <el-image
              :src="item"
              :preview-src-list="orgImgs"
              fit="cover"
            />
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="城市">{{ detailData.created_date }}</el-descriptions-item>
        <el-descriptions-item label="具体地址">{{ detailData.address }}</el-descriptions-item>
        <el-descriptions-item label="是否启用">
          <el-switch
            v-model="detailData.modified_date"
            disabled
          />
        </el-descriptions-item>

      </el-descriptions>

      <div class="button">
        <el-button @click="detailPageClose()">关闭</el-button>
      </div>
    </div>
  </div>

</template>

<script>
// import { provinceAndCityData, CodeToText } from '../../node_modules/element-china-area-data/src/app.js'
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'
// eslint-disable-next-line
import { insertMenu, del, deleteMenu, updateMenu, selectMenu } from '/src/api/table/menu'
import { insertFile, delFile, updateFile, selectFile } from '/src/api/table/t_file'
// 过滤表单模块
import filterForm from './components/filterForm.vue'
// 表格组件
import tableModel from './components/tableModel.vue'
// 分页组件
import Pagination from './components/pagination.vue'

export default {
  // name: "User",
  components: {
    filterForm, tableModel, Pagination
  },
  data() {
    var usernameValidator = async(rule, value, callback) => {
      const existCount = await this.addValIsExist(rule.field, value)
      if (existCount > 0) {
        return callback(new Error('该用户已存在'))
      }
    }
    var redirectValidator = async(rule, value, callback) => {
      const existCount = await this.addValIsExist(rule.field, value)
      if (existCount > 0) {
        callback(new Error('该手机号已存在'))
      }
    }
    var hiddenValidator = async(rule, value, callback) => {
      const existCount = await this.addValIsExist(rule.field, value)
      if (existCount > 0) {
        callback(new Error('该邮箱已存在'))
      }
    }
    var editUsernameValidator = async(rule, value, callback) => {
      const existCount = await this.editValIsExist(rule.field, value)
      if (existCount > 0) {
        callback(new Error('该用户已存在'))
      }
    }
    var editPhoneValidator = async(rule, value, callback) => {
      const existCount = await this.editValIsExist(rule.field, value)
      if (existCount > 0) {
        callback(new Error('该手机号已存在'))
      }
    }
    var editEmailValidator = async(rule, value, callback) => {
      const existCount = await this.editValIsExist(rule.field, value)
      if (existCount > 0) {
        callback(new Error('该邮箱已存在'))
      }
    }
    return {
      detailData: [],
      orgImgs: [],
      /* 数据的规则
     trigger: blur 失去焦点时进行验证;change 当值发生变化时进行验证
     */
      addDataRules: {
        uuid: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            pattern: /[A-Za-z0-9_\-\u4e00-\u9fa5]$/,
            message: '账号由字母/数字/“-”/“_”组成',
            trigger: 'blur'
          },
          { validator: usernameValidator, trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        hidden: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '格式不正确',
            trigger: 'blur'
          },
          {
            validator: hiddenValidator, trigger: 'blur'
          }
        ],
        redirect: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          },
          { validator: redirectValidator, trigger: 'blur' }
        ],
        remoteComponent: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          {
            pattern: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        meta: [
          // 身份证： /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
          { required: true, message: '请输入证件号', trigger: 'blur' }
        ],
        alwaysShow: [
          { required: false, message: '请选择用户类型', trigger: 'change' }
        ],
        remoteEntry: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        created_date: [
          { required: true, message: '请选择所在城市', trigger: 'change' }
        ],

        address: [
          { required: true, message: '请输入具体地址', trigger: 'blur' }

        ],
        first_name: [
          { required: true, message: '请输入first_name', trigger: 'blur' }
        ],

        last_name: [
          { required: true, message: '请输入last_name', trigger: 'blur' }

        ]

      },
      editDataRules: {
        uuid: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            pattern: /[A-Za-z0-9_\-\u4e00-\u9fa5]$/,
            message: '账号由字母/数字/“-”/“_”组成',
            trigger: 'blur'
          },
          { validator: editUsernameValidator, trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        hidden: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '格式不正确',
            trigger: 'blur'
          },
          {
            validator: editEmailValidator, trigger: 'blur'
          }
        ],
        redirect: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          },
          { validator: editPhoneValidator, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        meta: [
          // 身份证： /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
          { required: true, message: '请输入证件号', trigger: 'blur' }
        ],
        alwaysShow: [
          { required: false, message: '请选择用户类型', trigger: 'change' }
        ],
        remoteEntry: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],

        remoteComponent: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          {
            pattern: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
            message: '格式不正确',
            trigger: 'blur'
          }

        ],
        created_date: [
          { required: true, message: '请输入所在城市', trigger: 'blur' }
        ],

        address: [
          { required: true, message: '请输入具体地址', trigger: 'blur' }

        ],
        first_name: [
          { required: true, message: '请输入first_name', trigger: 'blur' }
        ],

        last_name: [
          { required: true, message: '请输入last_name', trigger: 'blur' }

        ]

      },
      // 是否显示上传证件照的弹窗
      uploadDialogVisible: false,

      // 表格每列展示的数据
      tableCol: [
        {
          prop: 'uuid',
          label: 'uuid',
          width: 200,
          showOverflowTooltip: true,
          sortable: 'custom'
        },
        {
          prop: 'path',
          label: 'path',
          width: 120,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'component',
          label: 'component',
          width: 80,
          showOverflowTooltip: false,
          sortable: false
        },

        {
          prop: 'hidden',
          label: 'hidden',
          width: 200,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: 'redirect',
          label: 'redirect',
          width: 120,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: 'name',
          label: 'name',
          width: 120,
          showOverflowTooltip: false,
          sortable: 'custom'
        },
        {
          prop: 'meta',
          label: 'meta',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'alwaysShow',
          label: 'alwaysShow',
          width: 100,
          showOverflowTooltip: false,
          sortable: 'custom'
        },

        {
          prop: 'remoteEntry',
          label: 'remoteEntry',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'remoteComponent',
          label: 'remoteComponent',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'created_date',
          label: 'created_date',
          width: 200,
          showOverflowTooltip: false,
          sortable: 'custom'
        },
        {
          prop: 'modified_date',
          label: 'modified_date',
          width: 200,
          showOverflowTooltip: false,
          sortable: 'custom'
        }
      ],
      idImages: [],
      // 新增数据
      addData: {
        uuid: null,
        path: null,
        component: null,
        redirect: null,
        hidden: null,
        name: null,
        meta: null,
        alwaysShow: 1,
        remoteEntry: null,
        remoteComponent: null,
        created_date: null,
        address: null,
        modified_date: false
      },

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
          // {
          //   relation: "AND",
          //   field: "modified_date",
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
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'hidden',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'redirect',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'meta',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'component',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'first_name',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'last_name',
          relationship: 'LIKE',
          condition: ''
        },

        {
          relation: 'OR',
          field: 'remoteEntry',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'remoteComponent',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'created_date',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'address',
          relationship: 'LIKE',
          condition: ''
        }
      ],
      // 分类搜索表单
      searchForm: {
        alwaysShow: 3,
        name: 5,
        modified_date: 2,
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
      created_dateData: provinceAndCityData,
      // 点击编辑获取的已上传的图片
      picArr: [],
      // 所在城市代码
      created_dateCode: []
    }
  },
  watch: {

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
    this.selectList(this.listQuery)
  },
  activated() {
    this.$refs.addPage.style.display = 'none'
    this.$refs.editPage.style.display = 'none'
    this.$refs.detailPage.style.display = 'none'
    this.$refs.content.style.display = 'block'
  },
  methods: {
    // 根据creator_id搜索t_file表
    async getFileByCreatorId(user_no) {
      const query = {
        where: [
          {
            'relation': 'AND',
            'field': 'creator_id',
            'relationship': '=',
            'condition': user_no
          }
        ]
      }
      const res = await selectFile(query)
      if (res.data.results) {
        return res.data.results
      }
    },

    // 图片成功的操作
    async addImageSuccess(res, file, fileList) {
      // console.log("Success res", res, "file", file, "fileList", fileList)
      const addFile = {}
      addFile.name = res.name
      addFile.ext = res.ext
      addFile.size = res.size
      addFile.path = res.path
      const res01 = await insertFile(addFile)
      if (this.resResult(res01, '文件')) {
        const newData = await this.getAddData(res01, selectFile)
        file.file_no = newData.file_no
        this.addFileno.push(file.file_no)
      }
    },
    // 点击上传证件文件列表中已上传的文件时,放大点击的图片
    addImagePreview(file) {
      this.uploadImageUrl = file.url
      this.uploadImageVisible = true
    },
    addImageRemove(file, fileList) {
      this.addFileno = this.removeFileno(file, this.addFileno)
    },
    removeFileno(file, data) {
      delFile([{ file_no: file.file_no }])
      const newData = data.filter(item => {
        return item !== file.file_no
      })
      return newData
    },
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
    onError(err, file, fileList) {
      console.error(err)
      this.$message.error('图片上传失败！！！')
    },
    // 编辑资料时图片的移除
    editImageRemove(file, fileList) {
      this.editFileno = this.removeFileno(file, this.editFileno)
    },
    async editImageSuccess(res, file, fileList) {
      // console.log("Success res", res, "file", file, "fileList", fileList)
      const addFile = {}
      addFile.name = res.name
      addFile.ext = res.ext
      addFile.size = res.size
      addFile.path = res.path
      const res01 = await insertFile(addFile)
      if (this.resResult(res01, '文件')) {
        const newData = await this.getAddData(res01, selectFile)
        file.file_no = newData.file_no
        this.editFileno.push(file.file_no)
      }
    },
    editImagePreview(file) {
      this.editImageUrl = file.url
      this.editUploadImageVisible = true
    },
    /* 分类搜索 */
    searchAppType(val) {
      this.searchValChange(val, 3, 'app_type')
    },
    searchIdType(val) {
      this.searchValChange(val, 5, 'name')
    },
    searchSuperUser(val) {
      this.searchValChange(val, 2, 'modified_date')
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
      const res = await selectMenu(query)
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
      const res = await selectMenu(query)
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
      this.$refs.content.style.display = 'none'
      this.$refs.addPage.style.display = 'block'
    },
    // 关闭新增窗口
    addPageClose() {
      // 关闭页面时清空上传成功文件的展示
      this.$refs.uploadAdd.clearFiles()
      this.addFileno = []
      this.$refs.addPage.style.display = 'none'
      this.$refs.content.style.display = 'block'
    },
    // 当用户表新增与修改时，更新file表
    updateFileDataBase(creator_id, filenoList) {
      let editFileData = {}
      // 遍历刚上传图片的uuid值
      filenoList.forEach(async item => {
        const listQuery = {
          where: [
            {
              relation: 'AND',
              field: 'file_no',
              relationship: '=',
              condition: item
            }
          ]
        }

        // 查询t_file表
        const res = await selectFile(listQuery)
        // 将查询到的file数据对象放到编辑数据editFileData中
        editFileData = res.data.results[0]
        // 删除更新时间
        delete editFileData.modified_date
        // 在编辑数据中添加creator_id
        editFileData.creator_id = creator_id
        // 更新文件表
        updateFile(editFileData)
      })
    },
    // 增
    insertList(data) {
      // 表单校验
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          if (data.modified_date) {
            data.modified_date = '是'
          } else {
            data.modified_date = '否'
          }
          const res = await insertMenu(this.formatDataBase(data))
          if (this.resResult(res, '数据')) {
            /* 将用户uuid添加进文件表中*/
            const newData = await this.getAddData(res, selectMenu)
            const creator_id = newData.user_no
            this.updateFileDataBase(creator_id, this.addFileno)

            // 添加数据完成之后清空表单
            this.addData = {}

            this.addPageClose()
            this.selectList(this.listQuery)
          } else {
            this.addPageOpen()
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
      // 还原数据格式
      this.detailData.created_date = this.detailData.created_date.split(' ')
      // 转变modified_date的值
      switch (this.detailData.modified_date) {
        case true:
          this.detailData.modified_date = '是'
          break
        case false:
          this.detailData.modified_date = '否'
          break
        default:
          break
      }
      // 清空数据
      this.orgImgs = []
      this.detailData = {}
    },
    // 获取详情数据
    async getDetailData(data) {
      this.detailData = data
      // 转变modified_date的值
      switch (this.detailData.modified_date) {
        case '是':
          this.detailData.modified_date = true
          break
        case '否':
          this.detailData.modified_date = false
          break
        default:
          break
      }
      this.detailData.created_date = this.detailData.created_date.join(' ')
      // console.log(this.detailData)
      const files = await this.getFileByCreatorId(data.user_no)
      files.forEach(item => {
        this.orgImgs.push('/tanglei/' + item.path + '/' + item.name)
      })
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
      // 点击取消时，将“所在城市”的数据还原为表格显示格式
      // 转变modified_date的值
      switch (this.editData.modified_date) {
        case true:
          this.editData.modified_date = '是'
          break
        case false:
          this.editData.modified_date = '否'
          break
        default:
          break
      }
      const tmp = []
      this.editData.created_date.forEach(item => {
        tmp.push(CodeToText[item])
      })
      this.editData.created_date = tmp.join(',')
      this.editData.created_date = this.editData.created_date.split(',')

      this.editPageClose()
    },
    // 打开编辑窗口+获取编辑的数据
    async getEditData(data) {
      this.editData = data
      // 转变modified_date的值
      switch (this.editData.modified_date) {
        case '是':
          this.editData.modified_date = true
          break
        case '否':
          this.editData.modified_date = false
          break
        default:
          break
      }
      // console.log('editdata:', this.editData)
      // 将城市名称格式化为对应code
      this.getCityCode(this.editData)

      const files = await this.getFileByCreatorId(data.user_no)
      // 将查询到的图片显示在界面

      files.forEach(item => {
        this.editFileno.push(item.file_no)
        this.picArr.push({ url: '/tanglei/' + item.path + '/' + item.name, file_no: item.file_no })
      })

      this.$nextTick(() => {
        this.editPageOpen()
      })
    },

    // 改
    updateList() {
      // 表单校验
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          delete this.editData.modified_date
          // console.log("this.editData", this.editData.created_date)
          const res = await updateMenu(this.formatDataBase(this.editData))
          // console.log(this.editData.user_no)
          if (this.resResult(res, '数据')) {
            this.updateFileDataBase(this.editData.user_no, this.editFileno)
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
      const res = await selectMenu(data)
      console.log(res)
      if (res.data.results) {
        // 格式化数据
        this.list = this.formatList(res.data.results)
      }
      this.total = res.data.total
      // console.log('selectList', this.list)
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
    // 将城市名称格式化为对应code
    getCityCode(data) {
      const created_dateCode = []
      const provinceCode = TextToCode[data.created_date[0]].code
      const countryCode = TextToCode[data.created_date[0]][data.created_date[1]].code
      created_dateCode.push(provinceCode, countryCode)
      data.created_date = created_dateCode
    },
    // 删除
    deleteList(data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 逻辑删除数据
        const deleteDate = []

        if (data instanceof Array) {
          data.forEach(item => {
            this.getCityCode(item)
            item.modified_date = 0
            delete item.modified_date
            deleteDate.push(this.formatDataBase(item))
          })
        } else {
          this.getCityCode(data)
          data.modified_date = 0
          delete data.modified_date
          deleteDate.push(this.formatDataBase(data))
        }
        const delLength = deleteDate.length
        // console.log("deleteDate", deleteDate)
        const res = await deleteMenu(deleteDate)
        console.log(res)
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
        // item.created_date = item.created_date.split(',')
        // switch (item.modified_date) {
        //   case 0:
        //     item.modified_date = '否'
        //     break
        //   case 1:
        //     item.modified_date = '是'
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
      const tmp = []
      data.created_date.forEach(item => {
        tmp.push(CodeToText[item])
      })
      data.created_date = tmp.join(',')
      switch (data.modified_date) {
        case '否':
          data.modified_date = 0
          break
        case '是':
          data.modified_date = 1
          break
        default:
          break
      }
      switch (data.alwaysShow) {
        case '组织机构':
          data.alwaysShow = 1
          break
        case '个人':
          data.alwaysShow = 2
          break
        default:
          break
      }

      switch (data.name) {
        case '身份证':
          data.name = 0
          break
        case '营业执照':
          data.name = 1
          break
        case '护照':
          data.name = 2
          break
        case '军人证':
          data.name = 3
          break
        case '警官证':
          data.name = 4
          break
        default:
          break
      }
      data.user_no = 'uuid()'
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
#user {
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
    .page-title {
      font-size: 24px;
      font-weight: 400;
    }
    .button {
      display: flex;
      justify-content: flex-end; //弹性盒子元素将向结束位置对齐
      align-items: center; //侧轴居中
    }
    .el-input,
    .el-textarea {
      width: 50%;
    }
    .el-date-editor {
      width: 220px;
    }
    .el-select,
    .el-input-number,
    .el-date-editor,
    .el-cascader {
      .el-input {
        width: 100%;
      }
    }
    .avatar-uploader .el-upload {
      border: 1px dashed @border-color;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    // 图片格式
    .orgImgs {
      display: inline;
      padding: 0px 4px;
      .el-image {
        width: 120px;
        height: 120px;
      }
    }
    .title,
    .el-descriptions__title {
      border-left: 4px solid @primary-color;
      padding-left: 8px;
    }
    // description样式
    .el-descriptions-item__label {
      display: block;
      width: 120px;
      text-align: right;
    }
    .el-descriptions-item__content {
      font-weight: 600;
    }
  }
}
</style>
