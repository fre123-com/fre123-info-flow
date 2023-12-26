<template>
	<NuxtLayout name="news" :source="routeSource"></NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false,
})

const router = useRoute()
const routeSource = ref(router.params.source)
</script>
