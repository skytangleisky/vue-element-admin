<template>
  <el-select v-model="arr" class="role-select" placeholder="请选择" multiple @change="change">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script>
import { select } from '/src/api/table/role'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: '[]'
    }
  },
  data() {
    return {
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
      },
      arr: [],
      options: [
        { value: 'admin', label: 'admin' },
        { value: 'guangzhou', label: 'guangzhou' }
      ]
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        newVal = newVal || '[]'
        this.arr = JSON.parse(newVal)
      }
    }
  },
  async mounted() {
    const res = await select(this.listQuery)
    this.options = []
    res.data.results.map((v, k) => {
      this.options.push({
        value: v.role_name,
        label: v.role_name
      })
    })
  },
  methods: {
    change(val) {
      this.value = JSON.stringify(val)
      this.$emit('change', this.value)
    }
  }
}
</script>
