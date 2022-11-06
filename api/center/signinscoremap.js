import request from '@/utils/request'

// 查询七天连续签到天数与获得积分映射列表
export function listSigninscoremap(query) {
  return request({
    url: '/center/signinscoremap/list',
    method: 'get',
    params: query
  })
}

// 查询七天连续签到天数与获得积分映射详细
export function getSigninscoremap(id) {
  return request({
    url: '/center/signinscoremap/' + id,
    method: 'get'
  })
}

// 新增七天连续签到天数与获得积分映射
export function addSigninscoremap(data) {
  return request({
    url: '/center/signinscoremap',
    method: 'post',
    data: data
  })
}

// 修改七天连续签到天数与获得积分映射
export function updateSigninscoremap(data) {
  return request({
    url: '/center/signinscoremap',
    method: 'put',
    data: data
  })
}

// 删除七天连续签到天数与获得积分映射
export function delSigninscoremap(id) {
  return request({
    url: '/center/signinscoremap/' + id,
    method: 'delete'
  })
}
