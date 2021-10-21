import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import login from './login'
const store = createStore<IRootState>({
	state() {
		return {
			entireMenu: [],
			entireRole: []
		}
	},
	getters: {},
	mutations: {
		changeEntrireRole(state, list) {
			state.entireRole = list
		},
		changeEntrireMenu(state, list) {
			state.entireMenu = list
		}
	},
	actions: {},
	modules: {
		login
	}
})
export function useStore(): Store<IStoreType> {
	return useVuexStore()
}

export function setupStore() {
  store.dispatch('login/accountLoginAction')
  // store.dispatch('getInitialDataAction')
}

export default store
