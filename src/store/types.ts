import { ILoginState } from './login/type'
export interface IRootState {
	entireRole: any[]
	entireMenu: any[]
}
export interface IRootWithModule {
	login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
