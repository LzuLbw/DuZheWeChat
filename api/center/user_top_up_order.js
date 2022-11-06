import request from '@/utils/request'

// 查询充值订单列表
export function listUser_top_up_order(query) {
  return request({
    url: '/center/user_top_up_order/list',
    method: 'get',
    params: query
  })
}

// 查询充值订单详细
export function getUser_top_up_order(id) {
  return request({
    url: '/center/user_top_up_order/' + id,
    method: 'get'
  })
}

// 新增充值订单
export function addUser_top_up_order(data) {
  return request({
    url: '/center/user_top_up_order',
    method: 'post',
    data: data
  })
}

// 修改充值订单
export function updateUser_top_up_order(data) {
  return request({
    url: '/center/user_top_up_order',
    method: 'put',
    data: data
  })
}

// 删除充值订单
export function delUser_top_up_order(id) {
  return request({
    url: '/center/user_top_up_order/' + id,
    method: 'delete'
  })
}
