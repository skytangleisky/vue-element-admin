import request from '@/utils/request3'
/*
export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    headers: { 'Content-Type': 'application/json' },
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    headers: { 'Content-Type': 'application/json' },
    method: 'post'
  })
}*/

// export function login (data) {
//   return request({
//     url: 'libs/db/src/login.php',
//     method: 'post',
//     data
//   })
// }

// export function getInfo (token) {
//   return request({
//     url: 'libs/db/src/login.php',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout () {
//   const data = { 'logout': 'true' }
//   return request({
//     url: 'libs/db/src/login.php',
//     method: 'post',
//     data
//   })
// }

export function paging(query) {
  console.log('???')
  if (query.order) {
    return request({
      url: 'db/userinfo',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'select': ['*'],
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': [
          {
            'field': query.field,
            'order': query.order
          }
        ]
      }
    })
  } else {
    return request({
      url: 'db/userinfo',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'select': ['*'],
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': [
          {
            'field': 'updatetime',
            'order': 'DESC'
          }
        ]
      }
    })
  }
}

export function save(data) {
  return request({
    url: 'db/userinfo',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    data
  })
}

export function del(data) {
  return request({
    url: 'db/userinfo',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete',
    data
  })
}
