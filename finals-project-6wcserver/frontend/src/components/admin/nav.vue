<script setup>
// imports
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div>
        <!-- Image Logo -->
        <h1>Iponly Logo</h1>

        <!-- Navigation -->
        <nav>
            <router-link>Dashboard</router-link>
            <router-link>Leaderboard</router-link>
            <router-link>User Access Control</router-link>
        </nav>

        <!-- Go Back to user side -->
        <div>
            <router-link></router-link>
        </div>
    </div>
</template>