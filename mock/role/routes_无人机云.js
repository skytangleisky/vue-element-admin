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
    path: '/实时监控',
    component: '@/layout',
    children: [
      {
        path: 'index',
        component: '@/views/components/company/lcc',
        name: 'Unit',
        meta: { title: '实时监控', icon: 'eye_fill', affix: true }
      }
    ]
  },
  {
    path: '/apply',
    component: '@/layout',
    // redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: '空域计划',
      icon: 'fly',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'yhl',
        component: '@/views/components/company/yhl',
        name: 'Yhl',
        meta: {
          title: '空域申请',
          roles: ['admin'],
          affix: true
        }
      },
      {
        path: 'tl',
        component: '@/views/components/company/tl',
        name: 'Tl',
        meta: {
          title: '计划申请',
          roles: ['admin'],
          affix: true
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
