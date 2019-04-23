import * as API from './'

export default {
    //获取订单列表
    GetOrderList:params => {
        return API.GET('/order/order/list',params)
    },

    //删除订单
    DeleteOrderList:params => {
        return API.DELETE('/order/order/remove',params)
    },
    
    //批量删除
    batchRemoveOrderList:params =>{
        return API.DELETE('/order/order/batchRemove',params)
    },

    //订单日志
    GetOrderLog:params => {
        return API.GET('/order/orderLog/list',params)
    },

    //订单日志删除
    DeleteOrderLog:params => {
        return API.GET('/order/orderLog/remove',params)
    },

    //订单日志批量删除
    batchRemovOrderLog:params => {
        return API.GET('/order/orderLog/batchRemove',params)
    }
}