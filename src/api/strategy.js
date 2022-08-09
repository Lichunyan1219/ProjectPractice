import request from '@/utils/request'
/**
 *  策略搜索
 * @param {Object} policy 请求对象
 * @returns promise
 */
export const getPolicySearch = (params) => {
  return request({
    url: '/api/vm-service/policy/search',
    params
  })
}

/**
 *  删除策略
 * @param {string} policyId
 * @returns promise
 */
export const removerePolicy = (policyId) => {
  return request({
    url: `/api/vm-service/policy/${policyId}`,
    method: 'DELETE'
  })
}

/**
 *  添加策略
 * @param {Object} data
 * @returns promise
 */
export const addPolicy = (data) => {
  return request({
    url: '/api/vm-service/policy',
    method: 'POST',
    data
  })
}

/**
 *  修改策略
 * @param {Object} data
 * @returns promise
 */
export const amendPolicy = (data, policyId) => {
  return request({
    url: `/api/vm-service/policy/${policyId}`,
    method: 'PUT',
    data
  })
}

/**
 *  策略详情
 * @param {Object} data
 * @returns promise
 */
export const Strategiesdetails = (policyId, params) => {
  return request({
    url: `/api/vm-service/policy/vmList/${policyId}`,
    params
  })
}

/**
 *  策略搜索
 * @param {Object} policy 请求对象
 * @returns promise
 */
export const getIndentSearch = (params) => {
  return request({
    url: '/api/order-service/order/search',
    params
  })
}
