import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '帝可得', icon: 'dashboard' }
    }]
  },
  {
    path: '/WorkOrder',
    component: Layout,
    redirect: '/WorkOrder',
    name: 'WorkOrder',
    meta: { title: '工单管理', icon: 'jl' },
    children: [
      {
        path: 'operate',
        name: 'operate',
        component: () => import('@/views/WorkOrder/operate'),
        meta: { title: '运营工单' }
      },
      {
        path: 'operations',
        name: 'operations',
        component: () => import('@/views/WorkOrder/operations'),
        meta: { title: '运维工单' }
      }
    ]
  },
  {
    path: '/PointPosition',
    component: Layout,
    redirect: '/PointPosition',
    name: 'PointPosition',
    meta: { title: '点位管理', icon: 'jl' },
    children: [
      {
        path: 'region',
        name: 'region',
        component: () => import('@/views/PointPosition/region'),
        meta: { title: '区域管理' }
      },
      {
        path: 'points',
        name: 'points',
        component: () => import('@/views/PointPosition/points'),
        meta: { title: '点位管理' }
      },
      {
        path: 'partners',
        name: 'partners',
        component: () => import('@/views/PointPosition/partners'),
        meta: { title: '合作商管理' }
      }
    ]
  },
  {
    path: '/Equipment',
    component: Layout,
    redirect: '/Equipment',
    name: 'Equipment',
    meta: { title: '设备管理', icon: 'cdz' },
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/Equipment/manage'),
        meta: { title: '设备管理' }
      },
      {
        path: 'state',
        name: 'state',
        component: () => import('@/views/Equipment/state'),
        meta: { title: '设备状态' }
      },
      {
        path: 'deviceType',
        name: 'deviceType',
        component: () => import('@/views/Equipment/deviceType'),
        meta: { title: '设备类型管理' }
      }
    ]
  },
  {
    path: '/Personnel',
    component: Layout,
    redirect: '/Personnel',
    name: 'Personnel',
    meta: { title: '人员管理', icon: 'wo' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/Personnel/list'),
        meta: { title: '人员管理' }
      },
      {
        path: 'human',
        name: 'human',
        component: () => import('@/views/Personnel/human'),
        meta: { title: '人效统计' }
      },
      {
        path: 'workload',
        name: 'workload',
        component: () => import('@/views/Personnel/workload'),
        meta: { title: '工作量统计' }
      }
    ]
  },
  {
    path: '/Commodity',
    component: Layout,
    redirect: '/Commodity',
    name: 'Commodity',
    meta: { title: '商品管理', icon: 'pt' },
    children: [
      {
        path: 'typeproduct',
        name: 'typeproduct',
        component: () => import('@/views/Commodity/typeproduct'),
        meta: { title: '商品类型' }
      },
      {
        path: 'epmbba',
        name: 'epmbba',
        component: () => import('@/views/Commodity/epmbba'),
        meta: { title: '商品管理' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/Strategy',
    children: [{
      path: 'Strategy',
      name: 'Strategy',
      component: () => import('@/views/Strategy/index'),
      meta: { title: '策略管理', icon: 'dd' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/OrderTube',
    children: [{
      path: 'OrderTube',
      name: 'OrderTube',
      component: () => import('@/views/OrderTube/index'),
      meta: { title: '订单管理', icon: 'zd' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/Reconciliation',
    children: [{
      path: 'Reconciliation',
      name: 'Reconciliation',
      component: () => import('@/views/Reconciliation/index'),
      meta: { title: '对账统计', icon: 'zdo' }
    }]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
