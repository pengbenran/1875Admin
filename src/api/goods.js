import * as API from './'

export default {
    //商品添加
    AddGoods:params => {
        return API.POST('/good/good/save',params)
    },

    //商品列表
    GoodsList:params => {
        return API.GET('/good/good/list',params)
    },

    //商品分类修改
    UpdataGoods:params => {
        return API.PUT('/good/good/update',params)
    },

    //批量删除
    BatchRemoveGoods:params => {
        return API.DELETE('/good/good/batchRemove',params)
    },

    //商品删除
    DeleteGood:params => {
        return API.DELETE('/good/good/remove',params)
    },

    
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