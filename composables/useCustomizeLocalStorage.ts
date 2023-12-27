// 统一管理local_storage

// 缓存名称
const storageKey = 'fre123_cache_data'

// 业务分组
export const BUSINESS_NEWS = 'news'
export const BUSINESS_TECH = 'tech'
export const BUSINESS_REQ_INFO = 'tech'

// 新闻/科技资讯业务
export const BUSINESS_NEWS_INIT_SOURCE = 'init_source'
export const BUSINESS_NEWS_CURR_SOURCE = 'curr_source'
export const BUSINESS_NEWS_GROUP_NEWS = 'group_news'
export const BUSINESS_NEWS_HOT = 'hot_news'

const businessMap = {
	BUSINESS_KEY_NEWS: '新闻',
	BUSINESS_KEY_TECH: '科技资讯',
}

const businessKeyMap = {
	BUSINESS_KEY_NEWS: {
		BUSINESS_NEWS_INIT_SOURCE: '初始化新闻分组',
		BUSINESS_NEWS_CURR_SOURCE: '当前分类',
		BUSINESS_NEWS_GROUP_NEWS: '完整新闻列表',
	},
	BUSINESS_KEY_TECH: {
		BUSINESS_NEWS_INIT_SOURCE: '初始化新闻分组',
		BUSINESS_NEWS_CURR_SOURCE: '当前分类',
		BUSINESS_NEWS_GROUP_NEWS: '完整新闻列表',
	},
}

export const useCustomizeLocalStorage = {
	set: (business: string, key: string, data: any) => {
		// 这边做严格约束，方便做统一管理
		// console.log(':Object.keys(businessMap)', Object.keys(businessMap))
		// console.log('businessKeyMap[business]', businessKeyMap[business])
		// console.log(
		// 	'Object.keys(businessKeyMap[business]).includes(key)',
		// 	Object.keys(businessKeyMap[business]).includes(key),
		// )

		// if (
		// 	!Object.keys(businessMap).includes(business) ||
		// 	(businessKeyMap[business] && !Object.keys(businessKeyMap[business]).includes(key))
		// ) {
		// 	return Error('查询不到该配置，不允许写入')
		// }

		const currCacheJson = localStorage.getItem(storageKey) as string
		const currCache = currCacheJson ? JSON.parse(currCacheJson) : {}
		if (!currCache[business]) {
			currCache[business] = {}
		}
		currCache[business][key] = data
		localStorage.setItem(storageKey, JSON.stringify(currCache))
	},

	get: (business: string, key: string) => {
		// 这边做严格约束，方便做统一管理
		// if (
		// 	!Object.keys(businessMap).includes(business) ||
		// 	(businessKeyMap[business] && !Object.keys(businessKeyMap[business]).includes(key))
		// ) {
		// 	return Error('查询不到该配置，不允许写入')
		// }

		const currCacheJson = localStorage.getItem(storageKey) as string
		const currCache = currCacheJson ? JSON.parse(currCacheJson) : {}
		return currCache[business][key] ?? null
	},
}
