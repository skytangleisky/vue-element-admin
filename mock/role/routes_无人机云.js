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
        component: '@/views/components/company/yhl/dev',
        name: 'Dev',
        meta: {
          title: 'YHL',
          roles: ['admin'],
          affix: true
        }
      },
      {
        path: 'airspace_manage',
        component: '@/views/components/company/yhl/airspace_manage',
        name: 'airspace-manage',
        meta: {
          title: '空域管理',
          roles: ['admin'],
          affix: true
        }
      },
      {
        path: 'airspace_apply',
        component: '@/views/components/company/yhl/airspace_apply',
        name: 'airspace-apply',
        meta: {
          title: '空域申请',
          roles: ['admin'],
          affix: true
        }
      },
      {
        path: 'user',
        component: '@/views/components/company/yhl/user',
        name: 'user',
        meta: {
          title: '用户管理',
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
