import * as API from './'

export default {
	// 获取首页banner列表
	HomeBannerList:params=>{
		return API.GET('/advertisement/banner/list',params)
	},
	//保存首页banner图
	HomeBannerSave:params=>{
		return API.POST('/advertisement/banner/save',params)
	},
	// 首页banner修改
	HomeBannerUpdate:params=>{
		return API.PUT('/advertisement/banner/update',params)
	},
	// 首页banner图删除
	HomeBannerDel:params=>{
		return API.DELETE('/advertisement/banner/remove',params)
	},
	// 首页背景图列表
	HomeBackGroundList:params=>{
		return API.GET('/advertisement/background/list',params)
	},
	//首页背景图更新
	HomeBackGroundUpdate:params=>{
		return API.PUT('/advertisement/background/update',params)
	},
	// 分类背景图列表
	catBackGroundList:params=>{
		return API.GET('/advertisement/catBackground/list',params)
	},
	// 分类背景图新增
	catBackGroundAdd:params=>{
		return API.POST('/advertisement/catBackground/save',params)
	},
	// 分类背景图片修改
	catBackGroundUpdate:params=>{
		return API.PUT('/advertisement/catBackground/update',params)
	},
	// 分类背景图删除
	catBackGroundDel:params=>{
		return API.DELETE('/advertisement/catBackground/remove',params)
	},

}