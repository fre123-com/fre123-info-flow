<template>
	<div class="w-full h-full hidden xl:flex relative" ref="tabListRef">
		<ul
			class="flex-grow grid overflow-x-hidden items-center no-scrollbar whitespace-nowrap h-full"
			:class="tabMap?.[tabLength]"
		>
			<li
				v-for="(tab, i) in categoryList.slice(0, tabLength)"
				:id="`group_id_${i}`"
				class="py-[10px] mx-2 h-full relative text-justify"
			>
				<NuxtLink
					:href="`${
						tab.web_data.web_path ? '/' + newsType + '/' + tab.web_data.web_path : '/' + newsType
					}`"
					class="flex items-center justify-center rounded-[10px] font-bold h-full cursor-pointer text-[15px] truncate transition-all duration-200 bg-slate-300 bg-opacity-0 hover:bg-opacity-40"
					:class="`${sourcePath == tab.web_data.web_path ? 'bg-slate-300 bg-opacity-60' : ''} `"
				>
					<img
						:src="tab.web_data?.web_logo_path"
						class="h-[24px] w-[24px] border-[1px] border-white rounded-full justify-center flex scale-75"
						alt=""
					/>
					<span class="ml-1 truncate">
						{{ tab?.alias_name ? tab?.alias_name : tab?.rss_name }}
					</span>
				</NuxtLink>
			</li>
		</ul>

		<div
			:id="`category-list-${unique}`"
			class="w-full absolute top-[67px] h-0 z-0 opacity-0 transition-all duration-500 max-w-[1200px] bg-white rounded-lg flex-grow"
			@click="stop"
		>
			<ul
				:id="`category-list-ul-${unique}`"
				class="grid gap-2 m-4 h-0 overflow-x-hidden no-scrollbar whitespace-nowrap"
				:class="tabMap?.[moreTabLength]"
			>
				<li
					v-for="(tab, i) in categoryList.slice(tabLength, categoryList.length)"
					class="text-[16px] float-left"
				>
					<NuxtLink
						:href="`/${newsType}/${tab.web_data.web_path}`"
						class="h-full p-[6px] rounded-[6px] flex hover:bg-tab-hover hover:cursor-pointer"
						:class="`${sourcePath == tab.web_data.web_path ? 'bg-slate-300 bg-opacity-60' : ''} `"
					>
						<img
							:src="tab.web_data?.web_logo_path"
							class="h-[24px] w-[24px] rounded-full justify-center flex scale-75"
							alt=""
						/>
						<span class="ml-1">
							{{ tab?.alias_name ? tab?.alias_name : tab?.rss_name }}
						</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
		<div v-if="categoryList.length > tabLength" class="items-center hidden md:flex">
			<div
				class="flex mx-2 p-2 whitespace-nowrap text-[14px] rounded-md bg-opacity-0 bg-slate-300 hover:bg-opacity-40 transition-all cursor-pointer"
				@click="showCategoryList(false)"
			>
				{{ isExpand ? '收起' : '展开' }}
				<div class="">
					<Icon
						class="pointer-events-none"
						:name="`${isExpand ? 'uil:angle-up' : 'uil:angle-down'}`"
					></Icon>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ICategory } from '~/interface/rss'
import useNewsStore from '~/stores/news'
import useTechCategoryStore from '~/stores/tech'

interface IStyleOption {
	height: number
	fontSize: number
	scale: number
	padding: number
}

const props = withDefaults(
	defineProps<{
		unique: any
		styleOptions?: IStyleOption
		action?: string
		tabLength?: number
		sourcePath?: string
		newsType?: string
	}>(),
	{
		styleOptions: () => {
			return { height: 28, fontSize: 14, scale: 0.6, padding: 12 } as IStyleOption
		},
		action: 'switch',
		tabLength: 8,
		sourcePath: '',
		newsType: NEWS_KEY_CATEGORY_HOT_NEWS,
	},
)

const sourcePath = ref(props.sourcePath)
const newsType = ref(props.newsType)
var categoryStore: any
if (newsType.value == NEWS_KEY_CATEGORY_HOT_NEWS) {
	categoryStore = useNewsStore()
} else if (newsType.value == NEWS_KEY_CATEGORY_TECH) {
	categoryStore = useTechCategoryStore()
}

const list = await categoryStore.getNewsCategory()
const categoryList = ref(list.show as ICategory[])
if (!sourcePath.value) {
	sourcePath.value = categoryList.value[0].web_data.web_path as string
}

const isExpand = ref(false)
const showCategoryList = (forceHide: boolean) => {
	const element = document.getElementById('category-list-' + props.unique)
	const elementUl = document.getElementById('category-list-ul-' + props.unique)

	if (forceHide || element?.classList.contains('is-block')) {
		element?.classList.remove('is-block')
		elementUl?.classList.remove('h-auto')
		isExpand.value = false
	} else {
		element?.classList.add('is-block')
		elementUl?.classList.add('h-auto')
		isExpand.value = true
	}
}

const tabLength = ref(props.tabLength)
const moreTabLength = props.tabLength - 1

const tabMap = {
	1: 'grid-cols-1',
	2: 'grid-cols-2',
	3: 'grid-cols-3',
	4: 'grid-cols-4',
	5: 'grid-cols-5',
	6: 'grid-cols-6',
	7: 'grid-cols-7',
	8: 'grid-cols-8',
	9: 'grid-cols-9',
	10: 'grid-cols-10',
	11: 'grid-cols-11',
	12: 'grid-cols-12',
}

const idx = categoryList.value.findIndex((element) => {
	return element.web_data.web_path == props.sourcePath
})
if (idx > tabLength.value - 1) {
	categoryList.value.splice(tabLength.value, 0, categoryList.value[idx])
	tabLength.value = tabLength.value + 1
}

const refreshData = (list: ICategory[]) => {
	categoryList.value = list
}

// 阻止冒泡
const stop = ($event) => {
	$event.stopPropagation()
}

// 判断是否外部点击
const tabListRef = ref<null | HTMLElement>(null)
const isClickOutside = useClickOutside(tabListRef)
//通过watch来监听isClickOutside的变化
watch(isClickOutside, (newValue) => {
	if (isClickOutside.value) {
		showCategoryList(true)
	}
})

const emits = defineEmits(['refresh:news'])

const refreshNews = (category: ICategory) => {
	// sourcePath.value = category.web_data.web_path
	// emits('refresh:news', category)
	// navigateTo(`/${newsType.value}/${category.web_data.web_path}`)
}

defineExpose({ refreshData })
</script>

<style scoped>
.is-block {
	@apply visible opacity-100 h-auto z-[9999] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.1)];
}
</style>
