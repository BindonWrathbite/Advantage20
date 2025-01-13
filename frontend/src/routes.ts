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
      { path: '/worlds/create', component: () => import('@/pages/worlds/CreateWorld.vue') },
      { path: '/worlds/:slug', component: () => import('@/pages/worlds/ViewWorld.vue') },
      { path: '/about', component: () => import('@/pages/About.vue') },
    ],
  },
]
