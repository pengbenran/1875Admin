import * as API from './'

export default {
    //提现列表
    GetPayList:params => {
        return API.GET('/member/withdrawApply/list',params)
    },

    //提现审核
    applyPay:params => {
        return API.POST('/member/withdrawApply/status',params)
    }

}