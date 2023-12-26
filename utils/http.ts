import { $fetch, FetchOptions } from 'ohmyfetch'

import type { Ref } from 'vue'

const baseURL = import.meta.env.VITE_BASE_URL as string
const backendHost = process.env.NUXT_BACKEND_API
const appId = process.env.NUXT_APP_ID
const appToken = process.env.NUXT_APP_TOKEN

console.log('appid is ', appId)
console.log('appToken is ', appToken)
console.log('backendHost is ', backendHost)

export const fetchInstance = $fetch.create({
	baseURL,
	retry: 0,
	headers: {
		'Content-Type': 'application/json',
		'APP-ID': appId as string,
		'APP-Token': appToken as string,
	},
	// @ts-ignore
	onRequest: ({ options, request }) => {
		console.log('baseURL:', options.baseURL)
		console.log('request:', request)
	},
	// @ts-ignore
	onResponse({ response, options }) {
		// 状态码正常则拆出 data 返回
		// console.log('options is ', options)
		// console.log('response is ', response._data)
		const parseData = JSON.parse(response._data)
		if (parseData.status === 0) {
			response._data = {
				...parseData.data,
			}
		} else {
			response._data = {
				...parseData,
			}
		}
	},
})

export const postApi = <T>(
	url: string,
	options: FetchOptions & {
		key?: string
		body?: Ref<Record<string, any>> | Record<string, any>
		forceUpdate?: boolean
	} = {},
) => {
	// console.log('body is ', options)
	return useAsyncData(options?.key ?? url, () => {
		if (options?.forceUpdate === true) {
			refreshNuxtData(options?.key ?? url)
		}
		return fetchInstance<T>(url, {
			method: 'POST',
			baseURL: process.client ? baseURL : backendHost,
			...options,
			// @ts-ignore
			body: isRef(options?.body) ? options.body.value : options.body,
		})
	})
}
