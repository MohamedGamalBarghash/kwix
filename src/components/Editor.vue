<script setup>
import { useCompsStore } from '@/stores/comps';
import { ref } from 'vue'

const store = useCompsStore()

// let theComponent = ref(store.website_components[store.editingIndex])
</script>

<template>
    <div class="w-2/12 bg-white p-5 border-2 border-slate-400">
        <h2 class="text-left text-3xl">
            <strong class="border-2 border-slate-600 text-slate-600">&lt;/&gt;</strong>
            Editor
            {{ store.editingIndex }}
        </h2>
        <div v-if="store.editingIndex != -1" class="flex flex-col text-left text-xl">
            <!-- Content options -->
            <div class='flex flex-row w-full align-middle'>
                <label for="content" class="font-bold">Content:</label>
            </div>
            <div class='flex flex-wrap w-full justify-center align-middle'>
                <input name="content" class="border-2 border-slate-600 max-w-full text-base" type="text"
                    v-model="store.website_components[store.editingIndex]['content']" />
                <input name="contentSize" class="border-2 border-slate-600 max-w-full text-base" type="number"
                    v-model="store.website_components[store.editingIndex]['contentSize']" @focusout="store.updateComp(store.website_components[store.editingIndex])" />
                <!-- <vue-number-input @update:model-value="store.website_components[store.editingIndex]['contentSize']"
                    v-model="store.website_components[store.editingIndex]['contentSize']" :min="1" inline>
                </vue-number-input> -->
                <color-input class="border-2 border-slate-700 m-auto" v-model="store.website_components[store.editingIndex]['contentColor']" />
            </div>
            <hr class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Block options -->
            <div v-if="store.website_components[store.editingIndex]['type'] !== 'nav'" class='flex flex-row w-full justify-center align-middle'>
                <label for="block" class="font-bold">Block:</label>
                <input name="block" class="ml-auto" type="checkbox" v-model="store.website_components[store.editingIndex]['block']" />
            </div>
            <hr class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Border options -->
            <div class='flex flex-row w-full align-middle'>
                <label for="border" class="font-bold">Border:</label>
            </div>
            <div class='flex flex-wrap w-full align-middle'>
                <input name="border" class="border-2 border-slate-600 max-w-full text-base m-auto" type="number"
                    v-model="store.website_components[store.editingIndex]['border']" />
                <color-input class="border-2 border-slate-700 m-auto" v-model="store.website_components[store.editingIndex]['borderColor']" />
            </div>
            <hr class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Background options -->
            <div class='flex flex-wrap w-full justify-center align-middle'>
                <label for="color" class="font-bold m-auto ml-0">Background color:</label>
                <color-input class="border-2 border-slate-700 m-auto" v-model="store.website_components[store.editingIndex]['bgColor']" />
            </div>
            <!-- <hr class="w-full border-t-2 border-slate-400 my-2" /> -->

            <!-- Image options -->
            <!-- <div class='flex flex-row w-full align-middle'>
                <label for="source" class="font-bold">Image:</label>
            </div>
            <div class="flex flex-row w-full align-middle">
                <input name="source" id="sourceImg" accept="image/*" class="ml-auto" type="file" @change="loadImg" />
            </div> -->
            <button class="font-bold bg-red-700 text-slate-100 px-5 py-1 m-auto mt-2" @click="remove_item">Remove
                Component</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Editor',
    data() {
        return {
            selectedFile: null
        }
    },
    methods: {
        remove_item() {
            // this.$emit('remove_comp', this.theIndex)
            this.store.removeComp(this.store.editingIndex)
            this.store.editingIndex = -1
        },
    },
}
</script>