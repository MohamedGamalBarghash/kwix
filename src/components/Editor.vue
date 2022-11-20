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
                <textarea name="content" class=" w-full border-2 border-slate-600 max-w-full text-base"
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
                <div v-if="check_style('float')" style="overflow: auto;">
                    <button @click="align('left')" class="material-symbols-outlined">
                        format_align_left
                    </button>
                    <button @click="align('none')" class="material-symbols-outlined">
                        format_align_center
                    </button>
                    <button @click="align('right')" class="material-symbols-outlined">
                        format_align_right
                    </button>
                </div>
                <color-input class="border-2 border-slate-700 m-auto" v-model="store.website_components[store.editingIndex]['styles']['color']" />
            </div>
            <hr v-if="check('content')" class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Dimension options -->
            <div v-if="check_style('height')" class='flex flex-row w-full align-middle'>
                <label for="height" class="font-bold">Dimensions:</label>
            </div>
            <div v-if="check_style('height')" class='flex flex-wrap w-full justify-center align-middle'>
                <div class="w-full flex flex-row">
                    <label for="height" class="text-base m-auto ml-0">Height: </label>
                    <input name="height" class="border-2 border-slate-600 m-auto mr-0 max-w-full text-base" type="number"
                        min='2' v-model="height" />
                </div>
                <div class="w-full flex flex-row">
                    <label for="width" class="text-base m-auto ml-0">Width: </label>
                    <input name="width" class="border-2 border-slate-600 m-auto mr-0 max-w-full text-base" type="number"
                        min='2' v-model="width" />
                </div>
            </div>
            <hr v-if="check_style('height')" class="w-full border-t-2 border-slate-400 my-2" />

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

            <!-- Margin options -->
            <div v-if="check_style('margin')" class='flex flex-row w-full align-middle'>
                <label for="border" class="font-bold">Margin:</label>
            </div>
            <div v-if="check_style('margin')" class='flex flex-wrap w-full align-middle'>
                <div class="w-full flex flex-row">
                    <label for="margin_top" class="text-base m-auto ml-0">Top:</label>
                    <input name="margin_top" class="border-2 border-slate-600 max-w-full text-base m-auto mr-0" type="number"
                        min='0' v-model="margin_top" />
                </div>
                <div class="w-full flex flex-row">
                    <label for="margin_right" class="text-base m-auto ml-0">Right:</label>
                    <input name="margin_right" class="border-2 border-slate-600 max-w-full text-base m-auto mr-0" type="number"
                        min='0' v-model="margin_right" />
                </div>
                <div class="w-full flex flex-row">
                    <label for="margin_bottom" class="text-base m-auto ml-0">Bottom:</label>
                    <input name="margin_bottom" class="border-2 border-slate-600 max-w-full text-base m-auto mr-0" type="number"
                        min='0' v-model="margin_bottom" />
                </div>
                <div class="w-full flex flex-row">
                    <label for="margin_left" class="text-base m-auto ml-0">Left:</label>
                    <input name="margin_left" class="border-2 border-slate-600 max-w-full text-base m-auto mr-0" type="number"
                        min='0' v-model="margin_left" />
                </div>
            </div>
            <hr v-if="check_style('margin')" class="w-full border-t-2 border-slate-400 my-2" />

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
    updated() {

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
                this.store.website_components[this.store.editingIndex]['styles']['display'] = (newValue == true ? 'block' : 'inline-block')
                this.store.website_components[this.store.editingIndex]['styles']['padding'] = (newValue == true ? '0px' : '0px 10px 0px 10px')
                this.store.website_components[this.store.editingIndex]['styles']['float'] = 'none'
            }
        },
        height: {
            // getter
            get: function () {
                return parseInt(this.store.website_components[this.store.editingIndex]['styles']['height'].replace('px', ''))
            },
            // setter
            set: function (newValue) {
                if(newValue == '')
                    this.store.website_components[this.store.editingIndex]['styles']['height'] = 'auto'
                else
                    this.store.website_components[this.store.editingIndex]['styles']['height'] = newValue.toString()+'px'
            }
        },
        width: {
            // getter
            get: function () {
                return parseInt(this.store.website_components[this.store.editingIndex]['styles']['width'].replace('px', ''))
            },
            // setter
            set: function (newValue) {
                if(newValue == '')
                    this.store.website_components[this.store.editingIndex]['styles']['width'] = 'auto'
                else
                    this.store.website_components[this.store.editingIndex]['styles']['width'] = newValue.toString()+'px'
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
        margin_top: {
            // getter
            get: function () {
                return parseInt(this.store.website_components[this.store.editingIndex]['styles']['margin-top'].replace('em', ''))
            },
            // setter
            set: function (newValue) {
                this.store.website_components[this.store.editingIndex]['styles']['margin-top'] = newValue.toString()+'em'
            }
        },
        margin_right: {
            // getter
            get: function () {
                return parseInt(this.store.website_components[this.store.editingIndex]['styles']['margin-right'].replace('em', ''))
            },
            // setter
            set: function (newValue) {
                this.store.website_components[this.store.editingIndex]['styles']['margin-right'] = newValue.toString()+'em'
            }
        },
        margin_bottom: {
            // getter
            get: function () {
                return parseInt(this.store.website_components[this.store.editingIndex]['styles']['margin-bottom'].replace('em', ''))
            },
            // setter
            set: function (newValue) {
                this.store.website_components[this.store.editingIndex]['styles']['margin-bottom'] = newValue.toString()+'em'
            }
        },
        margin_left: {
            // getter
            get: function () {
                return parseInt(this.store.website_components[this.store.editingIndex]['styles']['margin-left'].replace('em', ''))
            },
            // setter
            set: function (newValue) {
                this.store.website_components[this.store.editingIndex]['styles']['margin-left'] = newValue.toString()+'em'
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
        },
        align (dir) {
            this.store.website_components[this.store.editingIndex]['styles']['float'] = dir
            this.store.website_components[this.store.editingIndex]['styles']['display'] = 'inline-block'
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