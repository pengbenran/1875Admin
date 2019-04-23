import * as API from './'

export default {
	memberUpLog:params=>{
		 return API.GET('/member/memberLog/list',params)
	},
	pointLog:params=>{
		return API.GET('/member/pointLog/list',params)
	}
}