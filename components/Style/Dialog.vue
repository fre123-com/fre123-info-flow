<template>
	<div
		class="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,.8)] z-[10000] items-center flex"
		@click="cancel()"
	>
		<div
			class="w-[80%] xl:[60%] h-[500px] overflow-hidden bg-white m-auto z-[100001] rounded-lg shadow-lg p-4 relative"
			ref="dialogRef"
			@click="stop"
		>
			<div class="text-[20px] text-black font-bold pb-4 border-b-[2px] sticky">
				<slot name="dialog-title"> 只是标题 </slot>
				<Icon
					name="uil:x"
					size="20"
					class="absolute right-0 top-0 cursor-pointer hover:text-red-500"
					@click="cancel()"
				></Icon>
			</div>
			<div class="pt-4 max-h-[370px] overflow-scroll no-scrollbar">
				<slot name="dialog-content"> 这是内容 </slot>
			</div>
			<div class="absolute bottom-[10px] left-0 bg-white w-full">
				<div
					class="float-left px-4 py-2 rounded-lg ml-4 border-[1px] border-slate-200 bg-white hover:bg-[#ecf5ff] cursor-pointer"
					@click="init()"
				>
					恢复默认
				</div>

				<div
					class="float-right px-4 py-2 rounded-lg mr-4 text-white font-bold bg-[#409eff] hover:bg-[#337ecc] cursor-pointer"
					@click="confirm()"
				>
					确定
				</div>
				<div
					class="float-right px-4 py-2 rounded-lg mr-4 border-[1px] border-slate-200 bg-white hover:bg-[#ecf5ff] cursor-pointer"
					@click="reset()"
				>
					重置
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	elementRef?: Ref<HTMLElement>
}>()

const dialogRef = ref<null | HTMLElement>(null)
// const isClickOutside = useClickOutside(dialogRef)
// //通过watch来监听isClickOutside的变化
// watch(isClickOutside, (newValue) => {
// 	if (isClickOutside.value) {
// 		isShow.value = false
// 	}
// })

const stop = ($event) => {
	$event.stopPropagation()
}

const emits = defineEmits(['dialog:confirm', 'dialog:cancel', 'dialog:reset', 'dialog:init'])
const confirm = () => {
	emits('dialog:confirm')
}

const cancel = () => {
	emits('dialog:cancel')
}

const reset = () => {
	emits('dialog:reset')
}

const init = () => {
	emits('dialog:init')
}
</script>
