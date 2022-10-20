<template>
    <div class="w-2/12 bg-white p-5 border-2 border-slate-400">
        <h2 class="text-left text-3xl">
            <strong class="border-2 border-slate-600 text-slate-600">&lt;/&gt;</strong>
            Editor
            {{ theIndex }}
        </h2>
        <div v-if="theIndex != -1" class="flex flex-col text-left text-xl">
            <!-- Content options -->
            <div class='flex flex-row w-full align-middle'>
                <label for="content" class="font-bold">Content:</label>
            </div>
            <div class='flex flex-wrap w-full justify-center align-middle'>
                <input name="content" class="border-2 border-slate-600 max-w-full text-base" type="text"
                    v-model="theComponent['content']" />
                <input name="contentSize" class="border-2 border-slate-600 max-w-full text-base" type="number"
                    v-model="theComponent['contentSize']" @change="forceUpdate" />
                <!-- <vue-number-input @update:model-value="theComponent['contentSize']"
                    v-model="theComponent['contentSize']" :min="1" inline>
                </vue-number-input> -->
                <color-input class="border-2 border-slate-700 m-auto" v-model="theComponent['contentColor']" />
            </div>
            <hr class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Block options -->
            <div v-if="theComponent['type'] !== 'nav'" class='flex flex-row w-full justify-center align-middle'>
                <label for="block" class="font-bold">Block:</label>
                <input name="block" class="ml-auto" type="checkbox" v-model="theComponent['block']" />
            </div>
            <hr class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Border options -->
            <div class='flex flex-row w-full align-middle'>
                <label for="border" class="font-bold">Border:</label>
            </div>
            <div class='flex flex-wrap w-full align-middle'>
                <input name="border" class="border-2 border-slate-600 max-w-full text-base m-auto" type="number"
                    @change="forceUpdate" v-model="theComponent['border']" />
                <color-input class="border-2 border-slate-700 m-auto" v-model="theComponent['borderColor']" />
            </div>
            <hr class="w-full border-t-2 border-slate-400 my-2" />

            <!-- Background options -->
            <div class='flex flex-wrap w-full justify-center align-middle'>
                <label for="color" class="font-bold m-auto ml-0">Background color:</label>
                <color-input class="border-2 border-slate-700 m-auto" v-model="theComponent['bgColor']" />
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
import { getCurrentInstance, ref } from 'vue';

export default {
    name: 'Editor',
    data() {
        return {
            theComponent: {
                content: 'Default text',
                contentSize: 12,
                contentColor: "rgb(0, 0, 0)",
                block: true,
                border: 0,
                borderColor: "rgb(0, 0, 0)",
                bgColor: "rgb(255, 255, 255)",
                src: null
            },
            theIndex: -1,
            selectedFile: null
        }
    },
    props: [
        'index',
        'ourComponent'
    ],
    emits: [
        'remove_comp',
        'apply',
        'update'
    ],
    methods: {
        remove_item() {
            this.$emit('remove_comp', this.theIndex)
            this.theIndex = -1
        },
        forceUpdate() {
            this.$emit('update')
        },
        changeder() {
            // this.theIndex = this.index
            if (isNaN(this.theComponent['contentSize'])) {
                this.theComponent['contentSize'] = 12
            } else {
                this.theComponent['contentSize'] = parseInt(this.theComponent['contentSize'])
            }
            this.theComponent = this.ourComponent
            this.$emit('apply', this.theComponent)
            const instance = getCurrentInstance()
            instance.forceUpdate()
        }
        // loadImg(event) {
        //     this.theComponent['src'] = document.getElementById("sourceImg").value
        //     this.selectedFile = event.target.files[0]
        // }
    },
    updated() {
        this.theIndex = this.index
        this.theComponent = this.ourComponent
        this.$emit('apply', this.theComponent)
    },
    beforeMount() {
        this.theComponent = ref(this.ourComponent)
    }
}
</script>