import request from '@/utils/request'
/**
 *  合作商搜索
 * @param {Object} policy 请求对象
 * @returns promise
 */
export const getPartnerSearch = (data) => {
  return request({
    url: '/api/user-service/partner/search',
    params: {
      pageIndex: 1,
      pageSize: 10,
      ...data
    }
  })
}
