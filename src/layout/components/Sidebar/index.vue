<template>
  <div id="lcc" :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />

    <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-openeds="defaultOpends"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"

        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <resize-observer @notify="handleResize" />
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/index.scss'
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    defaultOpends: function() {
      const opends = []
      var recursion = list => {
        list.map((v, k) => {
          if (v.opened) {
            opends.push(v.uuid)
          }
          if (v.children instanceof Array) {
            recursion(v.children)
          }
        })
      }
      recursion(this.permission_routes)
      return opends
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleResize({ width, height }) {
      const that = this
      that.$refs['scrollbar'].update()
    }
  }
}
</script>
