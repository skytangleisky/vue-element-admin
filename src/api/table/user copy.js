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

export function login(data) {
  return request({
    url: 'libs/db/src/login.php',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'libs/db/src/login.php',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  const data = { 'logout': 'true' }
  return request({
    url: 'libs/db/src/login.php',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  if (query.sort === '+id') {
    return request({
      url: 'libs/db/src/expection.php',
      method: 'post',
      data: {
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': [{ 'field': 'id', 'order': 'ASC' }]
      }
    })
  } else if (query.sort === '-id') {
    return request({
      url: 'libs/db/src/expection.php',
      method: 'post',
      data: {
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': [{ 'field': 'id', 'order': 'DESC' }]
      }
    })
  } else {
    return request({
      url: 'libs/db/src/expection.php',
      method: 'post',
      data: {
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': []
      }
    })
  }
}

export function fetchUser(id) {
  return request({
    url: 'libs/db/src/expection.php',
    method: 'get',
    params: { id }
  })
}

export function createUser(data) {
  return request({
    url: 'libs/db/src/expection.php',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: 'libs/db/src/expection.php',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: 'libs/db/src/expection.php',
    method: 'delete',
    data
  })
}

