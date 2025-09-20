// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';

// Components
import Header from '@/components/Header.vue';

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home // your home page
   },      
  { 
    path: '/login',
    name: 'Login',
    component: Login // login page
   }, 
   {
    path: '/register',
    name: 'Register',
    component: Register // register page
   },
   {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
   },
   //Components route
   {
    path: '/header',
    name: 'Header',
    component: Header
   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
