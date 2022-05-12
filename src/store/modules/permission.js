// import { constantRoutes } from '@/router'
import { getRoutes } from '@/api/role'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) tmp.children = filterAsyncRoutes(tmp.children, roles)
      if (typeof tmp.component === 'string') {
        // tmp.component = tmp.component.replaceAll('\\', '/')
        if (tmp.component.indexOf('../../views') === 0) res.push({ ...tmp, ...{ component: resolve => require(['../../views' + tmp.component.replace(RegExp(`^../../views`), '')], resolve) }})
        else if (tmp.component.indexOf('../../layout') === 0) res.push({ ...tmp, ...{ component: resolve => require(['../../layout' + tmp.component.replace(RegExp(`^../../layout`), '')], resolve) }})
        else if (tmp.component.indexOf('/src/views') === 0) res.push({ ...tmp, ...{ component: resolve => require(['/src/views' + tmp.component.replace(RegExp(`^/src/views`), '')], resolve) }})
        else if (tmp.component.indexOf('/src/layout') === 0) res.push({ ...tmp, ...{ component: resolve => require(['/src/layout' + tmp.component.replace(RegExp(`^/src/layout`), '')], resolve) }})
        else if (tmp.component.indexOf('@/views') === 0) res.push({ ...tmp, ...{ component: resolve => require(['@/views' + tmp.component.replace(RegExp(`^@/views`), '')], resolve) }})
        else if (tmp.component.indexOf('@/layout') === 0) res.push({ ...tmp, ...{ component: resolve => require(['@/layout' + tmp.component.replace(RegExp(`^@/layout`), '')], resolve) }})
        else console.error(`The string path "${tmp.component}" of the component must be under the "@/views" or "@/layout" or "/src/views" or "/src/layout" or "../../views" or "../../layout" path`)
      } else res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getRoutes().then(res => {
        const asyncRoutes = res.data
        const accessedRoutes = asyncRoutes && filterAsyncRoutes(asyncRoutes, roles) || []
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
