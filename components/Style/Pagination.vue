<template>
	<div v-if="page <= pageCount" class="flex items-center cursor-pointer">
		<a
			class="custom-pagination-icon mr-2"
			:class="{ disabled: page == 1 }"
			:href="`${page > 1 ? generateUrl(page - 1) : 'javascript:;'}`"
		>
			<Icon size="18" name="material-symbols:chevron-left-rounded" />
		</a>
		<a
			v-if="1 !== page && prevPagesOption"
			:href="generateUrl(1)"
			class="custom-pagination-item"
			:class="{ active: pageCount == page && page == 1 }"
			>{{ 1 }}</a
		>

		<StylePopover v-if="prevPagesOption">
			<template #trigger>
				<span class="custom-pagination-item">
					<Icon name="mdi:dots-horizontal" />
				</span>
			</template>
			<div class="custom-pagination-container" :style="`--scroll: ${scrollPosition}%`">
				<div
					ref="prevScrollBoxRef"
					class="custom-pagination-scroll flex flex-col max-h-48 overflow-scroll gap:1 md:gap-2"
				>
					<a
						v-for="_page in prevPageOptionList"
						:key="_page"
						:href="generateUrl(_page)"
						class="text-center opacity-60 hover:bg-gray-100 hover:opacity-100 px-4 py-3"
						@click.prevent="emits('update:page', _page)"
						>{{ _page }}</a
					>
				</div>
			</div>
		</StylePopover>
		<a
			v-for="_page in items"
			:key="_page"
			:href="generateUrl(_page)"
			class="custom-pagination-item"
			:class="{ active: _page == page }"
			>{{ _page }}</a
		>
		<StylePopover v-if="nextPagesOption">
			<template #trigger>
				<span class="custom-pagination-item">
					<Icon name="mdi:dots-horizontal" />
				</span>
			</template>
			<div class="custom-pagination-container" :style="`--scroll: ${scrollPosition}%`">
				<div
					ref="nextScrollBoxRef"
					class="custom-pagination-scroll flex flex-col max-h-48 overflow-scroll gap-2"
				>
					<a
						v-for="_page in nextPageOptionList"
						:key="_page"
						:href="generateUrl(_page)"
						class="text-center opacity-60 hover:bg-gray-100 hover:opacity-100 px-3 py-2"
					>
						{{ _page }}
					</a>
				</div>
			</div>
		</StylePopover>
		<a
			v-if="pageCount !== page && nextPagesOption"
			:href="generateUrl(pageCount)"
			class="custom-pagination-item"
			:class="{ active: pageCount == page }"
			>{{ pageCount }}</a
		>

		<a
			class="custom-pagination-icon ml-2"
			:class="{ disabled: page == pageCount }"
			:href="`${page < pageCount ? generateUrl(Number(page) + 1) : 'javascript:;'}`"
		>
			<Icon size="18" name="material-symbols:chevron-right-rounded" />
		</a>
	</div>
</template>

<script setup lang="ts">
interface IProps {
	generateUrl: (pageNumber: number | string) => string
	pageCount: number
	page: number
	pageSlot?: number // 页码总数
	pageSize?: number
	pageSizes?: number[] // 每一页的条数选项
	showQuickJump?: boolean
	onUpdatePage?: (page: number) => void
	onUpdatePageSize?: (pageSize: number) => void
}
const props = withDefaults(defineProps<IProps>(), {
	pageSizes: () => [10, 30, 50],
	pageSize: 30,
	pageSlot: 5,
	showQuickJump: false,
	onUpdatePage: () => {},
	onUpdatePageSize: () => {},
})

const scrollPosition = ref(0)
const nextScrollBoxRef = ref<HTMLDivElement>()
const prevScrollBoxRef = ref<HTMLDivElement>()
const scrollbarColor = ref('transparent')

// 是否存在页码选项
const prevPagesOption = ref(false)
const nextPagesOption = ref(false)

const calcRangeList = () => {
	const pageCount = props.pageCount
	const pageSlot = props.pageSlot
	const page = Number(props.page)

	// 如果当前总数超过显示数量限制，则根据当前页码渲染
	if (page > pageSlot) {
		const initArray = Array.from({ length: pageSlot })
			.map((_, idx) => idx + page)
			.filter((i) => i <= pageCount)
		// 添加前选
		if (initArray[0] > 1) {
			prevPagesOption.value = true
		}
		// 添加后选
		if (initArray[initArray.length - 1] < pageCount) {
			nextPagesOption.value = true
		}
		// 如果不够 pageSlot 则补全
		while (initArray.length < pageSlot) {
			initArray.unshift(initArray[0] - 1)
		}
		return initArray
	} else {
		// 如果总页数超过支持显示的页数，则需要展示多选项
		if (pageCount > pageSlot) {
			nextPagesOption.value = true
		}
		return Array.from({ length: pageSlot })
			.map((_, idx) => idx + 1)
			.filter((i) => i <= pageCount)
	}
}
// 初始化
const items = ref(calcRangeList())

const generatePrevPageOptions = () => {
	const length = props.page - 1
	const result = Array.from({ length })
		.map((_, idx) => idx + 1)
		.filter((item) => item !== 1 && !items.value.includes(item))
	// 支持额外的一千页，超过则不显示
	return result.slice(0, 1000)
}

const generateNextPageOptions = () => {
	const itemLastValue = items.value[items.value.length - 1]
	const length = props.pageCount - itemLastValue
	const result = Array.from({ length })
		.map((_, idx) => idx + itemLastValue + 1)
		.filter((item) => item < props.pageCount)
	// 支持额外的一千页，超过则不显示
	return result.slice(0, 1000)
}

const prevPageOptionList = ref(generatePrevPageOptions())
const nextPageOptionList = ref(generateNextPageOptions())

const emits = defineEmits(['update:page'])

const onPrev = () => {
	if (props.page > 1) {
		emits('update:page', props.page - 1)
	}
}

const onNext = () => {
	if (props.page < props.pageCount) {
		emits('update:page', props.page + 1)
	}
}

// 页码变化之后，重新计算页码
watch(
	() => props.page,
	(_page) => {
		props.onUpdatePage?.(_page)
		if (!items.value.includes(_page)) {
			items.value = calcRangeList()
			prevPagesOption.value = _page > props.pageSlot
			if (prevPagesOption) {
				prevPageOptionList.value = generatePrevPageOptions()
			}
			nextPagesOption.value = _page < props.pageCount - props.pageSlot
			if (nextPagesOption.value) {
				nextPageOptionList.value = generateNextPageOptions()
			}
		}
	},
)

// 非服务端渲染重新生成分页组件
watch(
	() => props.pageCount,
	() => {
		prevPagesOption.value = false
		nextPagesOption.value = false
		items.value = calcRangeList()
	},
)

onMounted(() => {
	// prev scroll bar
	prevScrollBoxRef.value?.addEventListener('scroll', (e) => {
		// 计算滚动百分百
		const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement
		const percent = (scrollTop / (scrollHeight - clientHeight)) * 100
		scrollPosition.value = percent
	})
	prevScrollBoxRef.value?.addEventListener(
		'mouseenter',
		() => {
			if (prevScrollBoxRef.value) {
				// 检查scrollBox 是否存在滚动条
				const { scrollHeight, clientHeight } = prevScrollBoxRef.value
				scrollbarColor.value = scrollHeight > clientHeight ? '#2e2e2e50' : 'transparent'
			}
		},
		{ once: true },
	)
	// next scrollbar
	nextScrollBoxRef.value?.addEventListener('scroll', (e) => {
		// 计算滚动百分百
		const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement
		const percent = (scrollTop / (scrollHeight - clientHeight)) * 100
		scrollPosition.value = percent
	})
	nextScrollBoxRef.value?.addEventListener(
		'mouseenter',
		() => {
			if (nextScrollBoxRef.value) {
				// 检查scrollBox 是否存在滚动条
				const { scrollHeight, clientHeight } = nextScrollBoxRef.value
				scrollbarColor.value = scrollHeight > clientHeight ? '#2e2e2e50' : 'transparent'
			}
		},
		{ once: true },
	)
})
</script>

<style lang="scss" scoped>
.custom-pagination-icon {
	border-radius: 2px;
	padding: 5px;
	border: 1px solid var(--pagination-item-border);
	display: flex;
	justify-content: center;
	align-items: center;
	&.active,
	&:hover {
		color: var(--pagination-icon-color--hover);
		border: 1px solid var(--pagination-item-border--active);
	}
	&.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
}
.custom-pagination-item {
	border-radius: 3px;
	background-color: var(--pagination-item-bg); /* bg-gray-200 */
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto 0.75rem;
	min-width: 30px;
	min-height: 30px;
	font-size: 12px; /* text-[12px] text-center*/
	user-select: none; /* select-none */
	transition: all 0.2s;
	padding: 0 0.25rem; /* px-1 */
	border: 1px solid var(--pagination-item-border);
	&.active,
	&:hover {
		color: var(--pagination-item-color--active);
		background: var(--pagination-item-bg--active);
		border: 1px solid var(--pagination-item-border--active);
	}
	// &.active {
	//   animation: opacity-ease-in-out 0.7s ease-in-out;
	// }
}

.custom-pagination-container {
	display: flex;
	overflow: hidden;
	&::after {
		display: block;
		align-items: stretch;
		content: '';
		background: v-bind(scrollbarColor);
		width: 4px;
		border-radius: 4px;
		height: 8%;
		position: relative;
		top: min(92%, var(--scroll));
	}
}
.custom-pagination-scroll {
	position: relative;

	&::-webkit-scrollbar {
		display: none; /*隐藏滚动条,仅适用谷歌浏览器，IE下无效*/
		//firefox
		scrollbar-width: none;
		//IE 10+
		-ms-overflow-style: none;
	}
}
</style>
