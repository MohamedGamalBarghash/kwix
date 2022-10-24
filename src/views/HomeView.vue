<script setup>
import { useCompsStore } from '@/stores/comps.js'
const store = useCompsStore()
</script>

<template>
  <div class="home">
    <HelloWorld />
    <div class="flex flex-row w-full">
      <Builder />
      <Editor />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Builder from '@/components/Builder.vue'
import Editor from '@/components/Editor.vue'

// import { useCompsStore } from '@/stores/comps.js'
// const store = useCompsStore()
// console.log(store)

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Builder,
    Editor
  },
  data() {
    return {
      daIndex: -1,
      daComponent: {},
    }
  },
  beforeUpdate() {
    this.daComponent = this.store.website_components[this.daIndex]
  },
}
</script>
