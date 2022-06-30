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
        remoteEntry: '/lcc/entry.html',
        remoteComponent: 'test',
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
        path: 'airspace_manage',
        remoteEntry: '/yhl/entry.html',
        remoteComponent: 'airspaceManage',
        name: 'AirspaceManage',
        meta: {
          title: '空域管理',
          roles: ['admin'],
          affix: false
        }
      },
      {
        path: 'airspace_apply',
        remoteEntry: '/yhl/entry.html',
        remoteComponent: 'airspaceApply',
        name: 'AirspaceApply',
        meta: {
          title: '空域申请',
          roles: ['admin'],
          affix: false
        }
      },
      {
        path: 'user',
        remoteEntry: '/yhl/entry.html',
        remoteComponent: 'user',
        name: 'User',
        meta: {
          title: '用户管理',
          roles: ['admin'],
          affix: false
        }
      }
      // {
      //   path: 'aside',
      //   component: '@/views/components/test',
      //   name: 'Aside',
      //   meta: { title: 'Aside', affix: true, noCache: false }
      // }
    ]
  },
  {
    path: '/cesium',
    component: '@/layout',
    // redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: '三维地球',
      icon: 'component', // fighter
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'tl',
        remoteEntry: '/tl/entry.html',
        remoteComponent: 'test',
        name: 'Tl',
        meta: {
          title: 'cesium',
          roles: ['admin'],
          affix: false
        }
      },
      {
        path: 'aside',
        component: '@/views/components/test',
        name: 'Aside',
        meta: { title: 'Aside', affix: true, noCache: false }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
