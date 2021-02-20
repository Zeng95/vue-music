import Vue from 'vue'
import VueRouter from 'vue-router'
import Singer from '@v/Singer.vue'
import Search from '@v/Search.vue'
import Toplist from '@v/Toplist.vue'
import Recommendations from '@v/Recommendations.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'recommendations' }
  },
  {
    path: '/recommendations',
    name: 'recommendations',
    component: Recommendations
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer
  },
  {
    path: '/toplist',
    name: 'toplist',
    component: Toplist
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
