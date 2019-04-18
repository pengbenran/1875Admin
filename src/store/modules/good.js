const state = {
    thumbnail:'',
    images:[],
    goodsCat:[],
    MemberDataList:[],
    ShopDataList:[],
    DictionaryDataList:[]
}

const mutations = {
    Set_thumbnailValue(state,param){
        state.thumbnail = param
    },

    Get_GoodsCatData(state,param){
        state.goodsCat = param
    },

    Set_MemberLvList(state,param){ //储存分享师等级列表
        state.MemberDataList = param
    },

    Set_ShopList(state,param){ //储存店铺列表
        state.ShopDataList = param
    },

    Set_DictionaryList(state,param){ //存储字典数据
        state.DictionaryDataList = param
    }
}

const actions = {
    Set_thumbnailValue:({commit},param) => {
        commit('Set_thumbnailValue',param)
    },
    Get_GoodsCatData({commit},param){
        commit('Get_GoodsCatData',param)
    },
    Set_MemberLvList({commit},param){
        commit('Set_MemberLvList',param)
    },
    Set_ShopList({commit},param){
        commit('Set_ShopList',param)
    },
    Set_DictionaryList({commit},param){
        commit('Set_DictionaryList',param)
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}