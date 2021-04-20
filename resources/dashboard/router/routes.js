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
				name: 'overview',
				path: 'overview',
				component: () => import(/* webpackChunkName: "dashboard-overview" */ '../pages/overview/overview.vue')
			},
			{
				name: 'calendar',
				path: 'calendar',
				component: () => import(/* webpackChunkName: "dashboard-calendar" */ '../pages/calendar/calendar.vue')
			},
			{
				name: 'conversations',
				path: 'conversations/:id?',
				component: () => import(/* webpackChunkName: "dashboard-conversations" */ '../pages/conversations/conversations.vue')
			},
			{
				path: 'services',
				name: 'services',
				component: () => import(/* webpackChunkName: "dashboard-services" */ '../pages/services/services.vue')
			},
			{
				path: 'booking-links',
				name: 'Custom Links',
				component: () => import(/* webpackChunkName: "dashboard-bookings-booking-links" */ '../pages/booking-links/index/index.vue')
			},
			{
				path: 'booking-links/:id',
				name: 'Custom Links',
				component: () => import(/* webpackChunkName: "dashboard-bookings-booking-links" */ '../pages/booking-links/show/show.vue')
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
						name: 'Contacts',
						component: () => import(/* webpackChunkName: "dashboard-contacts" */ '../pages/contacts/index/index.vue')
					},
					{
						path: ':id',
						name: 'contacts_show',
						component: () => import(/* webpackChunkName: "dashboard-contacts" */ '../pages/contacts/show/show.vue')
					}
				]
			},
			{
				name: 'packages',
				path: 'packages',
				component: () => import(/* webpackChunkName: "dashboard-bookings" */ '../pages/bookings/bookings.vue'),
				children: [
					{
						path: '/',
						name: 'packages_index',
						component: () => import(/* webpackChunkName: "dashboard-packages" */ '../pages/packages/index/index.vue')
					},
					{
						path: ':id',
						name: 'packages_show',
						component: () => import(/* webpackChunkName: "dashboard-bookings-packages-show" */ '../pages/packages/show/show.vue')
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
						name: 'Organizations',
						component: () => import(/* webpackChunkName: "dashboard-team-organizations" */ '../pages/team/organizations/index/index.vue')
					},
					{
						path: 'organizations/:id',
						name: 'Organizations',
						component: () => import(/* webpackChunkName: "dashboard-team-organizations-show" */ '../pages/team/organizations/show/show.vue')
					},
					{
						path: 'members',
						name: 'Members',
						component: () => import(/* webpackChunkName: "dashboard-team-members" */ '../pages/team/members/index/index.vue')
					},
					{
						path: 'members/:id',
						name: '',
						component: () => import(/* webpackChunkName: "dashboard-team-members-show" */ '../pages/team/members/show/show.vue')
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
						component: () => import(/* webpackChunkName: "dashboard-payments-subscriptions" */ '../pages/payments/subscriptions/subscriptions.vue')
					},
					{
						path: 'Invoices',
						name: 'invoices_index',
						component: () => import(/* webpackChunkName: "dashboard-payments-invoices" */ '../pages/payments/invoices/invoices.vue')
					}
				]
			},
			{
				name: 'account',
				path: 'account',
				component: () => import(/* webpackChunkName: "dashboard-account" */ '../pages/account/account.vue')
			},
			{
				name: 'billing',
				path: 'billing',
				component: () => import(/* webpackChunkName: "dashboard-billing" */ '../pages/billing/billing.vue')
			},
			{
				name: 'widget',
				path: 'widget',
				component: () => import(/* webpackChunkName: "dashboard-widget" */ '../pages/widget/widget.vue')
			},
			{
				path: 'integrations',
				name: 'integrations',
				component: () => import(/* webpackChunkName: "dashboard-integrations" */ '../pages/integrations/integrations.vue')
			},

			{
				path: 'integrations/xero',
				name: 'Xero Invoicing',
				component: () => import(/* webpackChunkName: "dashboard-integrations-xero" */ '../pages/integrations/xero/xero.vue')
			}
		]
	},
	{
		path: '*',
		component: () => import(/* webpackChunkName: "404" */ '../pages/404/404.vue')
	}
];

export default routes;
