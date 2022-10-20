<template>
  <div class="home">
    <HelloWorld />
    <div class="flex flex-row w-full">
      <Builder @new_component="edit_index" @new_compo="add_new_comp" :website_comps="website_components" />
      <Editor @update="updater" @remove_comp="remove_component" :index="daIndex" :ourComponent="daComponent"
        @apply="apply_changes" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Builder from '@/components/Builder.vue'
import Editor from '@/components/Editor.vue'

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
      website_components: []
    }
  },
  beforeUpdate() {
    this.daComponent = this.website_components[this.daIndex]
  },
  methods: {
    edit_index(index) {
      this.daIndex = index
      // console.log(this.website_components)
    },
    add_new_comp(new_item) {
      this.website_components.push(new_item)
    },
    remove_component(rm_index) {
      this.website_components.splice(rm_index, 1)
    },
    apply_changes(component) {
      this.website_components[this.daIndex] = component
    },
    updater() {
      this.$forceUpdate()
    }
  },
}
</script>
