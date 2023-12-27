import type { IPaginationResp } from './common'

// 获取热点数据
export const API_STATS_HOT = '/v1/stats/hot'

export interface IHotNewsPaginationResp extends IPaginationResp<IHotNews> {}

export interface IHotNews {
	target_url: string
	timestamp: number
	req_info: {
		ua: string
		bg: string
		ip: string
	}
	data: {
		title: string
		source: string
		source_url: string
		source_alias: string
		created_at: number
	}
	score: number
}
