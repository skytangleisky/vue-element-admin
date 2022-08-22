<template>
  <div
    id="airspace-apply"
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
      <div class="tabs">
        <div class="search">
          <el-tabs
            v-model="activeName"
            type="border-card"
            @tab-click="searchStatus"
          >
            <el-tab-pane
              label="全部"
              name="all"
            />
            <el-tab-pane
              label="待提交"
              name="first"
            />
            <el-tab-pane
              label="受理中"
              name="second"
            />
            <el-tab-pane
              label="补充资料"
              name="third"
            />
            <el-tab-pane
              label="审核中"
              name="fourth"
            />
            <el-tab-pane
              label="审核通过"
              name="fifth"
            />
            <el-tab-pane
              label="驳回"
              name="sixth"
            />

          </el-tabs>

          <el-form
            :model="searchForm"
            :inline="true"
            label-position="top"
          >
            <el-form-item label="申请者类型:">
              <el-select
                v-model="searchForm.app_type"
                placeholder="请选择申请者类型"
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
                v-model="searchForm.id_type"
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
            <el-form-item label="飞行任务性质:">
              <el-select
                v-model="searchForm.mission"
                placeholder="飞行任务性质"
                @change="searchMission"
              >
                <el-option
                  label="全部"
                  :value="33"
                />
                <el-option
                  label="违法建设巡查"
                  :value="1"
                />
                <el-option
                  label="海事巡查"
                  :value="2"
                />
                <el-option
                  label="汛期地质灾害抢先排查飞行"
                  :value="3"
                />
                <el-option
                  label="训练飞行"
                  :value="4"
                />
                <el-option
                  label="试飞"
                  :value="5"
                />
                <el-option
                  label="熟练飞行"
                  :value="6"
                />
                <el-option
                  label="转场(调机)"
                  :value="7"
                />
                <el-option
                  label="个人娱乐"
                  :value="8"
                />
                <el-option
                  label="航空表演"
                  :value="9"
                />
                <el-option
                  label="空中广告"
                  :value="10"
                />
                <el-option
                  label="空中拍摄"
                  :value="11"
                />
                <el-option
                  label="跳伞飞行服务"
                  :value="12"
                />
                <el-option
                  label="航空摄影"
                  :value="13"
                />
                <el-option
                  label="空中游览"
                  :value="14"
                />
                <el-option
                  label="驾驶员培训"
                  :value="15"
                />
                <el-option
                  label="包机飞行"
                  :value="16"
                />
                <el-option
                  label="石油服务"
                  :value="17"
                />
                <el-option
                  label="气象探测"
                  :value="18"
                />
                <el-option
                  label="科学实验"
                  :value="19"
                />
                <el-option
                  label="海洋监测"
                  :value="20"
                />
                <el-option
                  label="直升机引航"
                  :value="21"
                />
                <el-option
                  label="城市消防"
                  :value="22"
                />
                <el-option
                  label="空中巡查"
                  :value="23"
                />
                <el-option
                  label="医疗救护"
                  :value="24"
                />
                <el-option
                  label="电力作业"
                  :value="25"
                />
                <el-option
                  label="渔业飞行"
                  :value="26"
                />
                <el-option
                  label="航空喷洒"
                  :value="27"
                />
                <el-option
                  label="航空护林"
                  :value="28"
                />
                <el-option
                  label="航空探矿"
                  :value="29"
                />
                <el-option
                  label="人工降雨"
                  :value="30"
                />
                <el-option
                  label="路桥巡检"
                  :value="31"
                />
                <el-option
                  label="其他"
                  :value="32"
                />

              </el-select>

            </el-form-item>
            <el-form-item label="运行场景分类:">
              <el-select
                v-model="searchForm.operation_type"
                placeholder="请选择运行场景"
                @change="searchOperationType"
              >
                <el-option
                  label="全部"
                  value="all"
                />
                <el-option
                  label="农田植保"
                  value="00"
                />
                <el-option
                  label="可见光传感VL"
                  value="20"
                />
                <el-option
                  label="其它传感VL"
                  value="21"
                />
                <el-option
                  label="森木作业"
                  value="22"
                />
                <el-option
                  label="外卖"
                  value="25"
                />
                <el-option
                  label="终端物流"
                  value="26"
                />
                <el-option
                  label="电力巡航"
                  value="50"
                />
                <el-option
                  label="可见光传感L"
                  value="70"
                />
                <el-option
                  label="其它传感L"
                  value="71"
                />
                <el-option
                  label="传感作业H"
                  value="A0"
                />
                <el-option
                  label="传感作业VH"
                  value="D0"
                />
                <el-option
                  label="中程物流"
                  value="75"
                />
                <el-option
                  label="远程物流"
                  value="A5"
                />

              </el-select>

            </el-form-item>
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

    </div>
    <!-- 新增窗口 -->
    <div
      ref="addPage"
      class="add-page"
    >
      <div class="page-title">
        新增
      </div>
      <el-form
        ref="userForm"
        label-position="right"
        label-width="120px"
        :model="userForm"
        :rules="dataRules"
      >
        <div class="title">
          基本信息
        </div>

        <el-form-item label="组织机构">
          <el-input
            v-model="userForm.org"
            disabled
          />
        </el-form-item>
        <el-form-item label="组织编号">
          <el-input
            v-model="userForm.orgNo"
            disabled
          />
        </el-form-item>
        <!-- <el-form-item label="占位行">
          <el-input
            v-model="userForm.sit"
            disabled
          >
          </el-input>
        </el-form-item> -->
        <el-form-item label="营业执照">
          <div
            v-for="(item,index) in userForm.orgImgs"
            :key="index"
            class="orgImgs"
          >
            <el-image
              :src="item"
              :preview-src-list="userForm.orgImgs"
              fit="contain"
            />
          </div>

        </el-form-item>
      </el-form>
      <el-form
        ref="addForm"
        label-position="right"
        label-width="120px"
        :model="addData"
        :rules="dataRules"
      >

        <el-form-item
          label="申请者类型"
          prop="app_type"
        >
          <el-select
            v-model="addData.app_type"
            placeholder="请选择申请者类型"
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
          label="联系人"
          prop="contacts"
        >
          <el-input v-model="addData.contacts" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
        >
          <el-input v-model="addData.phone" />
        </el-form-item>
        <el-form-item
          label="证件类型"
          prop="id_type"
        >
          <el-select
            v-model="addData.id_type"
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
          prop="id_no"
        >
          <el-input v-model="addData.id_no" />
        </el-form-item>
        <el-form-item label="证件照片">
          <!--
              on-preview: 点击文件列表中已上传的文件时的钩子
              on-remove: 文件列表移除文件时的钩子
              on-exceed: 文件超出个数限制时的钩子
              before-upload: 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
              limit: 最大允许上传个数
              multiple: 是否支持多选文件
              show-file-list: 是否显示已上传文件列表
             -->
          <el-upload
            ref="addUpload"
            action="/tanglei/controller/test.php"
            :data="fileCatalog"
            list-type="picture-card"
            :limit="5"
            :on-exceed="onExceed"
            :on-error="onError"
            :before-upload="beforeUpload"
            :on-preview="addImagePreview"
            :on-remove="addImageRemove"
            :on-success="addImageSuccess"
            :auto-upload="true"
            :multiple="true"
            :show-file-list="true"
          >
            <i class="el-icon-plus" />

            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过10M</div>
          </el-upload>
          <el-dialog :visible.sync="addImageVisible">
            <img
              width="100%"
              :src="addImageUrl"
              alt=""
            >
          </el-dialog>
        </el-form-item>
      </el-form>
      <el-divider />
      <div class="title">
        空域信息
      </div>

      <el-form
        ref="addForm"
        label-position="right"
        label-width="120px"
        :model="addData"
        :rules="dataRules"
      >
        <el-form-item
          label="飞行任务性质"
          prop="mission"
        >
          <el-select
            v-model="addData.mission"
            placeholder="请选择飞行任务性质"
          >
            <el-option
              label="违法建设巡查"
              :value="1"
            />
            <el-option
              label="海事巡查"
              :value="2"
            />
            <el-option
              label="汛期地质灾害抢先排查飞行"
              :value="3"
            />
            <el-option
              label="训练飞行"
              :value="4"
            />
            <el-option
              label="试飞"
              :value="5"
            />
            <el-option
              label="熟练飞行"
              :value="6"
            />
            <el-option
              label="转场(调机)"
              :value="7"
            />
            <el-option
              label="个人娱乐"
              :value="8"
            />
            <el-option
              label="航空表演"
              :value="9"
            />
            <el-option
              label="空中广告"
              :value="10"
            />
            <el-option
              label="空中拍摄"
              :value="11"
            />
            <el-option
              label="跳伞飞行服务"
              :value="12"
            />
            <el-option
              label="航空摄影"
              :value="13"
            />
            <el-option
              label="空中游览"
              :value="14"
            />
            <el-option
              label="驾驶员培训"
              :value="15"
            />
            <el-option
              label="包机飞行"
              :value="16"
            />
            <el-option
              label="石油服务"
              :value="17"
            />
            <el-option
              label="气象探测"
              :value="18"
            />
            <el-option
              label="科学实验"
              :value="19"
            />
            <el-option
              label="海洋监测"
              :value="20"
            />
            <el-option
              label="直升机引航"
              :value="21"
            />
            <el-option
              label="城市消防"
              :value="22"
            />
            <el-option
              label="空中巡查"
              :value="23"
            />
            <el-option
              label="医疗救护"
              :value="24"
            />
            <el-option
              label="电力作业"
              :value="25"
            />
            <el-option
              label="渔业飞行"
              :value="26"
            />
            <el-option
              label="航空喷洒"
              :value="27"
            />
            <el-option
              label="航空护林"
              :value="28"
            />
            <el-option
              label="航空探矿"
              :value="29"
            />
            <el-option
              label="人工降雨"
              :value="30"
            />
            <el-option
              label="路桥巡检"
              :value="31"
            />
            <el-option
              label="其他"
              :value="32"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="运行场景分类"
          prop="operation_type"
        >
          <el-select
            v-model="addData.operation_type"
            placeholder="请选择运行场景"
          >
            <el-option
              label="农田植保"
              value="00"
            />
            <el-option
              label="可见光传感VL"
              value="20"
            />
            <el-option
              label="其它传感VL"
              value="21"
            />
            <el-option
              label="森木作业"
              value="22"
            />
            <el-option
              label="外卖"
              value="25"
            />
            <el-option
              label="终端物流"
              value="26"
            />
            <el-option
              label="电力巡航"
              value="50"
            />
            <el-option
              label="可见光传感L"
              value="70"
            />
            <el-option
              label="其它传感L"
              value="71"
            />
            <el-option
              label="传感作业H"
              value="A0"
            />
            <el-option
              label="传感作业VH"
              value="D0"
            />
            <el-option
              label="中程物流"
              value="75"
            />
            <el-option
              label="远程物流"
              value="A5"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <airspace-map
        ref="airspaceMapAdd"
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
        <!-- <el-form-item
          label="应急处理程序"
          prop="proc"
        >
          <el-input v-model="addData.proc"></el-input>
        </el-form-item> -->
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
      <div class="title">
        日志
      </div>
      <div class="timeLine">

        <el-timeline :reverse="true">
          <el-timeline-item
            v-for="item in logData"
            :key="item.id"
            :timestamp="item.created_date"
            placement="top"
          >
            <el-card>
              <h4>{{ item.opinion }}</h4>
              <p>{{ item.creator }} 修改状态为 <b> {{ item.status }} </b></p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <el-divider />
      <div class="title">
        基本信息
      </div>
      <el-form
        ref="userForm"
        label-position="right"
        label-width="120px"
        :model="userForm"
        :rules="dataRules"
      >
        <el-form-item label="组织机构">
          <el-input
            v-model="userForm.org"
            disabled
          />
        </el-form-item>
        <el-form-item label="组织编号">
          <el-input
            v-model="userForm.orgNo"
            disabled
          />
        </el-form-item>
        <!-- <el-form-item label="占位行">
          <el-input
            v-model="userForm.sit"
            disabled
          >
          </el-input>
        </el-form-item> -->
        <el-form-item label="营业执照">
          <div
            v-for="(item,index) in userForm.orgImgs"
            :key="index"
            class="orgImgs"
          >
            <el-image
              :src="item"
              :preview-src-list="userForm.orgImgs"
              fit="contain"
            />
          </div>

        </el-form-item>
      </el-form>
      <el-form
        ref="editForm"
        label-position="right"
        label-width="120px"
        :model="editData"
        :rules="dataRules"
      >

        <el-form-item
          label="申请者类型"
          prop="app_type"
        >
          <el-select
            v-model="editData.app_type"
            placeholder="请选择申请者类型"
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
          label="联系人"
          prop="contacts"
        >
          <el-input v-model="editData.contacts" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
        >
          <el-input v-model="editData.phone" />
        </el-form-item>
        <el-form-item
          label="证件类型"
          prop="id_type"
        >
          <el-select
            v-model="editData.id_type"
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
          prop="id_no"
        >
          <el-input v-model="editData.id_no" />
        </el-form-item>
        <el-form-item label="证件照片">
          <!--
              on-preview: 点击文件列表中已上传的文件时的钩子
              on-remove: 文件列表移除文件时的钩子
              on-exceed: 文件超出个数限制时的钩子
              before-upload: 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
              limit: 最大允许上传个数
              multiple: 是否支持多选文件
              show-file-list: 是否显示已上传文件列表
             -->
          <el-upload
            ref="editUpload"
            class="avatar-uploader"
            action="/tanglei/controller/test.php"
            :data="fileCatalog"
            list-type="picture-card"
            :limit="5"
            :on-exceed="onExceed"
            :on-error="onError"
            :before-upload="beforeUpload"
            :on-preview="editImagePreview"
            :on-remove="editImageRemove"
            :on-success="editImageSuccess"
            :auto-upload="true"
            :multiple="true"
            :show-file-list="true"
            :file-list="picArr"
          >
            <i class="el-icon-plus" />

            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过10M</div>
          </el-upload>
          <el-dialog :visible.sync="editImageVisible">
            <img
              width="100%"
              :src="editImageUrl"
              alt=""
            >
          </el-dialog>
        </el-form-item>
      </el-form>
      <el-divider />
      <div class="title">
        空域信息
      </div>

      <el-form
        ref="editForm"
        label-position="right"
        label-width="120px"
        :model="editData"
        :rules="dataRules"
      >
        <el-form-item
          label="飞行任务性质"
          prop="mission"
        >
          <el-select
            v-model="editData.mission"
            filterable
            placeholder="请选择飞行任务性质"
          >
            <el-option
              label="违法建设巡查"
              :value="1"
            />
            <el-option
              label="海事巡查"
              :value="2"
            />
            <el-option
              label="汛期地质灾害抢先排查飞行"
              :value="3"
            />
            <el-option
              label="训练飞行"
              :value="4"
            />
            <el-option
              label="试飞"
              :value="5"
            />
            <el-option
              label="熟练飞行"
              :value="6"
            />
            <el-option
              label="转场(调机)"
              :value="7"
            />
            <el-option
              label="个人娱乐"
              :value="8"
            />
            <el-option
              label="航空表演"
              :value="9"
            />
            <el-option
              label="空中广告"
              :value="10"
            />
            <el-option
              label="空中拍摄"
              :value="11"
            />
            <el-option
              label="跳伞飞行服务"
              :value="12"
            />
            <el-option
              label="航空摄影"
              :value="13"
            />
            <el-option
              label="空中游览"
              :value="14"
            />
            <el-option
              label="驾驶员培训"
              :value="15"
            />
            <el-option
              label="包机飞行"
              :value="16"
            />
            <el-option
              label="石油服务"
              :value="17"
            />
            <el-option
              label="气象探测"
              :value="18"
            />
            <el-option
              label="科学实验"
              :value="19"
            />
            <el-option
              label="海洋监测"
              :value="20"
            />
            <el-option
              label="直升机引航"
              :value="21"
            />
            <el-option
              label="城市消防"
              :value="22"
            />
            <el-option
              label="空中巡查"
              :value="23"
            />
            <el-option
              label="医疗救护"
              :value="24"
            />
            <el-option
              label="电力作业"
              :value="25"
            />
            <el-option
              label="渔业飞行"
              :value="26"
            />
            <el-option
              label="航空喷洒"
              :value="27"
            />
            <el-option
              label="航空护林"
              :value="28"
            />
            <el-option
              label="航空探矿"
              :value="29"
            />
            <el-option
              label="人工降雨"
              :value="30"
            />
            <el-option
              label="路桥巡检"
              :value="31"
            />
            <el-option
              label="其他"
              :value="32"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="运行场景分类"
          prop="operation_type"
        >
          <el-select
            v-model="editData.operation_type"
            filterable
            placeholder="请选择运行场景"
          >
            <el-option
              label="农田植保"
              value="00"
            />
            <el-option
              label="可见光传感VL"
              value="20"
            />
            <el-option
              label="其它传感VL"
              value="21"
            />
            <el-option
              label="森木作业"
              value="22"
            />
            <el-option
              label="外卖"
              value="25"
            />
            <el-option
              label="终端物流"
              value="26"
            />
            <el-option
              label="电力巡航"
              value="50"
            />
            <el-option
              label="可见光传感L"
              value="70"
            />
            <el-option
              label="其它传感L"
              value="71"
            />
            <el-option
              label="传感作业H"
              value="A0"
            />
            <el-option
              label="传感作业VH"
              value="D0"
            />
            <el-option
              label="中程物流"
              value="75"
            />
            <el-option
              label="远程物流"
              value="A5"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <airspace-map
        ref="airspaceMapEdit"
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
          label="空域类型"
          prop="spc_type"
        >
          <el-select
            v-model="editData.spc_type"
            filterable
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
            :step="5"
          />
        </el-form-item>
        <el-form-item
          label="空域顶高"
          prop="top"
        >
          <el-input-number
            v-model="editData.top"
            :min="0"
            :step="5"
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
        <!--  <el-form-item
          label="应急处理程序"
          prop="proc"
        >
          <el-input v-model="editData.proc"></el-input>
        </el-form-item> -->
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
      <div class="title">
        日志
      </div>
      <div class="timeLine">
        <el-timeline :reverse="true">
          <el-timeline-item
            v-for="item in logData"
            :key="item.id"
            :timestamp="item.created_date"
            placement="top"
          >
            <el-card>
              <h4>{{ item.opinion }}</h4>
              <p>{{ item.creator }} 修改状态为 <b> {{ item.status }} </b></p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <el-divider />
      <el-descriptions
        title="基本信息"
        :column="1"
      >
        <el-descriptions-item label="组织机构">{{ userForm.org }}</el-descriptions-item>
        <el-descriptions-item label="组织编号">{{ userForm.orgNo }}</el-descriptions-item>
        <el-descriptions-item label="营业执照">
          <div
            v-for="(item,index) in userForm.orgImgs"
            :key="index"
            class="orgImgs"
          >
            <el-image
              :src="item"
              :preview-src-list="userForm.orgImgs"
              fit="cover"
            />
          </div>

        </el-descriptions-item>

        <el-descriptions-item label="申请者类型">{{ detailData.app_type }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ detailData.contacts }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ detailData.phone }}</el-descriptions-item>
        <el-descriptions-item label="证件类型">{{ detailData.id_type }}</el-descriptions-item>
        <el-descriptions-item label="证件号码">{{ detailData.id_no }}</el-descriptions-item>
        <el-descriptions-item label="证件照片">
          <div
            v-for="(item,index) in idPics"
            :key="index"
            class="orgImgs"
          >
            <el-image
              :src="item"
              :preview-src-list="idPics"
              fit="cover"
            />
          </div>
        </el-descriptions-item>

      </el-descriptions>
      <el-divider />
      <div class="title">空域信息</div>

      <el-descriptions :column="1">

        <el-descriptions-item label="飞行任务性质">{{ detailData.mission }}</el-descriptions-item>
        <el-descriptions-item label="运行场景分类">{{ detailData.operation_type }}</el-descriptions-item>

      </el-descriptions>

      <airspace-map
        ref="airspaceMapDetail"
        class="airspace-map"
        cesium-id="cesiumIdDetail"
        @getDataFromDraw="airspaceMapFunc($event)"
      />
      <el-descriptions :column="1">
        <el-descriptions-item label="空域类型">{{ detailData.spc_type }}</el-descriptions-item>
        <el-descriptions-item label="空域形状">{{ detailData.shape }}</el-descriptions-item>
        <el-descriptions-item label="空域底高">{{ detailData.bot }}</el-descriptions-item>
        <el-descriptions-item label="空域顶高">{{ detailData.top }}</el-descriptions-item>
        <el-descriptions-item label="空域数据">{{ detailData.coor }}</el-descriptions-item>
        <!-- <el-descriptions-item label="应急处理程序">{{detailData.proc}}</el-descriptions-item> -->
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
import { insert, del, delAirSpc, updateAirSpc, select } from '/src/api/table/t_airspace_request.js'
// eslint-disable-next-line
import { insertUser, deleteUser, updateUser, selectUser } from '/src/api/table/t_user.js'
import { insertReqFile, delReqFile, selectReqFile } from '/src/api/table/t_airspace_request_file.js'
import { insertReqLog, selectReqLog } from '/src/api/table/t_airspace_request_log.js'
// eslint-disable-next-line
import { insertFile, delFile, updateFile, selectFile } from '/src/api/table/t_file'
// 过滤表单模块
import filterForm from './components/filterForm.vue'
// 表格组件
import tableModel from './components/tableModel.vue'
// 分页组件
import Pagination from './components/pagination.vue'

// import position from './无人机云平台/position.vue'

export default {
  // name: "AirspaceApply",
  components: {
    filterForm,
    tableModel,
    Pagination,
    airspaceMap: null
  },
  data() {
    return {
      cesiumIdAdd: 'cesiumIdAdd',
      cesiumIdEdit: 'cesiumIdEdit',
      cesiumIdDetail: 'cesiumIdEdit',
      // 证件照片
      idPics: [],
      // 日志数据
      logData: [],
      // 是否显示上传证件照的弹窗
      uploadDialogVisible: false,
      // 当前登录用户的uuid
      loginUserNo: '3bda3efcf3b411ec8a204ccc6a393ecd',
      // 表格每列展示的数据
      tableCol: [
        /*  {
          prop: "app_type",
          label: "申请者类型",
          width: 120,
          showOverflowTooltip: false,
          sortable: 'custom'
        },
        {
          prop: "contacts",
          label: "联系人",
          width: 80,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: "phone",
          label: "手机号码",
          width: 128,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: "id_type",
          label: "证件类型",
          width: 80,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: "id_no",
          label: "证件号码",
          width: 200,
          showOverflowTooltip: true,
          sortable: false
         }, */
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
          prop: 'mission',
          label: '飞行任务性质',
          width: 140,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: 'proc',
          label: '应急处理程序',
          width: 140,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: 'operation_type',
          label: '运行场景分类',
          width: 120,
          showOverflowTooltip: false,
          sortable: false
        },
        {
          prop: 'status',
          label: '状态',
          width: 120,
          showOverflowTooltip: true,
          sortable: false
        },
        {
          prop: 'memo',
          label: '备注',
          width: 200,
          showOverflowTooltip: true,
          sortable: false
        }
      ],
      idImages: [],
      // 当前登录用户的基本信息
      userForm: {
        org: null,
        orgNo: null,
        sit: null,
        orgImgs: []
      },
      // 新增数据
      addData: {
        app_type: 1,
        contacts: null,
        phone: null,
        id_type: null,
        id_no: null,
        spc_type: null,
        shape: null,
        coor: null,
        bot: null,
        top: null,
        begin: null,
        end: null,
        mission: null,
        proc: null,
        operation_type: null,
        status: 1,
        creator: null,
        memo: null,
        is_active: 1
      },
      /* 数据的规则
      trigger: blur 失去焦点时进行验证;change 当值发生变化时进行验证
      */
      dataRules: {
        app_type: [
          { required: true, message: '请选择申请者类型', trigger: 'change' }
        ],
        contacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        id_type: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        id_no: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
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
        mission: [
          { required: true, message: '请选择飞行任务性质', trigger: 'change' }
        ],
        operation_type: [
          { required: true, message: '请选择运行场景', trigger: 'change' }
        ],

        proc: [
          { required: true, message: '请输入应急处理程序', trigger: 'blur' }
        ],

        begin: [
          { required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        end: [
          { required: true, message: '请选择截至日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]

      },
      // 详情数据
      detailData: {},
      // 编辑数据
      editData: {},
      // 证件照片图集
      picArr: [],
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
          field: 'contacts',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'phone',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'id_no',
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
          field: 'proc',
          relationship: 'LIKE',
          condition: ''
        },
        {
          relation: 'OR',
          field: 'memo',
          relationship: 'LIKE',
          condition: ''
        }
        // {
        //   relation: "OR",
        //   field: "creator",
        //   relationship: "LIKE",
        //   condition: ""
        // },
      ],
      // 统计数据总条数
      total: 0,
      // 搜索表单
      searchForm: {
        spc_type: 9,
        shape: 6,
        app_type: 3,
        id_type: 5,
        operation_type: 'all',
        mission: 33
      },
      // 状态默认选中项
      activeName: 'all',
      // 上传文件的目录
      fileCatalog: { path: '', name: 'uuid()' },
      // 新增数据时文件的相应数据
      addFileno: [],
      addImageUrl: '',
      addImageVisible: false,
      // 编辑数据时文件的相应数据
      editFileno: [],
      editImageUrl: '',
      editImageVisible: false
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
    // 获得新增的数据
    async getAddData(res, selFunc) {
      const listQuery = { where: [] }
      listQuery.where = [
        {
          relation: 'AND',
          field: 'id',
          relationship: '=',
          condition: res.data.results[0].insertId
        }
      ]
      const selectRes = await selFunc(listQuery)
      return await selectRes.data.results[0]
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
    onExceed(files, fileList) {
      this.$message.error('一次最多上传5张图片')
    },
    onError(err, file, fileList) {
      console.error(err)
      this.$message.error('图片上传失败！！！')
    },
    // 点击删除时删除文件
    removeFileno(file, data) {
      delFile([{ file_no: file.file_no }])
      const newData = data.filter(item => {
        return item !== file.file_no
      })
      return newData
    },

    // 图片成功的操作,将文件存入t_file表中，并将uuid存储起来
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
      this.addImageUrl = file.url
      this.addImageVisible = true
    },
    addImageRemove(file, fileList) {
      this.addFileno = this.removeFileno(file, this.addFileno)
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
      this.editImageVisible = true
    },
    editImageRemove(file, fileList) {
      this.editFileno = this.removeFileno(file, this.editFileno)
    },

    searchAppType(val) {
      this.searchValChange(val, 3, 'app_type')
    },
    searchIdType(val) {
      this.searchValChange(val, 5, 'id_type')
    },
    searchOperationType(val) {
      this.searchValChange(val, 'all', 'operation_type')
    },
    searchMission(val) {
      this.searchValChange(val, 33, 'mission')
    },
    searchSpcType(val) {
      // console.log("val", val)
      this.searchValChange(val, 9, 'spc_type')
    },
    searchShape(val) {
      // console.log("val", val)
      this.searchValChange(val, 6, 'shape')
    },
    searchStatus(tab) {
      let val = null
      switch (Number(tab.index)) {
        case 0:
          val = 7
          break
        case 1:
          val = 1
          break
        case 2:
          val = 2
          break
        case 3:
          val = 3
          break
        case 4:
          val = 4
          break
        case 5:
          val = 5
          break
        case 6:
          val = 6
          break
        default:
          break
      }
      this.searchValChange(val, 7, 'status')
    },
    /** 搜索下拉框值改变时即搜索条件改变时触发
     * 1.判断where条件的长度是否为1
     *  1.1 where长度为1，搜索值是否与全部选项的值相等
     *    1.1.1 值为全部，直接查
     *    1.1.2 值与全部选项值不等，则在where上添加一个选项，然后查询
     *   1.2 where长度不为1，搜索值是否与全部选项的值相等
     *    1.2.1 值为全部，遍历数组看是否存在有搜索字段
     *  */
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
    // 获取当前操作用户的基本信息
    async getUserInfo() {
      const selectUserQuery = {
        where: [
          {
            relation: 'AND',
            field: 'user_no',
            relationship: '=',
            condition: this.loginUserNo
          }
        ]
      }
      const selectFileQuery = {
        where: [
          {
            relation: 'AND',
            field: 'creator_id',
            relationship: '=',
            condition: this.loginUserNo
          }
        ]
      }
      const res = await selectUser(selectUserQuery)
      const loginUserInfo = res.data.results[0]
      // console.log(loginUserInfo)
      this.userForm.org = loginUserInfo.company
      this.userForm.orgNo = loginUserInfo.scc
      // 获取企业资质
      const res01 = await selectFile(selectFileQuery)
      res01.data.results.forEach(item => {
        this.userForm.orgImgs.push('/tanglei/' + item.path + '/' + item.name)
      })
    },
    // 打开新增窗口
    addPageOpen() {
      this.getUserInfo()
      this.$refs.content.style.display = 'none'
      this.$refs.addPage.style.display = 'block'
    },
    // 关闭新增窗口
    addPageClose() {
      this.$refs.addPage.style.display = 'none'
      this.$refs.content.style.display = 'block'
      // 清空数据
      this.userForm = {
        org: null,
        orgNo: null,
        sit: null,
        orgImgs: []
      }
      this.$refs.addUpload.clearFiles()
      this.addFileno = []
    },
    // 增
    insertList(data) {
      // 表单校验
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          this.addData.creator = this.loginUserNo
          // console.log("this.addData", this.addData)

          const res = await insert(this.formatDataBase(this.addData))
          if (this.resResult(res, '数据')) {
            // 获取新增数据
            const newData = await this.getAddData(res, select)
            const req_no = newData.req_no
            this.addFileno.forEach(async item => {
              // console.log("req_no", req_no, "item", item)
              // t_airspace_request_file 表中添加数据
              await insertReqFile({ spc_req_no: req_no, file_no: item })
            })
            // t_airspace_request_log 表中添加数据
            await insertReqLog({ opinion: '待提交的审批意见', status: 1, creator: this.loginUserNo, spc_req_no: req_no })

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
      // 清空数据
      this.userForm = {
        org: null,
        orgNo: null,
        sit: null,
        orgImgs: []
      }
      this.detailData = {}
      this.detailFileno = []
      this.idPics = []
    },
    // 获取详情数据
    async getDetailData(data) {
      this.detailData = data
      // console.log(this.detailData)
      this.getUserInfo()
      this.getLogData(data.req_no)
      const files = await this.getUploadFiles(data.req_no)
      files.forEach(async item => {
        // 获取t_file中用户上传的文件地址
        const fileInfo = await this.getUploadFile(item.file_no)
        // idPicList
        this.idPics.push('/tanglei/' + fileInfo.path + '/' + fileInfo.name)
      })
      this.detailPageOpen()
    },
    // 打开编辑窗口
    editPageOpen() {
      this.getUserInfo()
      this.$refs.content.style.display = 'none'
      this.$refs.editPage.style.display = 'block'
    },
    // 关闭编辑窗口
    editPageClose() {
      this.$refs.editPage.style.display = 'none'
      this.$refs.content.style.display = 'block'
      // 清空数据
      this.userForm = {
        org: null,
        orgNo: null,
        sit: null,
        orgImgs: []
      }
      this.editData = {}
      this.editFileno = []
      this.picArr = []
      this.$refs.editUpload.clearFiles()
    },
    // 获取编辑的数据
    async getEditData(data) {
      this.editData = data
      // console.log('getEditData赋值的editdata', this.editData)

      // 获取日志
      this.getLogData(data.req_no)

      const files = await this.getUploadFiles(data.req_no)
      files.forEach(async item => {
        this.editFileno.push(item.file_no)
        // 获取t_file中用户上传的文件地址
        const fileInfo = await this.getUploadFile(item.file_no)
        this.picArr.push({ url: '/tanglei/' + fileInfo.path + '/' + fileInfo.name, file_no: fileInfo.file_no })
      })
      this.$nextTick(() => {
        this.editPageOpen()
      })
    },
    // 根据用户表的uuid查出真实姓名
    async getRealName(creator) {
      const query = {
        where: [
          {
            relation: 'AND',
            field: 'user_no',
            relationship: '=',
            condition: creator
          }
        ]
      }

      const res = await selectUser(query)
      if (res.data.results) {
        return res.data.results[0].real_name
      }
    },
    // 获取日志数据
    async getLogData(spcReqNo) {
      const query = {
        where: [
          {
            relation: 'AND',
            field: 'spc_req_no',
            relationship: '=',
            condition: spcReqNo
          }
        ]
      }
      const res = await selectReqLog(query)
      if (res.data.results) {
        this.logData = res.data.results
        this.logData.forEach(async item => {
          // item.creator = await this.getRealName(item.creator)
          // switch (item.status) {
          //   case 1:
          //     item.status = '待提交'
          //     break
          //   case 2:
          //     item.status = '受理中'
          //     break
          //   case 3:
          //     item.status = '补充资料'
          //     break
          //   case 4:
          //     item.status = '审核中'
          //     break
          //   case 5:
          //     item.status = '审核通过'
          //     break
          //   case 6:
          //     item.status = '驳回'
          //     break
          //   default:
          //     break
          // }
        })
      }
    },
    // 根据req_no与中间表搜索文件的uuid
    async getUploadFiles(spcReqNo) {
      const query = {
        where: [
          {
            relation: 'AND',
            field: 'spc_req_no',
            relationship: '=',
            condition: spcReqNo
          }
        ]
      }
      const res = await selectReqFile(query)
      if (res.data.results) {
        return res.data.results
      }
    },
    // 根据file_no搜索上传的文件路径
    async getUploadFile(fileNo) {
      const query = {
        where: [
          {
            relation: 'AND',
            field: 'file_no',
            relationship: '=',
            condition: fileNo
          }
        ]
      }
      const res = await selectFile(query)
      if (res.data.results) {
        return res.data.results[0]
      }
    },

    // 改
    updateList() {
      // 表单校验
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          // console.log("this.editData", this.editData)
          const res = await updateAirSpc(this.formatDataBase(this.editData))
          // console.log(this.editData)
          if (this.resResult(res, '数据')) {
            //   const newData = await this.getAddData(res, select)
            const req_no = this.editData.req_no
            // 清空中间表中关于当前空域的文件
            await delReqFile([{ spc_req_no: req_no }])
            this.$nextTick(() => {
              this.editFileno.forEach(async item => {
                // t_airspace_request_file 表中添加数据
                // eslint-disable-next-line
                const res = await insertReqFile({ spc_req_no: req_no, file_no: item })
              })
              this.editPageClose()
              this.selectList(this.listQuery)
            })
          }
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
        /* const newData = []
        if (data instanceof Array) {
          data.forEach(item => {
            newData.push({ "id": item.id })
          })
        } else {
          newData.push({ "id": data.id })
        }
        const delLength = newData.length
        const res = await del(newData) */

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
        const res = await delAirSpc(deleteDate)
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
      // console.log(oldList)
      const newList = []
      oldList.forEach(item => {
        switch (item.app_type) {
          case 1:
            item.app_type = '组织机构'
            break
          case 2:
            item.app_type = '个人'
            break
          default:
            break
        }
        switch (item.id_type) {
          case 0:
            item.id_type = '身份证'
            break
          case 1:
            item.id_type = '营业执照'
            break
          case 2:
            item.id_type = '护照'
            break
          case 3:
            item.id_type = '军人证'
            break
          case 4:
            item.id_type = '警官证'
            break
          default:
            break
        }
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
        switch (item.mission) {
          case 1:
            item.mission = '违法建设巡查'
            break
          case 2:
            item.mission = '海事巡查'
            break
          case 3:
            item.mission = '汛期地质灾害抢先排查飞行'
            break
          case 4:
            item.mission = '训练飞行'
            break
          case 5:
            item.mission = '试飞'
            break
          case 6:
            item.mission = '熟练飞行'
            break
          case 7:
            item.mission = '转场(调机)'
            break
          case 8:
            item.mission = '个人娱乐'
            break
          case 9:
            item.mission = '航空表演'
            break
          case 10:
            item.mission = '空中广告'
            break
          case 11:
            item.mission = '空中拍摄'
            break
          case 12:
            item.mission = '跳伞飞行服务'
            break
          case 13:
            item.mission = '航空摄影'
            break
          case 14:
            item.mission = '空中游览'
            break
          case 15:
            item.mission = '驾驶员培训'
            break
          case 16:
            item.mission = '包机飞行'
            break
          case 17:
            item.mission = '石油服务'
            break
          case 18:
            item.mission = '气象探测'
            break
          case 19:
            item.mission = '科学实验'
            break
          case 20:
            item.mission = '海洋监测'
            break
          case 21:
            item.mission = '直升机引航'
            break
          case 22:
            item.mission = '城市消防'
            break
          case 23:
            item.mission = '空中巡查'
            break
          case 24:
            item.mission = '医疗救护'
            break
          case 25:
            item.mission = '电力作业'
            break
          case 26:
            item.mission = '渔业飞行'
            break
          case 27:
            item.mission = '航空喷洒'
            break
          case 28:
            item.mission = '航空护林'
            break
          case 29:
            item.mission = '航空探矿'
            break
          case 30:
            item.mission = '人工降雨'
            break
          case 31:
            item.mission = '路桥巡检'
            break
          case 32:
            item.mission = '其他'
            break
          default:
            break
        }
        switch (item.operation_type) {
          case '00':
            item.operation_type = '农田植保'
            break
          case '20':
            item.operation_type = '可见光传感VL'
            break
          case '21':
            item.operation_type = '其它传感VL'
            break
          case '22':
            item.operation_type = '森木作业'
            break
          case '25':
            item.operation_type = '外卖'
            break
          case '26':
            item.operation_type = '终端物流'
            break
          case '50':
            item.operation_type = '电力巡航'
            break
          case '70':
            item.operation_type = '可见光传感L'
            break
          case '71':
            item.operation_type = '其它传感L'
            break
          case '75':
            item.operation_type = '中程物流'
            break
          case 'A0':
            item.operation_type = '传感作业H'
            break
          case 'A5':
            item.operation_type = '远程物流'
            break
          case 'D0':
            item.operation_type = '传感作业VH'
            break
          default:
            break
        }
        switch (item.status) {
          case 1:
            item.status = '待提交'
            break
          case 2:
            item.status = '受理中'
            break
          case 3:
            item.status = '补充资料'
            break
          case 4:
            item.status = '审核中'
            break
          case 5:
            item.status = '审核通过'
            break
          case 6:
            item.status = '驳回'
            break
          default:
            break
        }
        item.bot = item.bot / 1000
        item.top = item.top / 1000
        if (item.begin) {
          item.begin = item.begin.slice(0, 19)
        }
        if (item.end) {
          item.end = item.end.slice(0, 19)
        }
        item.created_date = item.created_date.slice(0, 19)
        item.modified_date = item.modified_date.slice(0, 19)
        newList.push(item)
      })
      return newList
    },
    // 格式化存入数据库的数据
    formatDataBase(data) {
      switch (data.app_type) {
        case '组织机构':
          data.app_type = 1
          break
        case '个人':
          data.app_type = 2
          break
        default:
          break
      }
      switch (data.id_type) {
        case '身份证':
          data.id_type = 0
          break
        case '营业执照':
          data.id_type = 1
          break
        case '护照':
          data.id_type = 2
          break
        case '军人证':
          data.id_type = 3
          break
        case '警官证':
          data.id_type = 4
          break
        default:
          break
      }
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
      switch (data.status) {
        case '待提交':
          data.status = 1
          break
        case '受理中':
          data.status = 2
          break
        case '补充资料':
          data.status = 3
          break
        case '审核中':
          data.status = 4
          break
        case '审核通过':
          data.status = 5
          break
        case '驳回':
          data.status = 6
          break
        default:
          break
      }
      switch (data.mission) {
        case '违法建设巡查':
          data.mission = 1
          break
        case '海事巡查':
          data.mission = 2
          break
        case '汛期地质灾害抢先排查飞行':
          data.mission = 3
          break
        case '训练飞行':
          data.mission = 4
          break
        case '试飞':
          data.mission = 5
          break
        case '熟练飞行':
          data.mission = 6
          break
        case '转场(调机)':
          data.mission = 7
          break
        case '个人娱乐':
          data.mission = 8
          break
        case '航空表演':
          data.mission = 9
          break
        case '空中广告':
          data.mission = 10
          break
        case '空中拍摄':
          data.mission = 11
          break
        case '跳伞飞行服务':
          data.mission = 12
          break
        case '航空摄影':
          data.mission = 13
          break
        case '空中游览':
          data.mission = 14
          break
        case '驾驶员培训':
          data.mission = 15
          break
        case '包机飞行':
          data.mission = 16
          break
        case '石油服务':
          data.mission = 17
          break
        case '气象探测':
          data.mission = 18
          break
        case '科学实验':
          data.mission = 19
          break
        case '海洋监测':
          data.mission = 20
          break
        case '直升机引航':
          data.mission = 21
          break
        case '城市消防':
          data.mission = 22
          break
        case '空中巡查':
          data.mission = 23
          break
        case '医疗救护':
          data.mission = 24
          break
        case '电力作业':
          data.mission = 25
          break
        case '渔业飞行':
          data.mission = 26
          break
        case '航空喷洒':
          data.mission = 27
          break
        case '航空护林':
          data.mission = 28
          break
        case '航空探矿':
          data.mission = 29
          break
        case '人工降雨':
          data.mission = 30
          break
        case '路桥巡检':
          data.mission = 31
          break
        case '其他':
          data.mission = 32
          break
        default:
          break
      }
      switch (data.operation_type) {
        case '农田植保':
          data.operation_type = '00'
          break
        case '可见光传感VL':
          data.operation_type = '20'
          break
        case '其它传感VL':
          data.operation_type = '21'
          break
        case '森木作业':
          data.operation_type = '22'
          break
        case '外卖':
          data.operation_type = '25'
          break
        case '终端物流':
          data.operation_type = '26'
          break
        case '电力巡航':
          data.operation_type = '50'
          break
        case '可见光传感L':
          data.operation_type = '70'
          break
        case '其它传感L':
          data.operation_type = '71'
          break
        case '中程物流':
          data.operation_type = '75'
          break
        case '传感作业H':
          data.operation_type = 'A0'
          break
        case '远程物流':
          data.operation_type = 'A5'
          break
        case '传感作业VH':
          data.operation_type = 'D0'
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
          /*  this.$message({
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
    },

    // 空域申请地图
    airspaceMapFunc(info) {
      console.log('map:', info)
    }
  }
}

</script>

<style lang='less'>
@border-color: #e4e7ed;
@background-color: #f5f7fa;
@primary-color: #409eff;
.fr {
  float: right;
}
body {
  background-color: @background-color;
  overflow: auto;
}
#airspace-apply {
  height: 100%;
  background: @background-color;
  overflow: auto;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  .tabs,
  #filter-form {
    border-radius: 8px;
  }
  #filter-form,
  #pagination,
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
  .tabs {
    box-sizing: border-box;
    border: 1px solid @border-color;
  }

  .search {
    background-color: #fff;
    .el-tabs--border-card {
      border: none;
    }
    .el-tabs__content {
      padding: 0px;
    }
    .el-tabs--border-card {
      box-shadow: none;
    }
    .el-form {
      padding: 16px 16px 0px;
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
      color: #606266;
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
    .el-date-editor {
      .el-input {
        width: 100%;
      }
    }
    .airspace-map {
      width: 100%;
      height: 500px;
      border: 1px solid @border-color;
      margin-bottom: 16px;
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
    .timeLine {
      max-height: 400px;
      overflow: auto;
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
  }
}
</style>
