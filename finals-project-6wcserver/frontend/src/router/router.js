// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Finance from '@/views/Finance.vue';
import Leaderboard from '@/views/Leaderboard.vue';
import Profile from '@/views/Profile.vue';
import Password from '@/views/Password.vue';

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
    component: Dashboard // Dashboard page
   },
   {
    path: '/finance',
    name: 'Finance',
    component: Finance // Finance page (add, expenses)
   },
   {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard // Leaderboard page
   },
   {
    path: '/profile',
    name: 'Profile',
    component: Profile // Profile page
   },
   {
    path: '/password',
    name: 'Password',
    component: Password // Change Password page
   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
