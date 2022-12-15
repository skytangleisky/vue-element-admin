<template>
  <div>
    <div style="margin-bottom:15px;">
      Your roles: {{ roles }}
    </div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button v-for="item in roles" :key="item" :label="item" />
    </el-radio-group>
  </div>
</template>

<script>
import { update, paging } from '@/api/table/user.js'
export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    username() {
      return this.$store.getters.username
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.roles.unshift(this.roles.splice(this.roles.indexOf(val), 1)[0])
        paging({
          select: ['uuid'],
          where: [
            { relation: 'AND', field: 'username', relationship: '=', condition: this.username }
          ]
        }).then(res => {
          const data = { uuid: res.data.results[0].uuid, roles: JSON.stringify(this.roles) }
          update(data).then(res => {
            console.log(this.username, res.data)
          })
        })

        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
