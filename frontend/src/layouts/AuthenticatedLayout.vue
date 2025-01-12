<script setup lang="ts">
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
  <main class="bg-surface-0 dark:bg-surface-950">
    <router-view />
  </main>
</template>

<style scoped></style>
