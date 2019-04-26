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
    },



    //获取店铺列表
    GetShopList:params => {
        return API.GET('/good/shop/list',params)
    },

    //添加店铺
    AddShop:params => {
        return API.POST('/good/shop/save',params)
    },

    
    //店铺修改
    UpdataShop:params => {
        return API.PUT('/good/shop/update',params)
    },

    //店铺删除
    DeleteShop:params => {
        return API.DELETE('/good/shop/remove',params)
    },

    //批量删除
    BatchRemoveShop:params => {
        return API.DELETE('/good/shop/batchRemove',params)
    },

    //根据经纬度获取详细信息
    // GetAddressInfo:params => {
    //     return API.GET('/good/shop/batchRemove',params)
    // },

    //绑定店铺用户
    ShopMenber:params => {
        return API.POST('/good/shop/member',params)
    },

    //绑定店铺用户
    GetShopMenber:params => {
        return API.GET('/good/shop/member',params)
    },

    //根据ID进行删除
    DeleteShopMenber:params => {
        return API.DELETE('/good/shop/member',params)
    },

    //转入一分钱抢
    AddyiMoneyShop:params => {
        return API.POST('/penny/pennyBuy/save',params)
    },

    //获取一分钱抢的列表
    YiMoneyShopList:params => {
        return API.GET('/penny/pennyBuy/list',params)
    },  

    //获取一分钱抢的列表
    DeleteYiMoneyShopList:params => {
        return API.DELETE('/penny/pennyBuy/remove',params)
    },  

    //获取一分钱抢的列表
    UpdateYiMoneyShopList:params => {
        return API.PUT('/penny/pennyBuy/update',params)
    },  
}