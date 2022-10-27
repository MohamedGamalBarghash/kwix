<script setup>
import { useCompsStore } from '@/stores/comps';
const store = useCompsStore()
</script>

<template>
    <div class="width m-auto mr-0 mt-0 bg-slate-400 flex flex-col">
        <h3 class="text-xl font-bold text-white pt-2 font-mono">Build your own website below</h3>
        <div id="website" class="bg-white mx-3 overflow-auto">
            <block v-for="(item, index) of site_components" :key="item" :the_index="index" />
        </div>
        <div class="m-2 border-2 border-slate-500 rounded-xl">
            <div class="flex flex-col align-middle justify-center h-20 m-1 border-2 rounded-lg hover:bg-slate-300 hover:border-slate-500"
                @click="enableModal">
                <span class="m-auto font-bold">+ Add a component</span>
            </div>
        </div>
    </div>
    <Modal v-if="visible" @close="closeModal" />
</template>

<script>
import Modal from './Modal.vue'
import block from './block.vue'

export default {
    name: "Builder",
    data() {
        return {
            visible: false,
            site_components: null,
        };
    },
    created() {
        this.site_components = this.store.website_components
    },
    components: { Modal, block },
    methods: {
        // update_editor(theIndex) {
        //     this.$emit('new_component', theIndex)
        // },
        enableModal() {
            this.visible = true
        },
        closeModal() {
            this.visible = false
        },
    },

}
</script>

<style scoped>
.width {
    /* width: 100vw; */
    width: 60rem;
}

@media only screen and (max-width: 690px) {
  .width {
    width: 100vw;
    max-width: 75%;
  }
}
</style>