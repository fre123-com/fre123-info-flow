<template>
	<NuxtLayout name="news" :source="routeSource" :page="p"></NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false,
	middleware(to, from) {
		console.log('to.params.p', to)
		if ((to.params.p as unknown as number) > 3) {
			return navigateTo(`/news/${to.params.source}`, { external: true })
		}
	},
})
const router = useRoute()
const routeSource = ref(router.params.source)
const p = ref(router.params.p as unknown as number)
if (p.value > 3) {
	navigateTo('/news')
}
</script>
