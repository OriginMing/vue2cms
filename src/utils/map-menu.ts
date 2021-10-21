import type { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
	const routes: RouteRecordRaw[] = []
	// 1.先去加载默认所有的routes
	const allRoutes: RouteRecordRaw[] = []
	const routeFiles = require.context('../router/main', true, /\.ts/)
	routeFiles.keys().forEach((key) => {
		//./personManger/personManger.ts
		const route = require('../router/main' + key.split('.')[1])
		allRoutes.push(route.default)
	})
	const _recurseGetRoute = (menus: any) => {
		console.log(menus)
		for (const menu of menus) {
			if (menu.type == 2) {
				//代表无子元素直接注册路由
				const route = allRoutes.find((route) => route.path === menu.url)
				if (route) routes.push(route)
				if (!firstMenu) {
					firstMenu = menu
				}
			} else {
				_recurseGetRoute(menu.children)
			}
		}
	}
	_recurseGetRoute(userMenus)

	return routes
}

export function pathMapToMenu(userMenus: any[], currentPath: string): any {
	console.log(userMenus)
	for (const menu of userMenus) {
		if (menu.type === 1) {
			const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
			if (findMenu) {
				return findMenu
			}
		} else if (menu.type === 2 && menu.url === currentPath) {
			return menu
		}
	}
}
export { firstMenu }
