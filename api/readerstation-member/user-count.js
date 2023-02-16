import request from '@/utils/request'

// 查询用户账户列表
export function listUser-count(query) {
  return request({
    url: '/readerstation-member/user-count/list',
    method: 'get',
    params: query
  })
}

// 查询用户账户详细
export function getUser-count(userId) {
  return request({
    url: '/readerstation-member/user-count/' + userId,
    method: 'get'
  })
}

// 新增用户账户
export function addUser-count(data) {
  return request({
    url: '/readerstation-member/user-count',
    method: 'post',
    data: data
  })
}

// 修改用户账户
export function updateUser-count(data) {
  return request({
    url: '/readerstation-member/user-count',
    method: 'put',
    data: data
  })
}

// 删除用户账户
export function delUser-count(userId) {
  return request({
    url: '/readerstation-member/user-count/' + userId,
    method: 'delete'
  })
}
