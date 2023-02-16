import request from '@/utils/request'

// 查询分-级映射列表
export function listLevelscoremap(query) {
  return request({
    url: '/readerstation-member/levelscoremap/list',
    method: 'get',
    params: query
  })
}

// 查询分-级映射详细
export function getLevelscoremap(id) {
  return request({
    url: '/readerstation-member/levelscoremap/' + id,
    method: 'get'
  })
}

// 新增分-级映射
export function addLevelscoremap(data) {
  return request({
    url: '/readerstation-member/levelscoremap',
    method: 'post',
    data: data
  })
}

// 修改分-级映射
export function updateLevelscoremap(data) {
  return request({
    url: '/readerstation-member/levelscoremap',
    method: 'put',
    data: data
  })
}

// 删除分-级映射
export function delLevelscoremap(id) {
  return request({
    url: '/readerstation-member/levelscoremap/' + id,
    method: 'delete'
  })
}
