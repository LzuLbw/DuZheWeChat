import request from '@/utils/request'

// 查询任务完成列表
export function listTask_finish(query) {
  return request({
    url: '/readerstation-member/task_finish/list',
    method: 'get',
    params: query
  })
}

// 查询任务完成详细
export function getTask_finish(id) {
  return request({
    url: '/readerstation-member/task_finish/' + id,
    method: 'get'
  })
}

// 新增任务完成
export function addTask_finish(data) {
  return request({
    url: '/readerstation-member/task_finish',
    method: 'post',
    data: data
  })
}

// 修改任务完成
export function updateTask_finish(data) {
  return request({
    url: '/readerstation-member/task_finish',
    method: 'put',
    data: data
  })
}

// 删除任务完成
export function delTask_finish(id) {
  return request({
    url: '/readerstation-member/task_finish/' + id,
    method: 'delete'
  })
}
