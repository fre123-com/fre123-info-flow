<template>
	<footer class="text-left text-[#6c757d] p-6 bg-[rgba(248,249,250,1)] h-[70px]">
		<section class="flex justify-center">
			<!-- Left -->
			<div class="text-[14px] h-[30px]">
				<span
					>2023
					<a
						href="https://www.fre123.com"
						target="_blank"
						class="decoration-transparent text-[#a4715c]"
						>FRE123</a
					>
					· All rights reserved</span
				>
			</div>
			<!-- Left -->

			<div class="flex-grow"></div>
			<!-- Right -->
			<div class="flex text-[20px] text-black">
				<!-- GitHub Icon -->
				<a href="https://github.com/fre123-com" target="_blank" class="pr-6 w-">
					<IconsFontAwesome :size="20" class="hover:text-[#0d6efd]" icon="fab fa-github" />
				</a>

				<!-- Telegram Icon -->
				<a
					href="https://t.me/howie_weekly"
					target="_blank"
					class="pr-6 items-start justify-start flex"
				>
					<IconsFontAwesome :size="20" class="hover:text-[#0d6efd]" icon="fab fa-telegram-plane" />
					<!-- <Icon name="uil:telegram-alt" class="text-[24px]"></Icon> -->
				</a>

				<!-- Blog Icon -->
				<a href="http://weekly.howie6879.com/" target="_blank" class="pr-6">
					<IconsFontAwesome :size="20" class="hover:text-[#0d6efd]" icon="fas fa-blog" />
				</a>

				<!-- WeChat Icon -->
				<a
					href="https://cdn.jsdelivr.net/gh/howie6879/weekly/src/statics/wechat.jpeg"
					target="_blank"
					class="pr-6"
				>
					<IconsFontAwesome :size="20" class="hover:text-[#0d6efd]" icon="fas fa-qrcode" />
				</a>
			</div>
		</section>
	</footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
