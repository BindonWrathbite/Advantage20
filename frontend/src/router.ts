import { createRouter, createWebHistory } from 'vue-router'
import { validateToken } from '@/api/A20'
import routes from '@/routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// sanity checks:
// - if the user is not logged in, they should be redirected to /login
// - if the user is logged in, they should be redirected to /
router.beforeEach((to, _, next) => {
  const authenticated = validateToken()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (authenticated && to.path === '/login') {
    next('/')
  } else if (requiresAuth && !authenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
