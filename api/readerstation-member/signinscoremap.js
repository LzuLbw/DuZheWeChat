import request from '@/utils/request'

// 查询七天签到列表
export function listSigninscoremap(query) {
  return request({
    url: '/readerstation-member/signinscoremap/list',
    method: 'get',
    params: query
  })
}

// 查询七天签到详细
export function getSigninscoremap(id) {
  return request({
    url: '/readerstation-member/signinscoremap/' + id,
    method: 'get'
  })
}

// 新增七天签到
export function addSigninscoremap(data) {
  return request({
    url: '/readerstation-member/signinscoremap',
    method: 'post',
    data: data
  })
}

// 修改七天签到
export function updateSigninscoremap(data) {
  return request({
    url: '/readerstation-member/signinscoremap',
    method: 'put',
    data: data
  })
}

// 删除七天签到
export function delSigninscoremap(id) {
  return request({
    url: '/readerstation-member/signinscoremap/' + id,
    method: 'delete'
  })
}
