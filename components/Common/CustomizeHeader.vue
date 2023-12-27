<template>
	<div class="w-full bg-white">
		<div
			id="fre123-header"
			class="header-transition m-auto flex border-b-gray-50 custom-size sticky py-[15px]"
		>
			<div
				class="flex ml-[5%] xl:ml-[20px] md:flex-none overflow-hidden xl:w-[calc((100vw-1200px)/2-20px)] 2xl:w-[calc((100vw-1215px)/2-20px)]"
			>
				<a :href="WEB_HOST" target="_blank">
					<img class="header-logo transition-all hover:rotate-180" :src="APP_ICON" alt="" />
				</a>
				<a
					:href="WEB_HOST"
					target="_blank"
					class="header-text xl:ml-[10px] leading-[80px] md:text-[22px] hidden 2xl:block text-[#333]"
				>
					{{ headerText }}
				</a>
			</div>

			<div class="flex items-center justify-end flex-grow xl:flex-none xl:w-[1200px] text-center">
				<slot></slot>
			</div>
			<div class="flex flex-1 items-center justify-end mr-[5%] p-2 xl:mr-[20px]">
				<Icon
					size="40"
					class="flex p-2 rounded-md bg-slate-200 bg-opacity-0 transition-all duration-300 hover:bg-opacity-100 hover:cursor-pointer"
					name="uil:setting"
					@click="emits('setting:show-dialog')"
				></Icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		headerText?: string
	}>(),
	{
		headerText: APP_NAME,
	},
)

// 控制头部变化
const headerAnimation = (action: string) => {
	const headerDom = document.getElementById('fre123-header')

	if (headerDom) {
		if (action == 'smaller') {
			headerDom.classList.add('custom-size')
		} else {
			headerDom.classList.remove('custom-size')
		}
	}
}

const emits = defineEmits(['setting:show-dialog'])

defineExpose({ headerAnimation })
</script>

<style scoped>
.header-transition {
	transition: all 0.3s ease-in-out;
}

.header-logo {
	width: 80px;
	height: 80px;
}

.header-logo:hover {
	transform: rotate(360deg);
}

/* 头部固定类 */
.custom-size {
	padding-top: 0px;
	padding-bottom: 0px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	/* transition: all 0.2s ease-in-out; */
}

.custom-size img {
	width: 65px;
	height: 65px;
}

.custom-size .header-text {
	height: 65px;
	line-height: 65px;
	font-size: 22px;
}
</style>
