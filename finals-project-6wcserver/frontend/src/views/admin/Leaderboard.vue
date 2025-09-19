<script setup></script>

<template>
     <!-- dashboard container -->

    <!-- nav component-->
     <!-- <nav/> -->

    <div>
        <!-- header -->
        <h1>Leaderboard</h1>

        <div>
            <button>Reset Leaderboard</button>
        </div>
        <hr>
    
        <!-- get all users sorted by exp -->
        <div>
            <div></div> <!-- data  -->
        </div>

        <!-- NOTE: need data from db to get total num of users-->
        <div>
            <!-- count of all users with 10 limit per page-->
            <div>
                <p>Showing 1-10 of 78</p>
            </div>

            <!-- next and prev button -->
            <div>
                <button>&lt;</button>
                <button>&gt;</button>
            </div>
        </div>
    </div>


</template>