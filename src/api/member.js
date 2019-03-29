import * as API from './'

export default {
   getMain:params=>{
     return API.GET(`/api/Goods/getFirstGoodCat`)
   }
}