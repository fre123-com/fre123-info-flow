export default defineNitroConfig({
	devProxy: {
		'/api': {
			target: '',
			changeOrigin: true,
		},
	},
})
