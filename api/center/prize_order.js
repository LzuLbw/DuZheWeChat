import request from '@/utils/request'

// 查询奖品兑换订单列表
export function listPrize_order(query) {
  return request({
    url: '/center/prize_order/list',
    method: 'get',
    params: query
  })
}

// 查询奖品兑换订单详细
export function getPrize_order(id) {
  return request({
    url: '/center/prize_order/' + id,
    method: 'get'
  })
}

// 新增奖品兑换订单
export function addPrize_order(data) {
  return request({
    url: '/center/prize_order',
    method: 'post',
    data: data
  })
}

// 修改奖品兑换订单
export function updatePrize_order(data) {
  return request({
    url: '/center/prize_order',
    method: 'put',
    data: data
  })
}

// 删除奖品兑换订单
export function delPrize_order(id) {
  return request({
    url: '/center/prize_order/' + id,
    method: 'delete'
  })
}
