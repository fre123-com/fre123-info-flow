<template>
	<CommonCustomizeHeader
		:headerText="HEADER_TEXT.NEWS"
		class="sticky top-0 z-[9999]"
		@setting:show-dialog="showSettingDialog"
	>
		<FlowNewsTab
			ref="newsTabRef"
			:source="routeSource"
			:tabLength="tabLength"
			:showList="sourceList"
			:hideList="hideList"
			:newsType="newsType"
		></FlowNewsTab>
	</CommonCustomizeHeader>

	<div id="wrap" class="w-[90%] xl:w-[1200px] mx-auto my-[16px]">
		<div class="w-full md:flex min-h-[calc(100vh-167px)]">
			<div
				class="shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] md:basis-3/4 rounded-2xl overflow-scroll no-scrollbar"
			>
				<FlowNewsListAll
					v-if="currSource"
					:source="(currSource as ICategory)"
					ref="flowNewsAllRef"
					:page="page"
					:total="(total as number)"
					:newsList="newsList"
					:newsType="newsType"
				></FlowNewsListAll>
			</div>
			<div class="basis-1/4 ml-[16px] flex-col hidden md:block">
				<div class="sticky top-[81px]">
					<div class="rounded-2xl shadow-[0_0_10px_1px_rgba(0,0,0,0.1)]">
						<p class="p-3 border-b-[1px] flex shadow-[1px_-2px_5px_1px_rgba(0,0,0,0.03)]">
							<img
								class="w-[30px] h-[30px] scale-75"
								src="https://img.fre123.com/i/2023/12/26/658ae05448ce5.png"
								alt=""
							/>
							<strong class="pl-1 h-[30px] leading-[30px]">热点榜单</strong>
						</p>
						<ul class="p-2 grid grid-cols-3 gap-1">
							<li class="" v-for="item in NEWS_CATEGORY_LIST">
								<a
									:href="item.url"
									target="_blank"
									class="flex flex-col items-center p-2 text-[16px] cursor-pointer"
								>
									<div
										class="w-[60px] h-[60px] rounded-full bg-slate-100 text-red-500 hover:text-red-600 hover:text-[15px] text-center leading-[60px] font-bold text-[14px]"
									>
										{{ item.letter }}
									</div>
									<span
										class="text-center text-sm font-bold mt-[8px] text-[#444] hover:text-[#000]"
									>
										{{ item.name }}
									</span>
								</a>
							</li>
						</ul>
					</div>
					<div
						class="sticky mt-[10px] top-[266px] rounded-2xl shadow-[0_0_10px_1px_rgba(0,0,0,0.1)]"
					>
						<FlowCardHotNews
							:newsList="hotList.slice(0, 10)"
							ref="flowCardHotNewsRef"
							:newsType="newsType"
						></FlowCardHotNews>
					</div>
				</div>
			</div>
		</div>
	</div>
	<CommonPendant></CommonPendant>
	<CommonFooter></CommonFooter>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		headerText?: string
		source?: string
		page?: number | string
		pageSize?: number
		newsType?: string
	}>(),
	{
		headerText: HEADER_TEXT.DEFAULT,
		source: '',
		page: 1,
		pageSize: 20,
		newsType: BUSINESS_NEWS,
	},
)

import { type ICategory } from '~/interface/rss'
import useArticleStore from '~/stores/article'
import useNewsStore from '~/stores/news'
import useTechCategoryStore from '~/stores/tech'
import type { NEWS_CATEGORY_LIST } from '~/utils/const'

const newsType = ref(props.newsType)

const newsTabRef = ref()
const showSettingDialog = () => {
	newsTabRef.value.showSettingDialog()
}

const page = ref<number>((props.page as unknown as number) || 1)

const tabLength = ref(9)
var categoryStore: any
if (newsType.value == NEWS_KEY_CATEGORY_HOT_NEWS) {
	categoryStore = useNewsStore()
} else if (newsType.value == NEWS_KEY_CATEGORY_TECH) {
	categoryStore = useTechCategoryStore()
}

const categoryData = await categoryStore.getNewsCategory()

const sourceList = ref(categoryData.show)
// 获取当前分类来源
const routeSource = ref(props.source)
const currSource = ref<ICategory>()
if (!routeSource.value) {
	currSource.value = sourceList.value[0]
} else {
	currSource.value = sourceList.value.findLast((element) => {
		return element.web_data.web_path == routeSource.value
	})
}

// 分类不存在，跳转到首页
if (!currSource || currSource.value == null) {
	navigateTo(`/${newsType.value}`, {
		external: true,
	})
}

const hideList = ref(categoryData.hide)
const initCategoryList = await categoryStore.getInitCategoryData()

const flowNewsAllRef = ref()
const flowCardHotNewsRef = ref()

const articleStore = useArticleStore()
const data = await articleStore.getNewsList(
	currSource?.value?.rss_name as string,
	props.newsType,
	page.value,
)
const newsList = ref(data.docs)
const total = ref(data.total)

const groupNews = await articleStore.getGroupNews(props.newsType)
const hotList = await articleStore.getHotNews(props.newsType)

onMounted(() => {
	useCustomizeLocalStorage.set(newsType.value, BUSINESS_NEWS_INIT_SOURCE, initCategoryList)
	useCustomizeLocalStorage.set(newsType.value, BUSINESS_NEWS_CURR_SOURCE, initCategoryList)
	useCustomizeLocalStorage.set(props.newsType, BUSINESS_NEWS_GROUP_NEWS, groupNews)
	useCustomizeLocalStorage.set(props.newsType, BUSINESS_NEWS_HOT, hotList)
})

useHead({
	title: currSource.value?.rss_name + '_今日热榜',
	meta: [
		{
			name: 'keywords',
			content: currSource.value?.rss_name,
		},
		{
			name: 'description',
			content: currSource.value?.rss_name,
		},
	],
})
</script>
<style>
#wrap {
	height: 100%;
	box-sizing: border-box;
	z-index: 10;
	color: #434343;
}
</style>
