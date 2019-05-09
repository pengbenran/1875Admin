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
   },

   //获取分享师的提现记录
   getWithdrawApplyList:params => {
     return API.GET('/member/withdrawApply/list',params)
   },

   //删除分享师的提现记录
   deleteWithdrawApplyList:params => {
     return API.DELETE('/member/withdrawApply/remove',params)
   },

   //批量删除分享师提现记录
   batchDeleteWithdrawApplyList:params => {
     return API.DELETE('/member/withdrawApply/batchRemove',params)
   },


   //查询推荐师的信息
   DistributorConfigInfo:params => {
     return API.GET('/config/globalConfig/getGlobalConfigEntity',params)
   },
   

   //编辑推荐师设置信息
   DistributorConfigUpdata:params => {
     return API.PUT('/config/globalConfig/update',params)
   },

   //推荐师审核列表recommenderReview
   GetDistributorReview:params => {
     return API.GET('/member/distributorApply/list',params)
   },

   //确认审核
   QueDistributorReview:params => {
    return API.PUT('/member/distributorApply/status',params)
   },
    //删除审核记录
   deleteDistributorReview:params => {
    return API.DELETE('/member/distributorApply/remove',params)
   },

   //批量审核通过
   BatchQueDistributorReviews:params => {
    return API.DELETE('/member/distributorApply/batchPass',params)     
   },

   //批量审核不通过
   BatchQueDistributorReview:params => {
    return API.DELETE('/member/distributorApply/batchUnPass',params)     
   },

   // 获取会员银行卡列表
   getBankList:params=>{
    return API.GET('/member/withdrawInfo/list',params)
   },

   // 删除会员银行卡信息
   removeBankCard:params=>{
    return API.DELETE('/member/withdrawInfo/remove',params)
   }
}