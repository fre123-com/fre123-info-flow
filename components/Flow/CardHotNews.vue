<template>
	<div class="rounded-md bg-card text-slate-600">
		<p class="p-3 border-b-[1px] flex shadow-[1px_-2px_5px_1px_rgba(0,0,0,0.03)]">
			<strong class="pl-1 h-[30px] leading-[30px]"
				><span class="text-xl">🔥</span> <span class="ml-1">综合热榜</span></strong
			>
		</p>
		<div v-for="(news, i) in newsList" class="px-1">
			<div
				class="article-item rounded-lg transition-all inline-flex w-full p-3 bg-slate-100 bg-opacity-0 hover:bg-opacity-100 duration-200"
			>
				<span
					class="rounded-full text-[14px] w-[16px] h-[16px] text-center leading-[16px] mt-[2px] mr-2 text-white"
					:class="`${i > 2 ? 'bg-slate-300' : ' bg-card-hover '} ${
						i > 2 ? '' : `opacity-${100 - i * 20}`
					}`"
				>
					{{ i + 1 }}</span
				>
				<a
					:href="news.link"
					class="visited:text-[#681da8] text-sm text-text-title overflow-hidden line-clamp-2 text-ellipsis max-w-[60%] hover:text-text-hover"
					target="_blank"
					rel="nofollow"
					:title="news?.title"
					>{{ news?.title }}</a
				>
				<span class="flex-grow"></span>
				<div class="flex flex-col">
					<span
						:href="`${
							news.web_data?.web_path ? '/' + newsType + '/' + news.web_data?.web_path : ''
						}`"
						:title="`${news?.rss_name}`"
						class="text-xs text-[#363636] flex justify-start items-center truncate flex-1 px-1 rounded-lg hover:bg-white hover:text-text-hover cursor-pointer"
					>
						{{ news?.alias_name ? news.alias_name : news?.rss_name }}
					</span>
					<span class="text-xs text-[#737373] flex justify-end items-end flex-1">
						{{ news.created_at ? CalcRelativeDate(news.created_at) : '' }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { BUSINESS_NEWS_HOT } from '~/composables/useCustomizeLocalStorage'
import { type INews } from '~/interface/rss'

const props = withDefaults(
	defineProps<{
		newsType?: string
		newsList: INews[]
	}>(),
	{
		newsType: NEWS_KEY_CATEGORY_HOT_NEWS,
	},
)

//获取文章列表

const newsList = ref(props.newsList)

const changePageData = () => {
	const cacheData = useCustomizeLocalStorage.get(props.newsType, BUSINESS_NEWS_HOT)
	newsList.value = cacheData && cacheData.length > 0 ? cacheData : []
}
defineExpose({ changePageData })
</script>
