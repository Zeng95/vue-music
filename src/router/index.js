import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@v/Search/Search'
import Toplist from '@v/Toplist/Toplist'
import Singers from '@v/Singers/Singers'
import SingerDetails from '@v/Singers/Details'
import Recommendations from '@v/Recommendations/Recommendations'
import RecommendationDetails from '@v/Recommendations/Details'

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
    component: Recommendations,
    children: [
      {
        path: ':id/details',
        name: 'recommendationDetails',
        component: RecommendationDetails
      }
    ]
  },
  {
    path: '/singers',
    name: 'singers',
    component: Singers,
    children: [
      {
        path: ':id/details',
        name: 'singerDetails',
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
