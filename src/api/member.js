import * as API from './'

export default {
   getMain:params=>{
     return API.GET(`/api/Goods/getFirstGoodCat`)
   },
   
   //获取会员列表
   getMenberList:params=>{
     return API.GET('/member/member/list',params)
   },
   
   //删除会员
   deleteMenber:params => {
     return API.DELETE('/member/member/remove',params)
   },

    //获取推荐师列表
    getDistributorList:params=>{
      return API.GET('/member/distributor/list',params)
    },
    
    //删除推荐师
    deleteDistributors:params => {
      return API.DELETE('/member/distributor/remove',params)
    },

   //获取会员等级
   getMenberLvList:params => {
     return API.GET('/member/memberLv/list',params)
   },

   //会员等级添加
   addMenberLv:params => {
     return API.POST('/member/memberLv/save',params)
   },

   //会员等级修改
   updataMenberLv:params => {
     return API.PUT('/member/memberLv/update',params)
   },

   //会员等级删除
   deleteMenberLv:params =>{
     return API.DELETE('/member/memberLv/remove',params)
   },

   //会员等级等级批量删除
   batchDeleteMenberLv:params => {
     return API.DELETE('/member/memberLv/batchRemove',params)
   },


   //获取推荐师等级列表
   getdistributorLvList:params => {
    return API.GET('/member/distributorLv/list',params)
   },

   //推荐师等级添加
   addDistributorLvList:params =>{
     return API.POST('/member/distributorLv/save',params)
   },
   
   //推荐师修改
   updataDistributor:params => {
     return API.PUT('/member/distributorLv/update',params)
   },

   //推荐师删除
   deleteDistributor:params => {
     return API.DELETE('/member/distributorLv/remove',params)
   },

   //推荐师批量删除
   batchDeleteDistributor:params => {
     return API.DELETE('/member/distributorLv/batchRemove',params)
   }

}