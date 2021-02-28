import Vue from 'vue'
import VueRouter from 'vue-router'
import Singers from '@v/Singers'
import SingerDetails from '@v/SingerDetails'
import Search from '@v/Search'
import Toplist from '@v/Toplist'
import Recommendations from '@v/Recommendations'

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
    path: '/singers',
    name: 'singers',
    component: Singers,
    children: [
      {
        path: ':id/details',
        name: 'SingerDetails',
        component: SingerDetails
      }
    ]
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
