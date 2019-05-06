import * as API from './'

export default {
    //添加字典数据
    AddDictionary:params => {
        return API.POST('/sys/dict/save',params)
    },

    //获取字典数据
    DictionaryList:params => {
        return API.GET('/sys/dict/list',params)
    },

    //修改字典数据
    UpdataDictionary:params =>{
        return API.PUT('/sys/dict/update',params)
    },

    //删除字典数据
    DeleteDictionary:params => {
        return API.DELETE('/sys/dict/remove',params)
    },

    //批量删除字典数据
    BatchRemoveDictionary:params => {
        return API.DELETE('/sys/dict/batchRemove',params)
    },

    //获取子级字典数据
    GetChildDictionary:params => {
        return API.GET('/sys/dict/child',params)
    },

    //获取地铁数据
    GetSubwayData:params => {
        return API.GET('/good/good/subway',params)
    }
}