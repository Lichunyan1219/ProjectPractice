import request from '@/utils/request'

// 获取用户基本信息
// /api/user-service/user/:id
// export const getUserIdApi = (id) => {
//     return request({
//         url: `/api/user-service/user/${id}`
//     })
// }

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