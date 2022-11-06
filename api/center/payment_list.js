import request from '@/utils/request'

// 查询支付记录列列表
export function listPayment_list(query) {
  return request({
    url: '/center/payment_list/list',
    method: 'get',
    params: query
  })
}

// 查询支付记录列详细
export function getPayment_list(id) {
  return request({
    url: '/center/payment_list/' + id,
    method: 'get'
  })
}

// 新增支付记录列
export function addPayment_list(data) {
  return request({
    url: '/center/payment_list',
    method: 'post',
    data: data
  })
}

// 修改支付记录列
export function updatePayment_list(data) {
  return request({
    url: '/center/payment_list',
    method: 'put',
    data: data
  })
}

// 删除支付记录列
export function delPayment_list(id) {
  return request({
    url: '/center/payment_list/' + id,
    method: 'delete'
  })
}
