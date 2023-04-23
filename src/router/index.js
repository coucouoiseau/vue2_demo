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
  },
  {
    path: '/richEditor',
    name: 'RichEditor',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/richEditor')
  },
  {
    path: '/icon',
    name: 'Icon',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/icon')
  },
  {
    path: '/tableTree',
    name: 'TableTree',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/tableTree')
  },
  {
    path: '/threeJS',
    name: 'ThreeJS',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/threeJS')
  },
  {
    path: '/popperDemo',
    name: 'PopperDemo',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/popperDemo')
  },
  {
    path: '/draggableDemo',
    name: 'DraggableDemo',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/draggableDemo')
  },
  {
    path: '/videoList',
    name: 'VideoList',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/videoList')
  },
  {
    path: '/article',
    name: 'article',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/article')
  },
  {
    path: '/eltableFixed',
    name: 'eltableFixed',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/eltableFixed')
  },
  {
    path: '/dhtmlxGantt',
    name: 'dhtmlxGantt',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/dhtmlxGantt')
  },
  {
    path: '/highchartsGantt',
    name: 'highchartsGantt',
    // component: () => import('../components/tinymce-comp')
    component: () => import('../views/highchartsGantt')
  },
]

const router = new VueRouter({
  routes
})

export default router
