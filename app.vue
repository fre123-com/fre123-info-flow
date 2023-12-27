<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import { SEO_TITLE_SUFFIX } from './utils/const'

// 初始化 SEO_TITLE 模板和主题
useHead({
	titleTemplate: (s) => {
		return s ? `${s} - ${SEO_TITLE_SUFFIX}` : `${SEO_TITLE_SUFFIX}`
	},
})
</script>
