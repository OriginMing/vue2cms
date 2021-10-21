const personManger = () => import('@/views/main/personManger/personManger.vue')
export default {
	path: '/personManger/index',
	name: 'personManger',
	component: personManger,
	children: []
}
