import request from '@/utils/request2'

export function fetchList(query) {
  console.log(query)
  if (query.sort === '+id') {
    return request({
      url: 'libs/db/src/data.php',
      method: 'post',
      data: {
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': [{ 'field': 'id', 'order': 'ASC' }]
      }
    })
  } else if (query.sort === '-id') {
    return request({
      url: 'libs/db/src/data.php',
      method: 'post',
      data: {
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': [{ 'field': 'id', 'order': 'DESC' }]
      }
    })
  } else {
    return request({
      url: 'libs/db/src/data.php',
      method: 'post',
      data: {
        'offset': (query.page - 1) * query.limit,
        'limit': query.limit,
        'orderby': []
      }
    })
  }
}

export function fetchData(id) {
  return request({
    url: 'libs/db/src/data.php',
    method: 'get',
    params: { id }
  })
}

export function createData(data) {
  return request({
    url: 'libs/db/src/data.php',
    method: 'post',
    data
  })
}

export function updateData(data) {
  return request({
    url: 'libs/db/src/data.php',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    url: 'libs/db/src/data.php',
    method: 'delete',
    data
  })
}
