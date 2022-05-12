import request from '@/utils/request'

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
    method: 'get'
    // params: { token }
  })
}
export function logout() {
  const data = { 'logout': 'true' }
  return request({
    url: 'libs/db/src/login.php',
    method: 'delete',
    data
  })
}
