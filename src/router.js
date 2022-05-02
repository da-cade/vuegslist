import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/cars',
    name: 'CarsPage',
    component: loadPage('CarsPage')
  },
  {
    path: '/cars/:id',
    name: 'CarDetailsPage',
    component: loadPage('CarDetailsPage')
  },
  {
    path: '/houses',
    name: 'HousesPage',
    component: loadPage('HousesPage')
  },
  {
    path: '/houses/:id',
    name: 'HouseDetailsPage',
    component: loadPage('HouseDetailsPage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
