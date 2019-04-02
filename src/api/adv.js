import * as API from './'

export default {
	// 获取首页banner列表
	HomeBannerList:params=>{
		return API.GET('/advertisement/banner/list',params)
	}

}