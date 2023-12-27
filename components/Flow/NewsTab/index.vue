<template>
	<FlowNewsTabPC
		ref="SlidePCRef"
		class="hidden xl:flex"
		:unique="currSource?.rss_name"
		:tabLength="tabLength"
		:sourcePath="currSource?.web_data.web_path"
		:newsType="newsType"
	>
	</FlowNewsTabPC>
	<FlowNewsTabPC
		ref="SlidePadRef"
		class="hidden md:flex xl:hidden"
		:unique="`pad_${currSource?.rss_name}`"
		:tabLength="tabLength - 3"
		:sourcePath="currSource?.web_data.web_path"
		:newsType="newsType"
	></FlowNewsTabPC>
	<FlowNewsTabMobile
		class="flex md:hidden"
		ref="SlideMobileRef"
		:unique="`mobile_${currSource?.rss_name}`"
		:tabLength="tabLength"
		:newsType="newsType"
		:sourcePath="currSource?.web_data.web_path"
	></FlowNewsTabMobile>
	<!-- 自定义分类 -->
	<FlowNewsTabCategorySetting
		v-if="showSettingCategory"
		:showList="showList"
		:hideList="hideList"
		:newsType="newsType"
		@setting:save-category="confirmSetting"
		@setting:close-dialog="closeSettingDialog"
		@setting:show-dialog="showSettingDialog"
	></FlowNewsTabCategorySetting>
</template>

<script setup lang="ts">
import { type ICategory } from '~/interface/rss'

const props = defineProps<{
	tabLength: number
	source: string
	showList: ICategory[]
	hideList: ICategory[]
	newsType: string
}>()

const showList = ref(props.showList)
const hideList = ref(props.hideList)

const tabLength = ref(props.tabLength)

const showSettingCategory = ref(false)
const SlidePCRef = ref()
const SlidePadRef = ref()
const SlideMobileRef = ref()
const confirmSetting = (dataList: ICategory[], hiddenList: ICategory[]) => {
	showSettingCategory.value = false
	// console.log('datalist', dataList.length)
	showList.value = dataList
	hideList.value = hiddenList
	SlidePCRef.value.refreshData(dataList)
	SlidePadRef.value.refreshData(dataList)
	SlideMobileRef.value.refreshData(dataList)
}

const showSettingDialog = () => {
	// console.log('showList', showList.value)
	showSettingCategory.value = true
}

const closeSettingDialog = (list: ICategory[]) => {
	showSettingCategory.value = false
	// console.log('initShowList', list)
	showList.value = list
}

// 获取当前分类来
const currSource = ref<ICategory>()
currSource.value = props.showList.findLast((element) => {
	return element.web_data.web_path == props.source
})

// const emits = defineEmits(['update:switch'])
// const triggerSwitch = (category: ICategory) => {
// 	emits('update:switch', category)
// }

defineExpose({ showSettingDialog })
</script>

<style scoped></style>
