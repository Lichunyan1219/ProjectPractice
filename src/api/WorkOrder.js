import request from '@/utils/request'
// 获取工单状态
export const getWorkOrderStatus = () => {
  return request({
    url: '/api/task-service/task/allTaskStatus'
  })
}
// 获取工单列表
export const getWorkOrderList = (params) => {
  return request({
    url: '/api/task-service/task/search',
    params
  })
}
// 获取工单类型
export const getWorkOrderType = () => {
  return request({
    url: '/api/task-service/taskType/list'
  })
}
// 创建工单
export const CreateWorkOrder = (data) => {
  return request({
    url: '/api/task-service/task/create',
    method: 'POST',
    data
  })
}
// 获取工单预警值
export const GetWorkOrderAlert = () => {
  return request({
    url: '/api/task-service/task/supplyAlertValue/'
  })
}
// 设置自动补货预警
export const SetUpAutomaticReplenishmentWarn = (alertValue) => {
  return request({
    url: '/api/task-service/task/autoSupplyConfig',
    method: 'POST',
    data: {
      alertValue
    }
  })
}
// 获取补货详情
export const GetReplenishmentDetails = (taskId) => {
  return request({
    url: `/api/vm-service/channel/channelList/${taskId}`
  })
}

