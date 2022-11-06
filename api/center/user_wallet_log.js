import request from '@/utils/request'

// 查询用户钱包流水记录列表
export function listUser_wallet_log(query) {
  return request({
    url: '/center/user_wallet_log/list',
    method: 'get',
    params: query
  })
}

// 查询用户钱包流水记录详细
export function getUser_wallet_log(id) {
  return request({
    url: '/center/user_wallet_log/' + id,
    method: 'get'
  })
}

// 新增用户钱包流水记录
export function addUser_wallet_log(data) {
  return request({
    url: '/center/user_wallet_log',
    method: 'post',
    data: data
  })
}

// 修改用户钱包流水记录
export function updateUser_wallet_log(data) {
  return request({
    url: '/center/user_wallet_log',
    method: 'put',
    data: data
  })
}

// 删除用户钱包流水记录
export function delUser_wallet_log(id) {
  return request({
    url: '/center/user_wallet_log/' + id,
    method: 'delete'
  })
}
