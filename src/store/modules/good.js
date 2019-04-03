const state = {
    thumbnail:'',
    images:[],
    goodsCat:[]
}

const mutations = {
    Set_thumbnailValue(state,param){
        state.thumbnail = param
    },

    Get_GoodsCatData(state,param){
        state.goodsCat = param
    }
}

const actions = {
    Set_thumbnailValue:({commit},param) => {
        commit('Set_thumbnailValue',param)
    },
    Get_GoodsCatData({commit},param){
         commit('Get_GoodsCatData',param)
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}