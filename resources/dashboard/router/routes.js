const routes = [
	{
		path: '/dashboard',
		component: {
			render(c) {
				return c('router-view');
			}
		},
		children: [
			{
				name: 'conversations',
				path: 'conversations/:id?',
				component: () => import(/* webpackChunkName: "dashboard-conversations" */ '../components/conversations/conversations.vue')
			},
			{
				name: 'bookings',
				path: 'bookings',
				component: () => import(/* webpackChunkName: "dashboard-bookings" */ '../components/bookings/bookings.vue'),
				children: [
					{
						path: 'calendar',
						name: 'calendar',
						component: () => import(/* webpackChunkName: "dashboard-bookings-calendar" */ '../components/bookings/calendar/calendar.vue')
					},
					{
						path: 'services',
						name: 'services_index',
						component: () => import(/* webpackChunkName: "dashboard-bookings-services" */ '../components/bookings/services/index/index.vue')
					},
					{
						path: 'services/:id',
						name: 'services_show',
						component: () => import(/* webpackChunkName: "dashboard-bookings-services-show" */ '../components/bookings/services/show/show.vue')
					},
					{
						path: 'booking-links',
						name: 'booking-links',
						component: () => import(/* webpackChunkName: "dashboard-bookings-booking-links" */ '../components/bookings/booking-links/index/index.vue')
					},
					{
						path: 'booking-links/:id',
						name: 'booking-links_show',
						component: () => import(/* webpackChunkName: "dashboard-bookings-booking-links" */ '../components/bookings/booking-links/show/show.vue')
					}
				]
			},
			{
				path: 'contacts',
				name: 'contacts',
				component: {
					render(c) {
						return c('router-view');
					}
				},
				children: [
					{
						path: '/',
						name: 'contacts_index',
						component: () => import(/* webpackChunkName: "dashboard-contacts" */ '../components/contacts/index/index.vue')
					},
					{
						path: ':id',
						name: 'contacts_show',
						component: () => import(/* webpackChunkName: "dashboard-contacts" */ '../components/contacts/show/show.vue')
					}
				]
			},
			{
				name: 'packages',
				path: 'packages',
				component: () => import(/* webpackChunkName: "dashboard-bookings" */ '../components/bookings/bookings.vue'),
				children: [
					{
						path: '/',
						name: 'packages_index',
						component: () => import(/* webpackChunkName: "dashboard-packages" */ '../components/packages/index/index.vue')
					},
					{
						path: ':id',
						name: 'packages_show',
						component: () => import(/* webpackChunkName: "dashboard-bookings-packages-show" */ '../components/packages/show/show.vue')
					}
				]
			},

			{
				name: 'team',
				path: 'team',
				component: {
					render(c) {
						return c('router-view');
					}
				},
				children: [
					{
						path: 'organizations',
						name: 'organizations_index',
						component: () => import(/* webpackChunkName: "dashboard-team-organizations" */ '../components/team/organizations/index/index.vue')
					},
					{
						path: 'organizations/:id',
						name: 'organizations_show',
						component: () => import(/* webpackChunkName: "dashboard-team-organizations-show" */ '../components/team/organizations/show/show.vue')
					},
					{
						path: 'members',
						name: 'members_index',
						component: () => import(/* webpackChunkName: "dashboard-team-members" */ '../components/team/members/index/index.vue')
					},
					{
						path: 'members/:id',
						name: 'members_show',
						component: () => import(/* webpackChunkName: "dashboard-team-members-show" */ '../components/team/members/show/show.vue')
					}
				]
			},
			{
				name: 'payments',
				path: 'payments',
				component: {
					render(c) {
						return c('router-view');
					}
				},
				children: [
					{
						path: 'subscriptions',
						name: 'subscriptions_index',
						component: () => import(/* webpackChunkName: "dashboard-payments-subscriptions" */ '../components/payments/subscriptions/subscriptions.vue')
					},
					{
						path: 'Invoices',
						name: 'invoices_index',
						component: () => import(/* webpackChunkName: "dashboard-payments-invoices" */ '../components/payments/invoices/invoices.vue')
					}
				]
			},
			{
				name: 'account',
				path: 'account',
				component: () => import(/* webpackChunkName: "dashboard-account" */ '../components/account/account.vue')
			},
			{
				name: 'billing',
				path: 'billing',
				component: () => import(/* webpackChunkName: "dashboard-billing" */ '../components/billing/billing.vue')
			},
			{
				name: 'widget',
				path: 'widget',
				component: () => import(/* webpackChunkName: "dashboard-widget" */ '../components/widget/widget.vue')
			},
			{
				path: 'integrations',
				name: 'integrations',
				component: () => import(/* webpackChunkName: "dashboard-integrations" */ '../components/integrations/integrations.vue')
			}
		]
	}
];

export default routes;
