<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api/A20'

const username = ref('')
const password = ref('')

const handleLogin = () => {
  login(username.value, password.value)
    .then((data) => {
      console.log(`Login successful for ${data.username}`)
    })
    .catch((error) => {
      console.log('Login failed: ' + error)
    })
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped></style>
