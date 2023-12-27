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
		// console.log('to.params.p', to)
		if ((to.params.p as unknown as number) > 3) {
			navigateTo(`/tech/${to.params.source}`, { external: true })
			return
		}
	},
})
const router = useRoute()
const routeSource = ref(router.params.source)
const p = ref(router.params.p as unknown as number)

if (p.value > 3) {
	navigateTo('/tech')
}
</script>
