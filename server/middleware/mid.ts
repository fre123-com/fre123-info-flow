// 服务端中间件 直接作用于全局
export default defineEventHandler((event) => {
	// console.log('New request: ' + event.node.req.url)
})
