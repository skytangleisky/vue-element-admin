<template>
  <el-main>
    <div class="block">
      <el-carousel trigger="click" style="border-radius:8px;overflow:hidden;">
        <el-carousel-item v-for="(item,index) in images" :key="index" style="display:flex;justify-content:center;align-items:center">
          <img :src="item.url" style="display:block;-webkit-user-drag:none;">
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-button size="mini" round @click="server">server</el-button>
    <div style="display:flex;flex-direction:row;flex-wrap:wrap">
      <!--<el-col :span="6" v-for="(o, index) in 10" :key="o" :offset="index > 0 ? 2 : 0" style="padding:10px">-->
      <div v-for="(o, index) in list2" :key="index" style="padding:10px;">
        <div class="card" style="position:relative;border-radius:8px;border:0px solid #00000044;box-shadow: 0px 0px 10px #909090;overflow:hidden;">
          <a target="_blank" :href="baseURL+'/'+o.product_root+o.product_url"><img :src="baseURL+'/'+o.product_root+o.product_image" style="user-drag:none;display:block;"></a>
          <div class="describe-top">
            <img :src="baseURL + '/emoji/经典表情245/12/害羞.png'">
            <span>{{ o.product_title }}</span>
          </div>
          <div class="describe-bottom">
            <time class="time">2021-11-02</time>
            <el-button type="primary" icon="el-icon-edit" circle size="mini" />
            <svg style="fill:white;width:20px;height:20px;"><use xlink:href="#iconcode-fork" /></svg>
          </div>
        </div>
      </div>
    </div>
    <el-progress type="line" :percentage="percentage" :stroke-width="20" />
    <el-progress type="circle" :percentage="25" stroke-linecap="round" />
    <el-progress type="dashboard" :percentage="10" status="success" stroke-linecap="square" />
    <el-progress type="circle" :percentage="70" status="warning" stroke-linecap="butt" />
    <el-progress type="circle" :percentage="50" status="exception" />
    <el-select
      v-model="value"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <img :src="item.image">{{ item.value }}
      </el-option>
    </el-select>
    <el-radio-group v-model="radio" @change="change">
      <el-radio-button label="Datas" />
      <el-radio-button label="Users" />
    </el-radio-group>
    <table-users v-show="radio=='Users'" msg="Hello Vue in CodeSandbox!" />
    <table-datas v-show="radio=='Datas'" msg="Hello Vue in CodeSandbox!" />
  </el-main>
</template>
<script>
// import '//at.alicdn.com/t/font_2524885_sglv1aoqywb.js'
import datas from '/src/views/table/data'
import users from '/src/views/table/tanglei'
import { baseURL } from '@/utils/request2.js'

import { fetchList } from '@/api/data.js'
export default {
  components: {
    'table-users': users,
    'table-datas': datas
  },
  data() {
    return {
      baseURL,
      listQuery: {
        page: 1,
        limit: 4,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: 'id'
      },
      radio: 'Datas',
      percentage: 20,
      options: [],
      value: [],
      list: [],
      list2: [],
      loading: false,
      states: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming'],
      images: [
        { url: 'https://img12.yiihuu.com/upimg/manage/2021/11/04/422-1636022327-522600.jpg' },
        { url: 'https://img12.yiihuu.com/upimg/manage/2021/10/08/422-1633658217-31258.jpg' },
        { url: 'https://img12.yiihuu.com/upimg/manage/2021/11/04/422-1636018108-691200.jpg' },
        { url: 'https://img12.yiihuu.com/upimg/manage/2021/11/05/314-1636104917-757543.jpg' },
        { url: 'https://img12.yiihuu.com/upimg/manage/2021/10/25/422-1635126435-630299.jpg' },
        { url: 'https://img12.yiihuu.com/upimg/manage/2021/10/08/422-1633658217-31258.jpg' }
      ]
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: 'value:${item}', label: 'label:${item}', image: baseURL + '/emoji/经典表情245/12/害羞.png' }
    })
    this.percentage += 10
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    change(label) {
      // alert(this.radio)
    },
    async getList() {
      this.listLoading = true
      const { data } = await fetchList(this.listQuery)
      this.list2 = data.items
      this.total = data.total
      this.listLoading = false
      this.oldList = this.list2.map(v => v.id)
      this.newList = this.oldList.slice()
      // this.$nextTick(() => {
      //     this.setSort()
      // })
    },
    server() {
      window.open('http://192.168.0.112/', '_blank')
    }
  }
}
</script>
<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .card{
    position:relative;
    border: 0px;
    border-radius:0px;
  }
  .describe-top{
    display: none;
    justify-content: flex-left;/*水平居中*/
    align-items: center;/*垂直居中*/
    text-shadow: .2rem 0rem .5rem black,-.2rem 0rem .5rem black,0rem .2rem .5rem black,0rem -.2rem .5rem black;
    color:white;
    position:absolute;
    top:0px;
    width:100%;
    line-height:28px;
  }
  .card:hover .describe-top{
    display:flex;
  }
  .describe-bottom{
    padding:2px;
    display:none;
    position:absolute;
    bottom:0px;
    background: #00000088;
    width:100%;
    justify-content:space-between;
    align-items:center;
  }
  .card:hover .describe-bottom{
    display:flex;
  }
</style>
