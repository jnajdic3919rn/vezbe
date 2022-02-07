import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Department from '@/views/Department.vue';
import Category from '@/views/Category.vue';
import Single from '@/views/Single.vue';
import SinglePaint from '@/views/SinglePaint.vue';
import Search from '@/views/Search.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/department/:id/:name',
    name: 'Department',
    component: Department
  },
  {
    path: '/category/:id/:name',
    name: 'Category',
    component: Category
  },
  {
    path: '/single/:id',
    name: 'Single',
    component: Single
  },
  {
    path: '/singlepaint/:id',
    name: 'SinglePaint',
    component: SinglePaint
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes 
});

export default router;
