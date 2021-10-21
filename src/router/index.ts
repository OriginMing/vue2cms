import { createWebHashHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import localCatch from '@/utils/catch'
import { firstMenu } from '@/utils/map-menu'
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/login.vue')
	},
	{
		path: '/main',
		name: 'main',
		component: () => import('@/views/main/main.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		component: () => import('@/views/not-found/not-found.vue')
	}
]

const router = createRouter({
	routes,
	history: createWebHashHistory()
})
router.beforeEach((to) => {


	if (to.path != '/login') {
		const token = localCatch.getCache('token')
		if (!token) {
			return '/login'
		}
	}if(to.path=='/main'){
    return firstMenu.url;
  }
})

export default router
