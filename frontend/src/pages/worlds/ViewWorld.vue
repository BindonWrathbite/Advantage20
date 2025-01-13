<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRoute} from "vue-router";
import {get} from "@/api/A20";

const route = useRoute()

const data = ref()
onMounted(() => {
  console.log(route.params)
  get(`worlds/${route.params.slug}`)
    .then((world) => {
      data.value = world
    })
    .catch((e) => {
      console.log(e)
    })
  console.log('mounted')
})
</script>

<template>
  Page render
  {{ data?.name }}
  {{ data?.description }}
</template>

<style scoped></style>
