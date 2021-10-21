import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface WMRequestInterceptors<T = AxiosResponse> {
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
	requsetInterceptorsCatch?: (err: any) => any
	responseInterceptors?: (res: T) => T
	responseInterceptorsCatch?: (err: any) => any
}
export interface WMRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: WMRequestInterceptors<T>
	showLoading?: boolean
}
