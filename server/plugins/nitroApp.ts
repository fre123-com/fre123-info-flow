// 在 Nitro 引擎运行时调用，用于编写服务端插件，从而可以修改或扩展引擎的默认行为

// 利用 render:html 钩子修改了最终渲染的 html 内容，并在响应时打了一条日志
export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook('render:html', (html, { event }) => {
		// console.log('render:html', html)
		// html.bodyAppend.push('<hr>Appended by custom plugin')
	})
	nitroApp.hooks.hook('render:response', (response, { event }) => {
		// console.log('render:response', response)
	})
})
