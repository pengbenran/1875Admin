import * as API from './'

export default {
	memberUpLog:params=>{
		 return API.GET('/member/memberLog/list',params)
	},
	pointLog:params=>{
		return API.GET('/member/pointLog/list',params)
	},
	distribeUpLog:params=>{
		return API.GET('/member/distributorLvUpLog/list',params)
	},
	//分享师分润日志
	GetDistributorMoney:params => {
		return API.GET('/member/distributorLog/list',params)
	},	
	//分享师分润日志
	GetDistributorBandDing:params => {
		return API.GET('/member/distributorBoundLog/list',params)
	}
}