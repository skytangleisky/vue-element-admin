// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: '@/layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: '@/views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: '@/views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: '@/views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: '@/views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: '@/views/error-page/401',
    hidden: true
  }
]

const asyncRoutes = [
  {
    path: '/unit',
    component: '@/layout',
    children: [
      {
        path: 'index',
        component: '@/views/components/unit/index',
        name: 'Unit',
        meta: { title: '实时监控', icon: 'eye_fill', affix: true }
      }
    ]
  },
  {
    path: '/permission',
    component: '@/layout',
    // redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: '空域申请',
      icon: 'fly',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: '@/views/permission/page',
        name: 'PagePermission',
        meta: {
          title: '空域申请',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: '@/views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: '计划申请'
        }
      },
      {
        path: 'role',
        component: '@/views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
