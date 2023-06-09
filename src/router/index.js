import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView'
import login from '../components/login'
import Recruite from '../views/RecruiterView'
import Trainer from '../views/TrainerView'
import Support from '../views/SupportView'
import TrainerDashboard from '../views/TrainerDashboard'
import NotFound from '../views/NotFound'
import UploadChildren from '../views/uploadchildren'
import UploadCredentials from '../views/uploadCredential'


Vue.use(VueRouter)

function useidandenter(){

}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/signup',
    name:'signup',
    component:SignUpView
  },{
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/recruiter',
    name:'recruite',
    component:Recruite
  },
  {
    path:'/uploadchild',
    name:'upload',
    component:UploadChildren
  },
  {
    path:'/uploadcredentials',
    name:'uploadcredentials',
    component:UploadCredentials
  },
  {
   path:'/detail/:id',
   name:'ChildDetail',
   component: () => import(/* webpackChunkName: "about" */ '../views/Childdetail.vue')
  },
  {
    path:'/trainerdashboard/:id',
    name:'TrainerDashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/TrainerDashboard.vue')
  },
  {
    path:'/TraineeChilddetail/:id',
    name:'TraineeChildDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/TraineeChilddetail.vue')
  },
  {
     path:'/recruiterdashboard/:id',
     name:'RecruiterDashboard',
     component: () => import(/* webpackChunkName: "about" */ '../views/RecruiterDashboard.vue')
  },
  {
    path:'/recruiterchildedit/:id',
    name:'RecruiterChildEdit',
    component: () => import(/* webpackChunkName: "about" */ '../views/RecruiterchildEdit.vue')
  },
  {
    path:'/AdminDashboard/:id',
    name:'AdminDashboard',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/AdminDashboard.vue')
  },
  {
    path:'/adminTrainerinfo/:id',
    name:'AdminTrainerinfo',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/adminTrainerinfo.vue')
  },
  {
    path:'/adminChildren',
    name:'AdminChildren',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/AdminChildren.vue')
  },
  {
    path:'/adminCompletedReg',
    name:'AdminCompletedReg',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/AdminCompletedReg.vue')
  },
  {
    path:'/adminFundedKids',
    name:'AdminFundedKids',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/AdminFundedKids.vue')
  },
  {
    path:'/adminUnFundedKids',
    name:'AdminUnFundedKids',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/AdminUnFundedKids.vue')
  },
  {
    path:'/adminRecruiterChildren',
    name:'AdminRecruiterChildren',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/AdminRecruiterChildren.vue')
  },
  {
    path:'/adminTrainer',
    name:'AdminTrainer',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/AdminTrainer.vue')
  },
  {
    path:'/adminUncompletedReg',
    name:'AdminUncompletedReg',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/AdminUncompletedReg.vue')
  },
  {
    path:'/adminUnverifiedRecruits',
    name:'AdminUnverifiedRecruits',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/AdminUnverifiedRecruits.vue')
  },
  {
    path:'/adminVerifiedRecruits',
    name:'AdminverifiedRecruits',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/Admin/AdminVerifiedRecruits.vue')
  },
  {
    path:'/recruitchildupload/:id',
    name:'recruiterchildupload',
    component:()=>import(/*webpackChunkName:"AdminDashboard"*/'../views/RecruiterChildUpload.vue')
  },
  {
    path:'/trainer',
    name:'train',
    component:Trainer
  },{
    path:'/support',
    name:'support',
    component:Support
  },
  {
    path:'/notFound',
    name:'notFound',
    component:NotFound
  },
  {
    path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,

  },
  {
    path:'/trainerdashboard/:id',
    name:'trainerdashboard',
   // beforeEnter:useidandenter(),
    component:TrainerDashboard
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
