import request from '@/utils/request'
// 搜索商品列表
export const getCommodityList = (params) => {
  return request({
    url: '/api/vm-service/sku/search',
    params
  })
}
// 获取商品类型
export const getCommodityType = (params) => {
  return request({
    url: '/api/vm-service/skuClass/search',
    params
  })
}
// 上传图片
export const setPictureUpload = (file) => {
  return request({
    url: '/api/vm-service/sku/fileUpload',
    method: 'POST',
    data: file
  })
}
// 新增商品
export const setCommodity = (data) => {
  return request({
    url: '/api/vm-service/sku',
    method: 'POST',
    data
  })
}
// 修改商品
export const ModifyItem = (id, data) => {
  return request({
    url: '/api/vm-service/sku/' + id,
    method: 'PUT',
    data
  })
}
// 新增商品类型
export const setNewItemType = (data) => {
  return request({
    url: '/api/vm-service/skuClass',
    method: 'POST',
    data
  })
}
// 修改商品类型
export const ModifyItemType = (id, data) => {
  return request({
    url: '/api/vm-service/skuClass/' + id,
    method: 'PUT',
    data
  })
}
// 删除商品类型
export const DeleteItemType = (id) => {
  return request({
    url: '/api/vm-service/skuClass/' + id,
    method: 'DELETE'
  })
}
// 商品数据导入
export const CommodityDataImport = (data) => {
  return request({
    url: '/api/vm-service/sku/upload',
    method: 'POST',
    data
  })
}
