// 对账管理接口
import request from '@/utils/request'

// 获取一定时间范围内的订单总数
export const getOrderCount = (params)=>{
    return request({
        url:'/api/order-service/report/orderCount',
        params
    })
}

// 获取一定时间范围之内的收入
export const getorderAmount = (params)=>{
    return request({
        url:'/api/order-service/report/orderAmount',
        params
    })
}