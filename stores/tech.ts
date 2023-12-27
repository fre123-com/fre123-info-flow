import {
	RSS_CATEGORY_TECH,
	type ICategory,
	type ISource,
	API_GET_RSS_CONFIG,
} from '~/interface/rss'

const useTechCategoryStore = defineStore(
	'tech_category',
	() => {
		const techCategoryShowed = ref<string[]>([])
		const techCategoryHidden = ref<string[]>([])
		const techCategoryInit = ref<ICategory[]>([])

		const setSettingNewsCategory = (type: string, value: string[]) => {
			if (type == 'show') {
				techCategoryShowed.value = value
				console.log('techCategoryShowed 设置成功，已更新！', techCategoryShowed)
			} else {
				techCategoryHidden.value = value
				console.log('techCategoryHidden 设置成功，已更新！', techCategoryHidden)
			}
		}

		const getInitCategoryData = async (type: string = '') => {
			const categoryList = await fetchAllCategory()
			techCategoryInit.value = setDefaultCategory(categoryList)
			return techCategoryInit.value
		}

		const setDefaultCategory = (list: ICategory[]) => {
			if (list[0].rss_name != NEWS_DEFAULT_SUMMARY_CATEGORY_TECH) {
				list.unshift({
					rss_name: NEWS_DEFAULT_SUMMARY_CATEGORY_TECH,
					rss_url: '',
					status: 1,
					rss_category: RSS_CATEGORY_TECH,
					rss_user_url: '',
					web_data: {
						web_source_url: '',
						web_path: '',
						web_logo_path: APP_ICON,
						web_list_style: 'auto',
						web_auto_summary: 0,
						web_des: '各平台技术热点资讯汇聚，快速了解实时资讯',
					},
				})
			}
			return list
		}

		// 获取全部分类列表
		const fetchAllCategory = async () => {
			// console.log('techCategoryInit', techCategoryInit.value)

			if (techCategoryInit.value.length > 0) {
				return setDefaultCategory(techCategoryInit.value) as ICategory[]
			}

			const body = ref({
				category: [RSS_CATEGORY_TECH],
			})
			const { data: sourceData } = await postApi<ISource>(API_GET_RSS_CONFIG, {
				key: JSON.stringify(body),
				body: {
					category: [RSS_CATEGORY_TECH],
				},
			})

			// console.log('sourceData', sourceData.value)

			if (!sourceData) {
				throw new Error('无法获取分类数据')
			}
			return sourceData.value?.tech?.data as ICategory[]
		}

		// 获取新闻分类列表
		const getNewsCategory = async () => {
			const categoryList = await fetchAllCategory()
			// console.log('categoryList', categoryList)

			// 未设置缓存，进行初始化
			if (techCategoryShowed.value.length <= 0) {
				// console.log('重新获取缓存...')
				categoryList.forEach((element) => {
					techCategoryShowed.value.push(element.rss_name)
				})
				techCategoryHidden.value = []
			}

			// TODO 待优化，目前这么处理是为了排序
			const showList = ref<ICategory[]>([])
			techCategoryShowed.value.forEach((idx) => {
				categoryList.forEach((element) => {
					if (element.rss_name == idx) {
						showList.value.push(element)
					}
				})
			})

			const hideList = ref<ICategory[]>([])
			techCategoryHidden.value.forEach((idx) => {
				categoryList.forEach((element) => {
					if (element.rss_name == idx) {
						hideList.value.push(element)
					}
				})
			})

			//新增加的分类默认置于 showList 最后面
			categoryList.forEach((element) => {
				if (
					!techCategoryShowed.value.includes(element.rss_name) &&
					!techCategoryHidden.value.includes(element.rss_name) &&
					element.rss_name !== NEWS_DEFAULT_SUMMARY_CATEGORY_TECH
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
			techCategoryShowed,
			techCategoryHidden,
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
export default useTechCategoryStore
