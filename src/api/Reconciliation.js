import request from '@/utils/request'
/**
 *  日期范围之内的合作商分成汇总数据
 * @param {Object} data 请求对象
 * @returns promise
 */
export const getCollectSearch = (data) => {
  return request({
    url: '/api/order-service/report/partnerCollect',
    params: {
      pageSize: 10,
      ...data
    }
  })
}

/**
 *  分成总数
 * @param {Object} params 请求对象
 * @returns promise
 */
export const getseparate = (params) => {
  return request({
    url: '/api/order-service/report/totalBill',
    params
  })
}

/**
 *  收入
 * @param {Object} params 请求对象
 * @returns promise
 */
export const getearning = (params) => {
  return request({
    url: '/api/order-service/report/orderAmount',
    params
  })
}

/**
 *  订单总数
 * @param {Object} params 请求对象
 * @returns promise
 */
export const getOrdersTotal = (params) => {
  return request({
    url: '/api/order-service/report/orderCount',
    params
  })
}

