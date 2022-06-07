import Vue from 'vue'
import VueRouter from 'vue-router'

const includPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return includPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home')
  },
  {
    path: '/echartsgl',
    name: 'EchartsGl',
    component: () => import('../views/echartsGl')
  },
  {
    path: '/scoreboard',
    name: 'Scoreboard',
    component: () => import('../views/scoreboard')
  },
  {
    path: '/indexedDB',
    name: 'IndexedDB',
    component: () => import('../views/indexedDB')
  },
  {
    path: '/elementTableFlxed',
    name: 'IlementTableFlxed',
    component: () => import('../views/elementTableFlxed')
  },
  {
    path: '/taskQueue',
    name: 'TaskQueue',
    component: () => import('../views/taskQueue')
  }
]

const router = new VueRouter({
  routes
})

export default router
