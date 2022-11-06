import request from '@/utils/request'

// 查询用户等级积分映射列表
export function listLevelscoremap(query) {
  return request({
    url: '/center/levelscoremap/list',
    method: 'get',
    params: query
  })
}

// 查询用户等级积分映射详细
export function getLevelscoremap(id) {
  return request({
    url: '/center/levelscoremap/' + id,
    method: 'get'
  })
}

// 新增用户等级积分映射
export function addLevelscoremap(data) {
  return request({
    url: '/center/levelscoremap',
    method: 'post',
    data: data
  })
}

// 修改用户等级积分映射
export function updateLevelscoremap(data) {
  return request({
    url: '/center/levelscoremap',
    method: 'put',
    data: data
  })
}

// 删除用户等级积分映射
export function delLevelscoremap(id) {
  return request({
    url: '/center/levelscoremap/' + id,
    method: 'delete'
  })
}
