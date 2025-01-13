<script setup lang="ts">
import {zodResolver} from '@primevue/forms/resolvers/zod'
import {z} from 'zod'
import type {FormSubmitEvent} from '@primevue/forms/form'
import {create} from '@/api/A20'

const resolver = zodResolver(
  z.object({
    name: z.string({ message: 'Name is required' }).max(100),
    description: z.string({ message: 'Description is required' }),
    slug: z.string({message: 'Slug is required'}).regex(/^[a-z](-?[a-z])*$/g)
  })
)

const submit = (event: FormSubmitEvent) => {
  if (event.valid) {
    create('worlds',{
      name: event.values.name,
      description: event.values.description,
      slug: event.values.slug
    }).catch((e) => {
      console.log(e)
    })
  }
}
</script>

<template>
  <Panel header="Create World">
    <Form :resolver @submit="submit">
      <FloatLabel variant="on">
        <InputText id="name" name="name" />
        <label for="name">Name</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <Textarea id="description" name="description" />
        <label for="description">Description</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="slug" name="slug" />
        <label for="slug">URL</label>
      </FloatLabel>
      <Button type="submit" label="Submit" />
    </Form>
  </Panel>
</template>

<style scoped></style>
