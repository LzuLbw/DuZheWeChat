import request from '@/utils/request'

// 查询提现记录列表
export function listUser_withdraw_cash_list(query) {
  return request({
    url: '/center/user_withdraw_cash_list/list',
    method: 'get',
    params: query
  })
}

// 查询提现记录详细
export function getUser_withdraw_cash_list(id) {
  return request({
    url: '/center/user_withdraw_cash_list/' + id,
    method: 'get'
  })
}

// 新增提现记录
export function addUser_withdraw_cash_list(data) {
  return request({
    url: '/center/user_withdraw_cash_list',
    method: 'post',
    data: data
  })
}

// 修改提现记录
export function updateUser_withdraw_cash_list(data) {
  return request({
    url: '/center/user_withdraw_cash_list',
    method: 'put',
    data: data
  })
}

// 删除提现记录
export function delUser_withdraw_cash_list(id) {
  return request({
    url: '/center/user_withdraw_cash_list/' + id,
    method: 'delete'
  })
}
