import request from '@/utils/request'
// 合作商搜索
export const PartnerSearch = (params) => {
  return request({
    url: ' /api/user-service/partner/search',
    params
  })
}
// 重置合作商密码
export const ResetPassword = (id) => {
  return request({
    url: '/api/user-service/partner/resetPwd/' + id,
    method: 'PUT'
  })
}
// 删除合作商
export const DeletePartner = (id) => {
  return request({
    url: '/api/user-service/partner/' + id,
    method: 'DELETE'
  })
}
// 新增合作商
export const AddPartner = (data) => {
  return request({
    url: '/api/user-service/partner',
    method: 'POST',
    data: data
  })
}
// 修改合作商
export const ModifyPartners = (id, data) => {
  return request({
    url: '/api/user-service/partner/' + id,
    method: 'PUT',
    data
  })
}
