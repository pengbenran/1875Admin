import * as API from './'

export default {  
     //图片删除
     // deleteImg: params => {
     //    return API.DELETE('/api-base/oss/deletImg',params)
     // },
    imageUpload:params=>{
        return API.POST('/advertisement/uploadFile/imageUpload',params)
    }
}