import wmRequest from '../index'
import { IAccount, ILoginResult } from './types'
import { IDataType } from '../types'

enum LoginAPI {
	AccountLogin = '/login',
	GetMenuByUser = '/menu/init' // 获取到当前用户对应的菜单列表
}

export function accountLoginRequest(account: IAccount) {
	return wmRequest.post<IDataType<ILoginResult>>({
		url: LoginAPI.AccountLogin,
		data: account
	})
}
export function getMenuByUser() {
	return wmRequest.post<IDataType>({
		url: LoginAPI.GetMenuByUser,
		showLoading: false
	})
}
