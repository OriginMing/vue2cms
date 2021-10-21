import { BASE_URL, TIME_OUT } from './request/config'
import WMRequest from './request/index'
import localCache from '@/utils/catch'
const wmRequest = new WMRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requestInterceptors: (config) => {
			// 携带token的拦截
			const token = localCache.getCache('token')
			if (token) {
				config.headers!.Authorization = `Bearer ${token}` //!非空断言
				//Authorization: `Bearer ${token}`
			}
			return config
		},
		requsetInterceptorsCatch: (err) => {
			return err
		},
		responseInterceptors: (res) => {
			return res
		},
		responseInterceptorsCatch: (err) => {
			return err
		}
	}
})
export default wmRequest
