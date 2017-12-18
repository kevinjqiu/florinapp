export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-grid',
    },
    {
      name: 'Accounts',
      url: '/accounts',
      icon: 'icon-wallet',
    },
    {
      name: 'Transactions',
      url: '/transactions',
      icon: 'icon-book-open',
    },
    {
      name: 'Budgets',
      url: '/budgets',
      icon: 'icon-calculator',
    },
    {
      divider: true
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-options',
      children: [
        {
          name: 'Categories',
          url: '/settings/categories',
          icon: 'icon-pie-chart'
        },
        {
          name: 'Tags',
          url: '/settings/tags',
          icon: 'icon-tag'
        },
      ]
    }
  ]
};
