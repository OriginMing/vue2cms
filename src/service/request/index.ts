import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import type { WMRequestConfig, WMRequestInterceptors } from './types'
import { ElLoading } from 'element-plus'
const defaultLoadingStatus = true
class WMRequest {
	instance: AxiosInstance
	showLoading: boolean
	loading?: ILoadingInstance
	interceptors?: WMRequestInterceptors
	constructor(config: WMRequestConfig) {
		this.instance = axios.create(config)
		this.showLoading = config.showLoading ?? defaultLoadingStatus
		this.interceptors = config.interceptors
		// 1.从config中取出的拦截器是对应的实例的拦截器
		//这样就可以使实例DIY自己的拦截器，更加颗粒化的实现
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptors,
			this.interceptors?.requsetInterceptorsCatch
		)
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptors,
			this.interceptors?.responseInterceptorsCatch
		)
		//  // 2.添加所有的实例都有的拦截器
		this.instance.interceptors.request.use(
			(config) => {
				if (this.showLoading) {
					this.loading = ElLoading.service({
						lock: true,
						text: '正在请求数据...',
						background: 'rgba(0,0,0,0.5)'
					})
				}
				return config
			},
			(err) => {
				return err
			}
		)
		this.instance.interceptors.response.use(
			(res) => {
				this.loading?.close()
				const data = res.data
				return data
			},
			(err) => {
				return err
			}
		)
	}
	request<T = any>(config: WMRequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 1.单个请求对请求config的处理
			if (config.interceptors?.requestInterceptors) {
				config = config.interceptors.requestInterceptors(config)
			}
			// 2.判断是否需要显示loading
			if (config.showLoading === false) {
				this.showLoading = config.showLoading
			}
			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 1.单个请求对数据的处理
					if (config.interceptors?.responseInterceptors) {
						res = config.interceptors.responseInterceptors(res)
					}
					// 2.将showLoading设置true, 这样不会影响下一个请求
					this.showLoading = defaultLoadingStatus
					// 3.将结果resolve返回出去
					resolve(res)
				})
				.catch((err) => {
					// 将showLoading设置true, 这样不会影响下一个请求
					this.showLoading = defaultLoadingStatus
					reject(err)
					return err
				})
		})
	}

	get<T = any>(config: WMRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' })
	}

	post<T = any>(config: WMRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' })
	}

	delete<T = any>(config: WMRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' })
	}

	patch<T = any>(config: WMRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PATCH' })
	}
}

export default WMRequest
