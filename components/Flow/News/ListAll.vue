<template>
	<div id="category-info" class="hidden md:flex w-full rounded-2xl md:py-2 px-3">
		<h2 class="flex ml-2 h-[36px] leading-[36px] text-[20px] font-bold text-center">
			<a
				class="text-black"
				:href="`${WEB_HOST}/${props.newsType}/${currSource?.web_data?.web_path}`"
			>
				{{ currSource?.alias_name ? currSource?.alias_name : currSource?.rss_name }}
			</a>
			<span class="text-2xl mx-2">·</span>
			<div class="text-xs text-slate-700 h-[36px] leading-[36px]">
				{{ currSource?.web_data.web_des }}
			</div>
		</h2>
		<div class="hidden md:flex flex-1 items-center justify-end text-xs text-slate-700">
			上次更新 :
			<span class="ml-1 font-bold text-blue-500">
				{{
					newsList[0]?.created_at
						? FormatDate(newsList[0]?.created_at as number, 'MM/DD HH:mm:ss')
						: ''
				}}
			</span>
		</div>
	</div>
	<div id="content-list" class="sticky top-0 border-t-[1px] px-1">
		<div
			v-for="(articleInfo, i) in newsList"
			class="flex w-full px-5 text-sm whitespace-nowrap transition-all bg-slate-100 bg-opacity-0 hover:bg-opacity-100 rounded-lg cursor-pointer"
		>
			<div
				class="flex w-4 py-3 justify-start items-center border-b-transparent 0 border-b-[1px]"
				:class="`${i < 3 ? 'text-[#f1310f] opacity-[100-i*20] ' : 'text-[#8a919f]'}`"
			>
				{{ pageSize * (page - 1) + i + 1 }}.
			</div>
			<div
				:id="`news-${i}`"
				:content="articleInfo.title"
				:element-id="`news-${i}`"
				:nowrap="true"
				class="flex visited:decoration-slate-200 text-sm w-full ml-2 py-3 justify-end items-center border-b-slate-200 border-b-[1px] text-text-title font-normal truncate transition-all hover:text-[#f34859]"
			>
				<a
					:href="articleInfo.link"
					rel="nofollow"
					target="_blank"
					:title="articleInfo.title"
					class="justify-start flex-grow truncate pr-3 visited:text-[#681da8]"
				>
					{{ articleInfo.title }}
				</a>

				<a
					:href="`/${newsType}/${articleInfo?.web_data?.web_path}`"
					target="_blank"
					:title="articleInfo.rss_name"
					class="justify-end text-xs"
					:class="`${currSource?.web_data?.web_path ? 'hidden' : ''}`"
					>{{ articleInfo.rss_name }}</a
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type ICategory, type INews } from '~/interface/rss'

const props = withDefaults(
	defineProps<{
		source: ICategory
		pageSize?: number | string
		page?: number | string
		total: number
		newsType?: string
		newsList: INews[]
	}>(),
	{
		pageSize: 20,
		page: 1,
		newsType: BUSINESS_NEWS,
		total: 20,
	},
)

const currSource = ref(props.source)
const pageSize = ref(props.pageSize as number)
const page = ref(props.page as number)
const newsList = ref(props.newsList)

// 页面切换进行数据更新
const changePageData = (category: ICategory) => {
	// 刷新文章数据，切换成指定分类下数据
	const groupNews = useCustomizeLocalStorage.get(props.newsType, BUSINESS_NEWS_GROUP_NEWS)
	const list = groupNews?.findLast((element) => {
		return element.rss_name == category.rss_name
	})
	newsList.value = list?.docs as INews[]

	//切换当前分类
	const sourceList = useCustomizeLocalStorage.get(props.newsType, BUSINESS_NEWS_INIT_SOURCE)
	currSource.value = sourceList.findLast((element) => element.rss_name == category.rss_name)
}

defineExpose({ changePageData })
</script>

<style scoped></style>
