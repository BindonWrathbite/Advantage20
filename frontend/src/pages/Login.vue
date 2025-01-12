<script setup lang="ts">
import { login } from '@/api/A20'
import { useRouter } from 'vue-router'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import type { FormSubmitEvent } from '@primevue/forms/form'

const router = useRouter()

const resolver = zodResolver(
  z.object({
    username: z.string({ message: 'Username is required' }),
    password: z.string({ message: 'Password is required' }),
  })
)

const handleLogin = (event: FormSubmitEvent) => {
  if (event.valid) {
    login(event.values.username, event.values.password)
      .then((data) => {
        console.log(`Login successful for ${data.username}`)
      })
      .catch((error) => {
        console.log('Login failed: ' + error)
      })
  }
}
</script>

<template>
  <div class="min-h-screen bg-splash bg-cover bg-no-repeat flex items-center justify-around">
    <Panel class="w-[450px] opacity-85">
      <template #header>
        <div class="w-100 flex flex-col">
          <h1 class="text-2xl font-bold">Login</h1>
          Please sign in to continue.
        </div>
      </template>
      <Form
        v-slot="$form"
        v-auto-animate
        class="flex flex-col gap-2 items-center"
        :resolver="resolver"
        @submit="handleLogin"
      >
        <div class="flex flex-col gap-1 w-full">
          <InputGroup>
            <InputGroupAddon>
              <i-solar-shield-user-bold />
            </InputGroupAddon>
            <FloatLabel variant="on">
              <InputText id="username" name="username" variant="filled" fluid />
              <label for="username">Username</label>
            </FloatLabel>
          </InputGroup>
          <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
            {{ $form.username.error.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1 w-full">
          <InputGroup>
            <InputGroupAddon>
              <i-solar-shield-keyhole-bold />
            </InputGroupAddon>
            <FloatLabel variant="on">
              <InputText id="password" name="password" type="password" variant="filled" fluid />
              <label for="password">Password</label>
            </FloatLabel>
          </InputGroup>
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
            {{ $form.password.error.message }}
          </Message>
        </div>
        <Button type="submit" fluid>Login</Button>
        <p>or</p>
        <Button variant="outlined" fluid @click="router.push('/register')">Create account</Button>
      </Form>
    </Panel>
  </div>
</template>

<style scoped></style>
