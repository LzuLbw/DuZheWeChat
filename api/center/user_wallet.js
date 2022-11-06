import request from '@/utils/request'

// 查询用户钱包列表
export function listUser_wallet(query) {
  return request({
    url: '/center/user_wallet/list',
    method: 'get',
    params: query
  })
}

// 查询用户钱包详细
export function getUser_wallet(userId) {
  return request({
    url: '/center/user_wallet/' + userId,
    method: 'get'
  })
}

// 新增用户钱包
export function addUser_wallet(data) {
  return request({
    url: '/center/user_wallet',
    method: 'post',
    data: data
  })
}

// 修改用户钱包
export function updateUser_wallet(data) {
  return request({
    url: '/center/user_wallet',
    method: 'put',
    data: data
  })
}

// 删除用户钱包
export function delUser_wallet(userId) {
  return request({
    url: '/center/user_wallet/' + userId,
    method: 'delete'
  })
}
