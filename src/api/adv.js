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
	// 特别划算模块跟今日爆品人气模块下关联商品
	batchSave:params=>{
		return API.POST('/advertisement/bannerGood/batchSave',params)
	},
	// 获取今日爆品人气模块下已经关联的商品
	bannerGoodlist:params=>{
		return API.GET('/advertisement/bannerGood/bannerGoodlist',params)
	},
	// 最新好物跟今日爆品热卖模块关联商品
	catBackgroundBatchSave:params=>{
		return API.POST('/advertisement/catBackgroundGood/batchSave',params)
	},
	// 获取今日爆品人气模块下已经关联的商品
	catBackgroundGoodlist:params=>{
		return API.GET('/advertisement/catBackgroundGood/catBackgroundGoodlist',params)
	},
}