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
// 获取人员列表
export const GetPeopleList = () => {
  return request({
    url: '/api/user-service/user/search',
    params: {
      isRepair: false
    }
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

