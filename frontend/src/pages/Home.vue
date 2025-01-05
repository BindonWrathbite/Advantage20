<script setup lang="ts">
// Script (js/ts.etc)
import { logout } from '@/api/A20'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  logout().then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <!--HTML Code - Template-->
  <div>
    <span class="text-3xl text-red-800 font-bold">Home</span>
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="handleLogout">
      Logout
    </button>
  </div>
</template>

<style>
/* CSS Code - Style */
</style>
