import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Finance from '@/views/Finance.vue';
import Leaderboard from '@/views/Leaderboard.vue';
import Profile from '@/views/Profile.vue';
import Password from '@/views/Password.vue';
import { jwtDecode } from 'jwt-decode';
import AdminDash from '@/views/Admin/AdminDash.vue';
import AdminLead from '@/views/Admin/AdminLead.vue';
import AdminUser from '@/views/Admin/AdminUser.vue';


const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home // home page
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
    component: Dashboard, // Dashboard page
    meta: { requiresAuth: true }
   },
   {
    path: '/finance',
    name: 'Finance',
    component: Finance, // Finance page (add, expenses)
    meta: { requiresAuth: true }
   },
   {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard, // Leaderboard page
    meta: { requiresAuth: true }
   },
   {
    path: '/profile',
    name: 'Profile',
    component: Profile, // Profile page
    meta: { requiresAuth: true }

   },
   {
    path: '/password',
    name: 'Password',
    component: Password, // Change Password page
    meta: { requiresAuth: true }
   },
   {
    path: '/admindash',
    name: 'AdminDash',
    component: AdminDash, // Admin Dashboard Page
   },
   {
    path: '/adminlead',
    name: 'AdminLead',
    component: AdminLead, // Admin Dashboard Page
   },
   {
    path: '/adminuser',
    name: 'AdminUser',
    component: AdminUser, // Admin Dashboard Page
   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  const publicPages = ["/", "/login", "/register"];

  // if user not authenticated, redirect to login
  if (!publicPages.includes(to.path) && !token) {
    return next("/login"); 
  }

  // if user is logged in, cannot access login or register unless they log out
  if (token){
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now){
        localStorage.clear();
        return next('/login');
      }

      if (to.path === "/login" || to.path === "/register") {
        return next("/dashboard");
      }
    } catch (err) {
      localStorage.clear();
      return next("/login");
    }
  }
  
  next();

});

export default router;
