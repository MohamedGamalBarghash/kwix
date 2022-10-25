<script setup>
import { useCompsStore } from '@/stores/comps';

const store = useCompsStore()
</script>

<template>
    <div class="width m-auto ml-0 mt-0 bg-white p-5 border-2 border-slate-400">
        <h2 class="text-left text-3xl">
            <strong class="border-2 border-slate-600 text-slate-600">&lt;/&gt;</strong>
            Editor
            <!-- {{ store.editingIndex }} -->
        </h2>
        <div v-if="store.editingIndex != -1" class="flex flex-col text-left text-xl">
            <!-- Content options -->
            <div v-if="check('content')" class='flex flex-row w-full align-middle'>
                <label for="content" class="font-bold">Content:</label>
            </div>
            <div v-if="check('content')" class='flex flex-wrap w-full justify-center align-middle'>
                <input name="content" class="border-2 border-slate-600 max-w-full text-base" type="text"
                    v-model="store.website_components[store.editingIndex]['content']" />
                <input name="contentSize" class="border-2 border-slate-600 max-w-full text-base" type="number"
                    min='2' v-model="contentSize" />
                <select v-if="check_style('font-weight')" class="border-2 border-slate-600 max-w-full text-base" v-model="store.website_components[store.editingIndex].styles['font-weight']">
                    <option value="normal">normal</option>
                    <option value="bold">bold</option>
                </select>
                <select v-if="check_style('font-style')" class="border-2 border-slate-600 max-w-full text-base" v-model="store.website_components[store.editingIndex].styles['font-style']">
                    <option value="normal">normal</option>
                    <option value="italic">italic</option>
                    <option value="oblique">oblique</option>
                </select>
                <color-input class="border-2 border-slate-700 m-auto" v-model="store.website_components[store.editingIndex]['styles']['color']" />
            </div>
            <hr v-if="check('content')" class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Block options -->
            <div v-if="check_style('display')" class='flex flex-row w-full justify-center align-middle'>
                <label for="block" class="font-bold">Block:</label>
                <input name="block" class="ml-auto" type="checkbox" v-model="block" />
            </div>
            <hr v-if="check_style('display')" class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Border options -->
            <div v-if="check_style('border')" class='flex flex-row w-full align-middle'>
                <label for="border" class="font-bold">Border:</label>
            </div>
            <div v-if="check_style('border')" class='flex flex-wrap w-full align-middle'>
                <input name="border" class="border-2 border-slate-600 max-w-full text-base m-auto" type="number"
                    min='0' v-model="border" />
                <color-input class="border-2 border-slate-700 m-auto" v-model="store.website_components[store.editingIndex]['styles']['border-color']" />
            </div>
            <hr v-if="check_style('border')" class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Background options -->
            <div v-if="check_style('background-color')" class='flex flex-wrap w-full justify-center align-middle'>
                <label for="color" class="font-bold m-auto ml-0">Background color:</label>
                <color-input class="border-2 border-slate-700 m-auto" v-model="store.website_components[store.editingIndex]['styles']['background-color']" />
            </div>
            <hr v-if="check_style('background-color')" class="w-full border-t-2 border-slate-400 my-2" />

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
    computed: {
        contentSize: {
            // getter
            get: function () {
                return parseInt(this.store.website_components[this.store.editingIndex]['styles']['font-size'].replace('px', ''))
            },
            // setter
            set: function (newValue) {
                this.store.website_components[this.store.editingIndex]['styles']['font-size'] = newValue.toString()+'px'
            }
        },
        block: {
            // getter
            get: function () {
                return this.store.website_components[this.store.editingIndex]['styles']['display'] == 'block' ? true : false
            },
            // setter
            set: function (newValue) {
                this.store.website_components[this.store.editingIndex]['styles']['display'] = newValue == true ? 'block' : 'inline-block'
                this.store.website_components[this.store.editingIndex]['styles']['padding'] = newValue == true ? '0px' : '0px 10px 0px 10px'
            }
        },
        border: {
            // getter
            get: function () {
                return parseInt(this.store.website_components[this.store.editingIndex]['styles']['border'].replace('px', ''))
            },
            // setter
            set: function (newValue) {
                this.store.website_components[this.store.editingIndex]['styles']['border'] = newValue.toString() + 'px'
            }
        },
    },
    methods: {
        remove_item() {
            this.store.removeComp(this.store.editingIndex)
            this.store.editingIndex = -1
        },
        check(item) {
            if (this.store.website_components[this.store.editingIndex][item] === undefined) {
                return false
            } else {
                return true
            }
        },
        check_style(item) {
            if (this.store.website_components[this.store.editingIndex]['styles'][item] === undefined) {
                return false
            } else {
                return true
            }
        }
    },
}
</script>

<style scoped>
.width {
    width: 100vw;
    min-width: 15rem;
    max-width: 30rem;
}

@media only screen and (max-width: 690px) {
  .width {
    width: 100vw;
    max-width: 25%;
  }
}
</style>