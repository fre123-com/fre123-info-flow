<template>
	<div>
		<StyleDialog
			ref="categoryRef"
			class="flex flex-col"
			@dialog:confirm="saveSettingCategory"
			@dialog:cancel="closeDialog"
			@dialog:reset="resetData"
			@dialog:init="initData"
		>
			<template #dialog-title> 自定义分类配置 </template>
			<template #dialog-content>
				<div class="flex flex-col">
					<div>
						<VueDraggable
							class="text-sm float-left grid gap-2 p-2 grid-cols-2 md:grid-cols-6 xl:grid-cols-10 w-full border-dashed border-[3px]"
							animation="300"
							v-model="initShowList"
							group="news-category"
							key="rss_name"
							handle=".sort-target"
							ref="el1"
						>
							<div
								class="bg-gray-200 flex float-left rounded-lg p-2 truncate cursor-move"
								v-for="(item, i) in initShowList"
								:class="`${item.web_data.web_path ? 'sort-target' : ''}`"
								:key="item.rss_url"
							>
								<img :src="item.web_data?.web_logo_path" class="w-[20px] h-[20px]" alt="" />
								<span class="ml-1">
									{{ item.alias_name ? item.alias_name : item.rss_name }}
								</span>
							</div>
						</VueDraggable>
					</div>

					<div class="w-full mt-[10px]">
						<p class="pl-2 pt-[10px] text-left text-lg font-bold">不启用</p>
						<VueDraggable
							key="rss_name"
							class="text-sm float-left grid gap-2 p-2 grid-cols-2 md:grid-cols-6 xl:grid-cols-10 w-full border-dashed border-[3px]"
							:class="`${initHideList.length > 0 ? '' : 'min-h-[100px]'}`"
							animation="300"
							v-model="initHideList"
							group="news-category"
							ref="el2"
						>
							<div
								class="bg-gray-200 flex float-left rounded-lg p-2 truncate cursor-move"
								v-for="(item, i) in initHideList"
								:key="item.rss_url"
							>
								<img :src="item.web_data?.web_logo_path" class="w-[20px] h-[20px]" alt="" />
								<span class="ml-1">
									{{ item.alias_name ? item.alias_name : item.rss_name }}
								</span>
							</div>
						</VueDraggable>
					</div>
				</div>
			</template>
		</StyleDialog>
	</div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import type { ICategory } from '~/interface/rss'
import useNewsStore from '~/stores/news'
import useTechCategoryStore from '~/stores/tech'

const props = defineProps<{
	showList: ICategory[]
	hideList: ICategory[]
	newsType: string
}>()

const newsType = ref(props.newsType)

var categoryStore: any
if (newsType.value == NEWS_KEY_CATEGORY_HOT_NEWS) {
	categoryStore = useNewsStore()
} else if (newsType.value == NEWS_KEY_CATEGORY_TECH) {
	categoryStore = useTechCategoryStore()
}

const emits = defineEmits(['setting:save-category', 'setting:close-dialog'])

// 更新排序

const initShowList = ref(JSON.parse(JSON.stringify(props.showList)))
const initHideList = ref(JSON.parse(JSON.stringify(props.hideList)))

const initCategoryList = ref()
initCategoryList.value = useCustomizeLocalStorage.get(
	newsType.value,
	BUSINESS_NEWS_INIT_SOURCE,
) as ICategory[]

const saveSettingCategory = () => {
	const showListIdx: string[] = []
	initShowList.value.forEach((element) => {
		showListIdx.push(element.rss_name)
	})
	categoryStore.setSettingNewsCategory('show', showListIdx)

	const hideListIdx: string[] = []
	initHideList.value.forEach((element) => {
		hideListIdx.push(element.rss_name)
	})
	categoryStore.setSettingNewsCategory('hide', hideListIdx)

	emits('setting:save-category', initShowList.value, initHideList.value)
}

const resetData = () => {
	initShowList.value = JSON.parse(JSON.stringify(props.showList))
	initHideList.value = JSON.parse(JSON.stringify(props.hideList))
}

const initData = () => {
	initShowList.value = initCategoryList.value
	initHideList.value = []
}

const closeDialog = () => {
	resetData()
	emits('setting:close-dialog', initShowList.value)
}
</script>
