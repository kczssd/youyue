import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Infor_change from '../views/Infor_change.vue'
import Intro from '../views/Intro.vue'
import Infor_confirm from '../views/Infor_confirm.vue'
import Result from '../views/Result.vue'
import Success from '../views/Success.vue'
import Failure from '../views/Failure.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/infor_change',
    name: 'Infor_change',
    component: Infor_change
  },
  {
    path: '/intro',
    name: 'Intro',
    component: Intro
  },
  {
    path: '/infor_confirm',
    name: 'Infor_confirm',
    component: Infor_confirm,
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
  },
  {
    path: '/success',
    name: 'Success',
    component: Success,
  },
  {
    path: '/failure',
    name: 'Failure',
    component: Failure,
  }
]

const router = new VueRouter({
  routes
})

export default router
