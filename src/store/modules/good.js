const state = {
    thumbnail:'',
    images:[]
}

const mutations = {
    Set_thumbnailValue(state,param){
        state.thumbnail = param
    }
}

const actions = {
    Set_thumbnailValue:({commit},param) => {
        commit('Set_thumbnailValue',param)
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}