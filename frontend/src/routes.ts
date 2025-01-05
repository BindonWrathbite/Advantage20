export default [
  // public routes
  { path: '/login', component: () => import('@/pages/Login.vue') },
  { path: '/allusia', component: () => import('@/pages/Allusia.vue') },

  // protected routes: user must be logged in
  {
    path: '/',
    component: () => import('@/layouts/AuthenticatedLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('@/pages/Home.vue') },
      { path: '/about', component: () => import('@/pages/About.vue') },
    ],
  },
]
