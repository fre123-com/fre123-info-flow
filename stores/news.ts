import {
	API_GET_RSS_CONFIG,
	RSS_CATEGORY_HOT_NEWS,
	type ICategory,
	type ISource,
} from '~/interface/rss'

const useNewsStore = defineStore(
	'news_category',
	() => {
		const newsCategoryShowed = ref<string[]>([])
		const newsCategoryHidden = ref<string[]>([])
		const newsCategoryInit = ref<ICategory[]>([])

		const setSettingNewsCategory = (type: string, value: string[]) => {
			if (type == 'show') {
				newsCategoryShowed.value = value
				console.log('newsCategoryShowed 设置成功，已更新！', newsCategoryShowed)
			} else {
				newsCategoryHidden.value = value
				console.log('newsCategoryHidden 设置成功，已更新！', newsCategoryHidden)
			}
		}

		const getInitCategoryData = async (type: string = '') => {
			const categoryList = await fetchAllCategory()
			newsCategoryInit.value = setDefaultCategory(categoryList)
			return newsCategoryInit.value
		}

		const setDefaultCategory = (list: ICategory[]) => {
			if (list[0].rss_name != NEWS_DEFAULT_SUMMARY_CATEGORY_NEWS) {
				list.unshift({
					rss_name: NEWS_DEFAULT_SUMMARY_CATEGORY_NEWS,
					alias_name: '',
					rss_url: '',
					status: 1,
					rss_category: RSS_CATEGORY_HOT_NEWS,
					rss_user_url: '',
					web_data: {
						web_source_url: '',
						web_path: '',
						web_logo_path: APP_ICON,
						web_list_style: 'auto',
						web_auto_summary: 0,
						web_des: '各平台热点资讯汇聚，快速了解实时资讯',
					},
				})
			}
			return list
		}

		// 获取全部分类列表
		const fetchAllCategory = async () => {
			if (newsCategoryInit.value.length > 0) {
				return newsCategoryInit.value as ICategory[]
			}

			const { data: sourceData } = await postApi<ISource>(API_GET_RSS_CONFIG, {
				key: JSON.stringify({
					category: [RSS_CATEGORY_HOT_NEWS],
				}),
				body: {
					category: [RSS_CATEGORY_HOT_NEWS],
				},
			})
			if (!sourceData) {
				throw new Error('无法获取分类数据')
			}
			// console.log('sourceData', sourceData.value)
			return sourceData.value?.news?.data as ICategory[]
		}

		// 获取新闻分类列表
		const getNewsCategory = async () => {
			const categoryList = await fetchAllCategory()

			// 未设置缓存，进行初始化
			if (newsCategoryShowed.value.length <= 0) {
				console.log('重新获取缓存...')
				categoryList.forEach((element) => {
					newsCategoryShowed.value.push(element.rss_name)
				})
				newsCategoryHidden.value = []
			}

			const showList = ref<ICategory[]>([])
			newsCategoryShowed.value.forEach((idx) => {
				categoryList.forEach((element) => {
					if (element.rss_name == idx) {
						showList.value.push(element)
					}
				})
			})

			const hideList = ref<ICategory[]>([])
			newsCategoryHidden.value.forEach((idx) => {
				categoryList.forEach((element) => {
					if (element.rss_name == idx) {
						hideList.value.push(element)
					}
				})
			})

			//新增加的分类默认置于 showList 最后面
			categoryList.forEach((element) => {
				if (
					!newsCategoryShowed.value.includes(element.rss_name) &&
					!newsCategoryHidden.value.includes(element.rss_name) &&
					element.rss_name !== NEWS_DEFAULT_SUMMARY_CATEGORY_NEWS
				) {
					showList.value.push(element)
				}
			})

			showList.value = setDefaultCategory(showList.value)

			showList.value = [...new Set(showList.value)]
			hideList.value = [...new Set(hideList.value)]

			return {
				show: showList,
				hide: hideList,
			}
		}

		return {
			// newsCategoryShowed: skipHydrate(newsCategoryShowed),
			// newsCategoryHidden: skipHydrate(newsCategoryHidden),
			newsCategoryShowed,
			newsCategoryHidden,
			setSettingNewsCategory,
			getNewsCategory,
			getInitCategoryData,
		}
	},
	{
		// 持久化
		persist: true,
	},
)
export default useNewsStore
