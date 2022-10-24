<script setup>
import { useCompsStore } from '@/stores/comps';
const store = useCompsStore()
</script>

<template>
    <nav style="min-height: 20px;" @click="update" class="flex flex-row w-full p-2" v-if="theData.type=='nav'">
        <div class="color flex flex-row w-1/6 h-full align-middle font-serif text-xl font-bold">
            <div :style="styles" class="m-auto">{{ theData['content'] }}</div>
        </div>
        <div class="flex flex-row h-full align-middle w-5/6 text-base font-mono text-slate-600">
            <div class="m-auto">Home</div>
            <div class="m-auto">Products</div>
            <div class="m-auto">About</div>
        </div>
    </nav>
    <h1 :style="styles" @click="update" class="color" v-if="theData.type=='h1'">{{ theData['content'] }}
    </h1>
    <!-- <img @click="update" class="block m-auto" v-if="theData.type=='img'" :src="theData['src']" /> -->
    <p :style="styles" @click="update" class="color" v-if="theData.type=='p'">{{ theData['content'] }}
    </p>
    <a style="min-height: 20px;" @click="update" class="color" v-if="theData.type=='a'">{{ theData['content']
    }}</a>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'block',
    data() {
        return {
            theData: {},
            blockY: '',
            styles: {}
        }
    },
    props: [
        'the_index',
    ],
    methods: {
        showValue() {
            console.log(this.theData.block)
        },
        update() {
            this.store.editingIndex = this.the_index
        }
    },
    mounted() {
        this.theData = ref(this.store.website_components[this.the_index])
        // this.blockY = this.theData.block == true ? 'block' : 'inline-block'
        this.theData.styles = {
            display: ref(this.theData.block == true ? 'block' : 'inline-block'),
            color: this.theData.contentColor,
            'font-size': `${ref(this.theData.contentSize)}px`,
            'background-color': this.theData.bgColor,
            border: `${this.theData.border}px solid ${this.theData.borderColor}`,
            'min-height': `20px`,
        }
        // this.theData['block'] = this.website_component['block'] ? 'block' : 'inline-block'
        // this.styles = {
        //     display: ref(this.blockY),
        //     color: this.theData.contentColor,
        //     'font-size': `${ref(this.theData.contentSize)}px`,
        //     'background-color': this.theData.bgColor,
        //     border: `${this.theData.border}px solid ${this.theData.borderColor}`,
        //     'min-height': `20px`,
        // }
    },
    computed() {
        // this.blockY = this.theData['block'] ? 'block' : 'inline-block'
        console.log(this.theData.block)
    }
}
</script>

<style scoped>
* {
    display: inline-block;
    display: block;
}

.color {
    display: v-bind('theData.block');
    color: v-bind('theData.contentColor');
    font-size: v-bind('theData.contentSize')px;
    background-color: v-bind('theData.bgColor');
    border: v-bind('theData.border')px;
    border-color: v-bind('theData.borderColor');
}
</style>