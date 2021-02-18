import Vue from 'vue'
import VueRouter from 'vue-router'
import Singer from '@v/Singer.vue'
import Search from '@v/Search.vue'
import Toplist from '@v/Toplist.vue'
import Recommendation from '@v/Recommendation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'recommendation' }
  },
  {
    path: '/recommendation',
    name: 'recommendation',
    component: Recommendation
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
