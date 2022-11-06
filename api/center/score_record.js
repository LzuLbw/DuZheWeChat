import request from '@/utils/request'

// 查询积分记录列表
export function listScore_record(query) {
  return request({
    url: '/center/score_record/list',
    method: 'get',
    params: query
  })
}

// 查询积分记录详细
export function getScore_record(id) {
  return request({
    url: '/center/score_record/' + id,
    method: 'get'
  })
}

// 新增积分记录
export function addScore_record(data) {
  return request({
    url: '/center/score_record',
    method: 'post',
    data: data
  })
}

// 修改积分记录
export function updateScore_record(data) {
  return request({
    url: '/center/score_record',
    method: 'put',
    data: data
  })
}

// 删除积分记录
export function delScore_record(id) {
  return request({
    url: '/center/score_record/' + id,
    method: 'delete'
  })
}
