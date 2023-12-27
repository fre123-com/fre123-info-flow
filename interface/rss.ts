// 首页数据总览
export const API_GET_RSS_GROUP = '/v1/rss/group_get'
// 获取指定来源数据
export const API_GET_RSS_NEWS = '/v1/rss/get'
// 来源配置
export const API_GET_RSS_CONFIG = '/v1/rss/config'

import type { IPaginationResp } from './common'

export const RSS_CATEGORY_HOT_NEWS = 'news'
export const RSS_CATEGORY_TECH = 'tech'
export const RSS_CATEGORY_WEEKLY = 'weekly'

// 资讯列表(分页)
// export interface IArticleListPaginationResp extends IPaginationResp<IArticle> {}

//热榜来源配置列表
export interface ISourceListResp {
	news_source: Array<ISource>
	total: number
}

export interface ISource {
	news?: IRankBoard
	tech?: IRankBoard
}

export interface IRankBoard {
	category: string
	data: ICategory[]
}

export interface ICategory {
	rss_name: string
	rss_url: string
	status: number
	rss_white_list?: any[]
	rss_black_list?: any[]
	rss_category: string
	rss_user_url?: string
	rss_index?: number
	rss_language?: string
	web_data: IWebData
	alias_name?: string
}

export interface IWebData {
	web_source_url?: string
	web_path?: string
	web_logo_path?: string
	web_list_style?: string
	web_auto_summary?: number
	web_des?: string
}

// 热榜信息流
export interface INewsListPaginationResp extends IPaginationResp<INews> {}

export interface INewsGroupPaginationResp extends IPaginationResp<INewsGroup> {}

export interface INewsExtra {
	image_urls: string[]
	video_urls: string[]
	gpt_summary: string
}

export interface INews {
	rss_name?: string
	alias_name?: string
	title: string
	link: string
	publish_str: string
	published_at: number
	created_at?: number
	rss_category: string
	rss_index: number
	extra_data?: INewsExtra
	web_data?: IWebData
}

export interface INewsGroup {
	rss_index: number
	rss_name: string
	docs: INews[]
	total?: number
}
