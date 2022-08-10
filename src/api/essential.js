import request from '@/utils/request'

// 获取用户基本信息
// /api/user-service/user/:id
export const getUserIdApi = (id) => {
    return request({
        url: `/api/user-service/user/${id}`
    })
}

// 获取用户工作量(工单统计)
// /api/task-service/task/userWork
export const getUserWorkApi = () => {
  return request({
    url: '/api/task-service/task/userWork'
  })
}

// 人员搜索(列表页)
// /api/user-service/user/search
export const getSearchApi = (params) => {
  return request({
    url: '/api/user-service/user/search',
    params
  })
}

// 人员工作量列表
// /api/user-service/user/searchUserWork
export const getUserSearchUserWork = (params) => {
  return request({
    url: '/api/user-service/user/searchUserWork',
    params
  })
}

// 角色列表
// /api/user-service/role
export const getUserRoleApi = (params) => {
    return request({
        url: '/api/user-service/role',
        params
    })
}

// 区域列表
// /api/vm-service/region/search
export const getUserRegionSearchApi = (params) => {
    return request({
        url: '/api/vm-service/region/search',
        params
    })
}

// 删除人员
// /api/user-service/user/:id
// DELETE
export const deleteUserIDApi = (id) => {
    return request({
        url: '/api/user-service/user/' + id,
        method: 'DELETE'
    })
}

// 新增人员
// /api/user-service/user
export const postUserApi = (data) => {
    return request({
        url: '/api/user-service/user',
        data
    })
}

// 修改人员
// /api/user-service/user/:id
export const putUserIDApi = (data) => {
    return request({
        url: `/api/user-service/user/${data.id}`,
        method: 'PUT',
        data
    })
}

// 根据售货机获取运营人员列表
// /api/user-service/user/operatorList/:innerCode
export const getOperatorListApi = (innerCode) => {
    return request({
        url: '/api/user-service/user/operatorList/' + innerCode,
    })
}