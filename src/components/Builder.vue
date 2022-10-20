<template>
    <div class="w-10/12 bg-slate-400 flex flex-col">
        <h3 class="text-xl font-bold text-white pt-2 font-mono">Build your own website below</h3>
        <div id="website" class="bg-white mx-3">
            <block v-for="(item, index) of site_components" :key="item" :website_component="item" :the_index="index"
                @click="update_editor(index)" />
        </div>
        <div class="m-2 border-2 border-slate-500 rounded-xl">
            <div class="flex flex-col align-middle justify-center h-20 m-1 border-2 rounded-lg hover:bg-slate-300 hover:border-slate-500"
                @click="enableModal">
                <span class="m-auto font-bold">+ Add a component</span>
            </div>
        </div>
    </div>
    <Modal @new_comp="recieve_new" v-if="visible" @close="closeModal" />
</template>

<script>
import Modal from './Modal.vue'
import block from './block.vue'
import { ref } from 'vue'

export default {
    name: "Builder",
    data() {
        return {
            visible: false,
            site_components: null,
        };
    },
    emits: [
        'new_compo',
        'new_component'
    ],
    props: [
        'website_comps'
    ],
    created() {
        this.site_components = ref(this.website_comps)
    },
    components: { Modal, block },
    methods: {
        recieve_new(new_item) {
            this.$emit('new_compo', new_item)
        },
        update_editor(theIndex) {
            this.$emit('new_component', theIndex)
        },
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

</style>