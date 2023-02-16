import request from '@/utils/request'

// 查询奖品兑换列表
export function listPrize_order(query) {
  return request({
    url: '/readerstation-member/prize_order/list',
    method: 'get',
    params: query
  })
}

// 查询奖品兑换详细
export function getPrize_order(id) {
  return request({
    url: '/readerstation-member/prize_order/' + id,
    method: 'get'
  })
}

// 新增奖品兑换
export function addPrize_order(data) {
  return request({
    url: '/readerstation-member/prize_order',
    method: 'post',
    data: data
  })
}

// 修改奖品兑换
export function updatePrize_order(data) {
  return request({
    url: '/readerstation-member/prize_order',
    method: 'put',
    data: data
  })
}

// 删除奖品兑换
export function delPrize_order(id) {
  return request({
    url: '/readerstation-member/prize_order/' + id,
    method: 'delete'
  })
}
