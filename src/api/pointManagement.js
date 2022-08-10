import request from '@/utils/request'

// 点位管理——区域列表
export const areaList = (params) =>
  request({
    url: '/api/vm-service/region/search',
    params
  })
// 点位管理——新增区域
export const newArea = (data) =>
  request({
    url: '/api/vm-service/region',
    method: 'POST',
    data
  })
// 点位管理——修改区域
export const modifyArea = (data, id) =>
  request({
    url: '/api/vm-service/region/' + id,
    method: 'PUT',
    data
  })
// 点位管理——删除区域
export const deleteArea = (regionId) =>
  request({
    url: '/api/vm-service/region/' + regionId,
    method: 'DELETE'
  })
// 点位管理——点位搜索
// export const getAreaDetails = (params) =>
//   request({
//     url: '/api/vm-service/node/search',
//     params: {
//       regionId
//     }
//   })

// 点位管理——点位搜索
export const pointSearch = (params) =>
  request({
    url: '/api/vm-service/node/search',
    params
  })
// 点位管理——新增点位
export const newPoint = (data) =>
  request({
    url: '/api/vm-service/node',
    method: 'POST',
    data
  })
// 点位管理——合作商搜索
export const partnerSearch = (params) =>
  request({
    url: '/api/user-service/partner/search',
    params
  })
// 点位管理——商圈列表
export const businessDistrictList = () =>
  request({
    url: '/api/vm-service/businessType'
  })
// 点位管理——点位详情
export const getPointDeatails = (id) =>
  request({
    url: '/api/vm-service/node/vmList/' + id
  })
// 点位管理——修改点位
export const modifyPoint = (data, id) =>
  request({
    url: '/api/vm-service/node/' + id,
    method: 'PUT',
    data
  })
// 点位管理——删除点位
export const deletePoint = (id) =>
  request({
    url: '/api/vm-service/node/' + id,
    method: 'DELETE'
  })
