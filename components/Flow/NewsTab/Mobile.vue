<template>
	<div class="flex flex-row w-full h-full md:hidden flex-grow" ref="tabListRef">
		<ul
			class="flex-grow grid grid-cols-1 overflow-x-hidden items-center no-scrollbar whitespace-nowrap h-full"
		>
			<li class="py-[10px] mx-2 h-full relative" @click="showCategoryList(false)" ref="tabListRef">
				<div
					class="flex items-center justify-center rounded-[10px] font-bold h-full hover:cursor-pointer hover:bg-tab-hover text-[16px]"
				>
					<img
						:src="currSource?.web_data?.web_logo_path"
						class="h-[24px] w-[24px] border-[1px] border-white rounded-full justify-center flex scale-75"
						alt=""
					/>
					<span class="ml-1">
						{{ currSource?.alias_name ? currSource?.alias_name : currSource?.rss_name }}
					</span>
					<span>
						<Icon v-if="!isExpand" name="uil:angle-down"></Icon>
						<Icon v-else name="uil:angle-up"></Icon>
					</span>
				</div>
			</li>
		</ul>

		<div
			:id="`category-list-${unique}`"
			class="w-full absolute left-0 top-[67px] h-0 z-0 opacity-0 transition-all duration-500 max-w-[1200px] bg-white rounded-lg flex-grow"
			@click="stop"
		>
			<ul
				:id="`category-list-ul-${unique}`"
				class="grid grid-cols-2 gap-2 m-4 h-0 overflow-x-hidden no-scrollbar whitespace-nowrap"
			>
				<li
					v-for="(tab, i) in categoryList.slice(tabLength, categoryList.length)"
					class="text-[16px] float-left"
				>
					<a
						:href="`/${newsType}/${tab.web_data.web_path}`"
						data-toggle="pill"
						class="h-full p-[6px] rounded-[6px] flex hover:bg-tab-hover hover:cursor-pointer"
					>
						<img
							:src="tab.web_data?.web_logo_path"
							class="h-[24px] w-[24px] rounded-full justify-center flex scale-75"
							alt=""
						/>
						<span class="ml-1">
							{{ tab?.alias_name ? tab?.alias_name : tab?.rss_name }}
						</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="items-center hidden md:flex">
			<div
				class="h-[20px] mx-2 px-2 whitespace-nowrap text-[14px] hover:bg-base cursor-pointer"
				@click="showCategoryList(false)"
			>
				{{ isExpand ? '收起' : '展开' }}
				<Icon :name="`${isExpand ? 'uil:angle-up' : 'uil:angle-down'}`"></Icon>
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

const newsType = ref(props.newsType)
var categoryStore: any
if (newsType.value == NEWS_KEY_CATEGORY_HOT_NEWS) {
	categoryStore = useNewsStore()
} else if (newsType.value == NEWS_KEY_CATEGORY_TECH) {
	categoryStore = useTechCategoryStore()
}
const categoryData = await categoryStore.getNewsCategory()
const categoryList = ref(categoryData.show)

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

const tabLength = ref(1)

const currSource = ref<ICategory>()

categoryList.value.forEach((element, i) => {
	if (element.web_data.web_path == props.sourcePath) {
		// 如果在隐藏列表中，将数据提前到可展示区域最后一位
		if (Number(i) > tabLength.value - 1) {
			// console.log('原：sourceList：', sourceList.value)
			categoryList.value.splice(tabLength.value, 0, element)
			categoryList.value.splice(Number(i) + 1, 1)
			tabLength.value += 1
			// console.log('后：sourceList：', sourceList.value)
		}
		currSource.value = element
	}
})

const refreshData = (list: ICategory[]) => {
	categoryList.value = list
}
defineExpose({ refreshData })

// 阻止冒泡
const stop = ($event) => {
	$event.stopPropagation()
}

const tabListRef = ref<null | HTMLElement>(null)
const isClickOutside = useClickOutside(tabListRef)
//通过watch来监听isClickOutside的变化
watch(isClickOutside, (newValue) => {
	if (isClickOutside.value) {
		showCategoryList(true)
	}
})
</script>

<style scoped>
.is-block {
	@apply visible opacity-100 h-auto z-[9999] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.1)];
}

.anchor {
	position: absolute;
	height: 28px;
	/* width: 20px; */
	bottom: 0;
	opacity: 1;
	z-index: 0;
	border-bottom: 1.5px solid #007bff;
}

/* 隐藏滑动条开始*/
.no-scrollbar::-webkit-scrollbar {
	display: none;
}

.no-scrollbar {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>
