import request from '@/utils/request'

// 查询钱包流水列表
export function listUser_wallet_log(query) {
  return request({
    url: '/readerstation-member/user_wallet_log/list',
    method: 'get',
    params: query
  })
}

// 查询钱包流水详细
export function getUser_wallet_log(id) {
  return request({
    url: '/readerstation-member/user_wallet_log/' + id,
    method: 'get'
  })
}

// 新增钱包流水
export function addUser_wallet_log(data) {
  return request({
    url: '/readerstation-member/user_wallet_log',
    method: 'post',
    data: data
  })
}

// 修改钱包流水
export function updateUser_wallet_log(data) {
  return request({
    url: '/readerstation-member/user_wallet_log',
    method: 'put',
    data: data
  })
}

// 删除钱包流水
export function delUser_wallet_log(id) {
  return request({
    url: '/readerstation-member/user_wallet_log/' + id,
    method: 'delete'
  })
}
