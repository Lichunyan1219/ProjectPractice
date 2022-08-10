import request from '@/utils/request'

// 图片上传
export const getPhoto = (data) => {
  return request({
    method: 'POST',
    url: '/api/vm-service/sku/fileUpload',
    data
  })
}
