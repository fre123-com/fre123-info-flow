<template>
	<VueDraggable class="text-sm float-left" ref="el" v-model="dataList" group="news-category">
		<div
			class="bg-gray-200 float-left ml-2 mt-2 rounded-lg p-1 truncate cursor-move"
			v-for="item in dataList"
			:key="item.rss_name"
		>
			{{ item.rss_name }}
		</div>
	</VueDraggable>

	<div class="h-[3px] my-[20px] w-full float-left"></div>

	<VueDraggable class="text-sm float-left" ref="el" v-model="dataList2" group="news-category">
		<div
			class="bg-gray-200 float-left ml-2 mt-2 rounded-lg p-1 truncate cursor-move"
			v-for="item in dataList2"
			:key="item.rss_name"
		>
			{{ item.rss_name }}
		</div>

		<div class="h-[3px] my-[20px] w-full float-left"></div>
	</VueDraggable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import type { ICategory } from '~/interface/rss'
const props = defineProps<{
	dataList: ICategory[]
}>()

const dataList = ref(props.dataList)

console.log('props.dataList', dataList)
const dataList2 = ref(props.dataList)
console.log('props.dataList2', dataList2)
</script>
