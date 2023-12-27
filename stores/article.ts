import {
	RSS_CATEGORY_HOT_NEWS,
	type INewsGroupPaginationResp,
	type INews,
	type INewsGroup,
	API_GET_RSS_GROUP,
} from '~/interface/rss'
import { API_STATS_HOT, type IHotNews, type IHotNewsPaginationResp } from '~/interface/stats'
import { STATS_TYPE_CLICK } from '~/utils/const'

const useArticleStore = defineStore(
	'fre123_news',
	() => {
		const groupNews = ref<INewsGroup[]>()

		const pageSize = 20
		const maxPage = 3

		const hotNewsList = ref<Record<string, INews[]>>({})

		const getGroupNews = async (type: string) => {
			if (groupNews.value && groupNews.value?.length > 0) {
				return groupNews.value as INewsGroup[]
			}

			const initParams = ref({
				rss_category: type,
				rss_name_list: [],
				rss_name_tl_ignore_list: [],
				rss_group_limit: pageSize,
				tl_status: 0,
				rss_cache: 1,
			})

			// 获取文章列表
			const { data, refresh } = await postApi<INewsGroupPaginationResp>(API_GET_RSS_GROUP, {
				key: JSON.stringify(initParams),
				body: initParams,
			})

			groupNews.value = data.value?.rows
			return groupNews.value as INewsGroup[]
		}

		const getNewsList = async (
			source: string,
			type: string = RSS_CATEGORY_HOT_NEWS,
			page: number = 1,
		) => {
			if (
				source == NEWS_DEFAULT_SUMMARY_CATEGORY_NEWS ||
				source == NEWS_DEFAULT_SUMMARY_CATEGORY_TECH
			) {
				//  新热榜数据
				const hotNewsList = await getHotNews(type)
				return {
					total: 20,
					docs: hotNewsList,
				}
			} else {
				const groupData = await getGroupNews(type)
				const newsList = groupData.findLast((element) => {
					return element.rss_name == source
				})

				return {
					total: newsList?.total,
					docs: newsList?.docs as INews[],
				}
			}
		}

		// 获取热门文章列表
		const getHotNews = async (type: string = RSS_CATEGORY_HOT_NEWS) => {
			if (hotNewsList.value[type] && hotNewsList.value[type].length > 0) {
				return hotNewsList.value[type]
			}

			const reqParams = {
				project_id: PROJECT_ID,
				stats_type: STATS_TYPE_CLICK,
				target_b_type: type,
				page: 1,
				page_size: pageSize,
			}
			const { data, refresh } = await postApi<IHotNewsPaginationResp>(API_STATS_HOT, {
				key: JSON.stringify(reqParams),
				body: reqParams,
			})

			hotNewsList.value[type] = parseHotToNews(type, data.value?.rows as IHotNews[])
			return hotNewsList.value[type]
		}

		// 转化为统一的格式
		const parseHotToNews = (newsType: string, newsList: IHotNews[]) => {
			if (!newsList || newsList.length == 0) {
				return []
			}
			var list: INews[] = []
			newsList.forEach((element) => {
				const newsItem: INews = {
					rss_name: element?.data?.source ?? '',
					alias_name: element?.data?.source_alias ?? '',
					web_data: {
						web_path: element?.data?.source_url ?? '',
					},
					title: element?.data?.title ?? '',
					link: element.target_url,
					publish_str: FormatDate(element.timestamp),
					published_at: element?.data?.created_at ?? 0,
					created_at: element?.data?.created_at,
					rss_category: newsType,
					rss_index: 0,
				}
				list.push(newsItem)
			})

			return list as INews[]
		}

		return { getHotNews, getNewsList, getGroupNews, groupNews }
	},
	{
		// 持久化
		persist: true,
	},
)
export default useArticleStore
