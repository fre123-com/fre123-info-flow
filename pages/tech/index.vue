<template>
	<NuxtLayout
		name="news"
		:source="routeSource"
		:page="p"
		:newsType="NEWS_KEY_CATEGORY_TECH"
	></NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false,
	middleware(to, from) {
		console.log('to.query.p', to.query.p)
		if ((to.query.p as unknown as number) > 3) {
			navigateTo(`/tech`, {
				external: true,
			})
			return
		}
	},
})
const router = useRoute()
const routeSource = ref('')
const p = ref(router.query.p as unknown as number)
</script>
