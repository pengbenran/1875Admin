import * as API from './'

export default {
    //商品分类添加
    AddGoodsCat:params => {
        return API.POST('/good/goodCat/save',params)
    },

    //获取商品分类列表
    GetGoodsCat:params => {
        return API.GET('/good/goodCat/list',params)
    },

    //商品分类删除
    DeleteGoodsCat:params => {
        return API.DELETE('/good/goodCat/remove',params)
    },

    //商品分类修改
    UpdataGoodsCat:params => {
        return API.PUT('/good/goodCat/update',params)
    },

    //批量删除
    BatchRemoveGoodsCat:params => {
        return API.DELETE('/good/goodCat/batchRemove',params)
    }

}