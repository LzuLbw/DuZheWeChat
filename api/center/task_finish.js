import request from '@/utils/request'

// 查询完成记录列表
export function listTask_finish(query) {
  return request({
    url: '/center/task_finish/list',
    method: 'get',
    params: query
  })
}

// 查询完成记录详细
export function getTask_finish(id) {
  return request({
    url: '/center/task_finish/' + id,
    method: 'get'
  })
}


// 查询今天是否签到
export function ifSign_in(id) {
  return request({
    url: '/center/task_finish/if/' + id,
    method: 'get'
  })
}

// 新增完成记录
export function addTask_finish(data) {
  return request({
    url: '/center/task_finish',
    method: 'post',
    data: data
  })
}

// 修改完成记录
export function updateTask_finish(data) {
  return request({
    url: '/center/task_finish',
    method: 'put',
    data: data
  })
}

// 删除完成记录
export function delTask_finish(id) {
  return request({
    url: '/center/task_finish/' + id,
    method: 'delete'
  })
}
