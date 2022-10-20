<template>
    <nav style="min-height: 20px;" @click="update" class="flex flex-row w-full p-2" v-if="theData.type=='nav'">
        <div class="color flex flex-row w-1/6 h-full align-middle font-serif text-xl font-bold">
            <div class="m-auto">{{ theData['content'] }}</div>
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
import { ref } from 'vue'

export default {
    name: 'block',
    data() {
        return {
            theData: {},
            blockY: '',
            styles: {}
        }
    },
    emits: [
        'click'
    ],
    props: [
        'the_index',
        'website_component'
    ],
    methods: {
        update() {
            this.$emit('click')
        },
        showValue() {
            console.log(this.theData.block)
        },
    },
    created() {
        this.theData = ref(this.website_component)
        // this.theData['block'] = this.website_component['block'] ? 'block' : 'inline-block'
    },
    beforeUpdate() {
        this.blockY = this.theData.block == true ? 'block' : 'inline-block'
        this.styles = {
            display: this.blockY,
            color: this.theData.contentColor,
            'font-size': `${this.theData.contentSize}px`,
            'background-color': this.theData.bgColor,
            border: `${this.theData.border}px solid ${this.theData.borderColor}`,
            'min-height': `20px`,
        }
        console.log(this.theData)
        console.log(this.blockY)
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
    /* display: v-bind('theData.block'); */
    color: v-bind('theData.contentColor');
    /* font-size: v-bind('theData.contentSize')em; */
    background-color: v-bind('theData.bgColor');
    border: v-bind('theData.border');
    border-color: v-bind('theData.borderColor');
}
</style>