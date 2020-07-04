import VueRouter from 'vue-router';
const routes = [
	{
		path: '',
		component: () => import(/* webpackChunkName: "admin/dashboard" */ '../components/dashboard.vue'),
	},
	{
		path: '/users',
		component: () => import(/* webpackChunkName: "admin/users" */ '../components/users/users.vue'),
	},
	{
		path: '/plans',
		component: () => import(/* webpackChunkName: "admin/plans" */ '../components/plans/plans.vue'),
	},
];

const router = new VueRouter({
	linkActiveClass: 'active',
	mode: 'history',
	routes: routes,
});

export default router;
