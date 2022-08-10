import request from '@/utils/request'
// 获取销售额
export const GetSales = (start, end) => {
  return request({
    url: `/api/order-service/report/orderAmount/`,
    params: {
      start: start,
      end: end
    }
  })
}
// 获取
export const GetOrderQuantity = (start, end) => {
  return request({
    url: `/api/order-service/report/orderCount/`,
    params: {
      start: start,
      end: end
    }
  })
}
// 获取工单列表
export const getWorkOrderList = (params) => {
  return request({
    url: '/api/task-service/task/search',
    params
  })
}
// 获取排行榜
export const GetLeadErboard = (start, end) => {
  return request({
    url: `/api/order-service/report/skuTop/10/${start}/${end}`
  })
}
