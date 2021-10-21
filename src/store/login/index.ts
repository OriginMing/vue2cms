import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../types'
import { accountLoginRequest, getMenuByUser } from '@/service/login/login'
import { IAccount } from '@/service/login/types'
import localCache from '@/utils/catch'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menu'
const loginModule: Module<ILoginState, IRootState> = {
	namespaced: true,
	state() {
		return {
			token: '',
			userInfo: {},
			userMenus: []
		}
	},
	getters: {},
	mutations: {
		changeToken(state, token: string) {
			state.token = token
		},
		changeUserInfo(state, userInfo: any) {
			state.userInfo = userInfo
		},
		changeUserMenus(state, userMenus: any) {
			state.userMenus = userMenus
			const routes = mapMenusToRoutes(userMenus)
			// 将routes => router.main.children
			routes.forEach((route) => {
				router.addRoute('main', route)
			})
		}
	},
	actions: {
		async accountLoginAction({ commit, dispatch }, payload: IAccount) {
			// 1.实现登录逻辑
			if (payload) {
				const tokenLocal = localCache.getCache('token')
				const loginResult = await accountLoginRequest(payload)
				const { id, token } = loginResult.data
				commit('changeToken', token)
				localCache.setCache('token', token)
			}
			const userMenusResult = await getMenuByUser()
			localCache.setCache('userMenus', userMenusResult.data)
			commit('changeUserMenus', userMenusResult.data)
			router.replace('/systemOverview/analyse')
		}
	}
}
export default loginModule
