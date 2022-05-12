import request from '@/utils/request2'

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
