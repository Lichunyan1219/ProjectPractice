import request from '@/utils/request'

export const OperationsStaff = (id) => {
  return request({
    url: '/api/user-service/user/repairerList/' + id
  })
}
