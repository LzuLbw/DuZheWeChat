import request from '@/utils/request'

// 查询奖品管理列表
export function listPrize(query) {
  return request({
    url: '/readerstation-member/prize/list',
    method: 'get',
    params: query
  })
}

// 查询奖品管理详细
export function getPrize(id) {
  return request({
    url: '/readerstation-member/prize/' + id,
    method: 'get'
  })
}

// 新增奖品管理
export function addPrize(data) {
  return request({
    url: '/readerstation-member/prize',
    method: 'post',
    data: data
  })
}

// 修改奖品管理
export function updatePrize(data) {
  return request({
    url: '/readerstation-member/prize',
    method: 'put',
    data: data
  })
}

// 删除奖品管理
export function delPrize(id) {
  return request({
    url: '/readerstation-member/prize/' + id,
    method: 'delete'
  })
}
