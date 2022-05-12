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
  },
  {
    path: '',
    component: '@/layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: '@/views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: '@/layout',
    children: [
      {
        path: 'index',
        component: '@/views/documentation/index',
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: '@/layout',
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: '@/views/guide/index',
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
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
        meta: { title: 'Unit', icon: 'fighter', affix: true }
      }
    ]
  },
  {
    path: '/amap',
    component: '@/layout',
    children: [
      {
        path: 'index',
        component: '@/views/amap/index',
        name: 'AMap',
        meta: { title: 'AMap', icon: 'position', affix: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
