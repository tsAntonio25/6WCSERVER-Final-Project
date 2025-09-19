import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/admin/Dashboard.vue'
import Leaderboard from '@/views/admin/Leaderboard.vue'
import UserAC from '@/views/admin/UserAC.vue'

export default router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/admin/dashboard', // not sure
            name: 'admin_dashboard',
            component: Dashboard
        },
        {
            path: '/admin/leaderboard', // not sure
            name: 'admin_leaderboard',
            component: Leaderboard
        }, 
        {
            path: '/admin/userac', // not sure
            name: 'admin_userac',
            component: UserAC
        }
    ]

})