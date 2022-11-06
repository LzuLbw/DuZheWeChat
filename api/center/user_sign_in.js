import request from '@/utils/request'

// 查询用户签到列表
export function listUser_sign_in(query) {
  return request({
    url: '/center/user_sign_in/list',
    method: 'get',
    params: query
  })
}

// 查询用户签到详细
export function getUser_sign_in(id) {
  return request({
    url: '/center/user_sign_in/' + id,
    method: 'get'
  })
}

// 新增用户签到
export function addUser_sign_in(data) {
  return request({
    url: '/center/user_sign_in',
    method: 'post',
    data: data
  })
}

// 修改用户签到
export function updateUser_sign_in(data) {
  return request({
    url: '/center/user_sign_in',
    method: 'put',
    data: data
  })
}

// 删除用户签到
export function delUser_sign_in(id) {
  return request({
    url: '/center/user_sign_in/' + id,
    method: 'delete'
  })
}
