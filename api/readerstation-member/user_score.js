import request from '@/utils/request'

// 查询用户积分列表
export function listUser_score(query) {
  return request({
    url: '/readerstation-member/user_score/list',
    method: 'get',
    params: query
  })
}

// 查询用户积分详细
export function getUser_score(userId) {
  return request({
    url: '/readerstation-member/user_score/' + userId,
    method: 'get'
  })
}

// 新增用户积分
export function addUser_score(data) {
  return request({
    url: '/readerstation-member/user_score',
    method: 'post',
    data: data
  })
}

// 修改用户积分
export function updateUser_score(data) {
  return request({
    url: '/readerstation-member/user_score',
    method: 'put',
    data: data
  })
}

// 删除用户积分
export function delUser_score(userId) {
  return request({
    url: '/readerstation-member/user_score/' + userId,
    method: 'delete'
  })
}
