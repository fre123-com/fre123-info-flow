<template>
	<NuxtLayout name="news" :source="routeSource" :newsType="NEWS_KEY_CATEGORY_TECH"></NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false,
})

const router = useRoute()
const routeSource = ref(router.params.source)
</script>
