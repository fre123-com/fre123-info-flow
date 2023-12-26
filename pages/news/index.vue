<template>
	<NuxtLayout name="news" :source="routeSource" :page="p"></NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false,
	middleware(to, from) {
		console.log('to.query.p', to.query.p)
		if ((to.query.p as unknown as number) > 3) {
			return navigateTo(`/news`, { external: true })
		}
	},
})
const router = useRoute()
const routeSource = ref('')
const p = ref(router.query.p)
</script>
