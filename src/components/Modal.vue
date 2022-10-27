<script setup>
import { useCompsStore } from '@/stores/comps';
const store = useCompsStore()
</script>

<template>
    <!-- Modal -->
    <div id="modal" class="fixed w-full h-full flex align-middle justify-center">
        <div id="modal-mask"></div>
        <div id="modal-body" class="bg-white m-auto w-3/4">
            <h1 class="text-xl font-mono font-bold mt-3">Choose a component to add</h1>
            <div class="flex justify-center justify-items-center flex-wrap m-2">
                <div class="object hover:bg-slate-400 hover:text-white flex flex-col justify-center align-middle m-0.5"
                    v-for="(item, key) in available" :key="item" @click="callFun(item)">
                    <div>
                        <span class="m-auto h-full w-full font-bold font-mono text-2xl">{{ key }}</span>
                    </div>
                </div>
            </div>
            <button class="font-bold font-sans m-2 mr-2 px-6 text-black text-2xl hover:underline"
                @click="$emit('close')">cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    emits: [
        'close'
    ],
    data() {
        return {
            available: {
                'Navigation': 'header1',
                'Heading': 'heading',
                // 'Image': 'image',
                'Paragraph': 'paragraph',
                'Link': 'link',
                'Horizontal Splitter': 'hr'
            }
        }
    },
    methods: {
        callFun(item) {
            eval('this.' + item)()
            this.$emit('close')
        },
        header1() {
            this.store.addNewComp(
                {
                    'type': 'nav',
                    'content': 'Default Header text',
                    'styles': {
                        'font-size': '16px',
                        'padding': '0px',
                        'color': 'rgb(0,0,0)',
                        'border': '0px',
                        'border-style': 'solid',
                        'border-color': 'rgb(0,0,0)',
                        'background-color': 'rgb(255,255,255)',
                        'font-weight': 'normal',
                        'font-style': 'normal',
                        'margin': '0px',
                        'margin-left': '0vw',
                        'margin-right': '0vw',
                        'margin-top': '0vw',
                        'margin-bottom': '0vw' 
                    }
                }
            )
        },
        heading() {
            this.store.addNewComp(
                {
                    'type': 'h1',
                    'content': 'Default Heading text',
                    'styles': {
                        'font-size': '16px',
                        'padding': '0px',
                        'color': 'rgb(0,0,0)',
                        'display': 'block',
                        'border': '2px',
                        'border-style': 'solid',
                        'border-color': 'rgb(0,0,0)',
                        'background-color': 'rgb(255,255,255)',
                        'font-weight': 'normal',
                        'font-style': 'normal',
                        'float': 'middle',
                        'margin': '0px',
                        'margin-left': '0vw',
                        'margin-right': '0vw',
                        'margin-top': '0vw',
                        'margin-bottom': '0vw' 
                    }
                }
            )
        },
        // image() {
        //     this.$emit('new_comp',
        //         {
        //             'type': 'img',
        //             'content': '',
        //             'contentColor': 'rgb(0,0,0)',
        //             'block': true,
        //             'border': 2,
        //             'borderColor': 'rgb(0,0,0)',
        //             'bgColor': 'rgb(0,0,0)',
        //             'src': './default_img.png'
        //         }
        //     )
        // },
        paragraph() {
            this.store.addNewComp(
                {
                    'type': 'p',
                    'content': 'Default paragraph text',
                    'styles': {
                        'font-size': '16px',
                        'padding': '0px',
                        'color': 'rgb(0,0,0)',
                        'display': 'block',
                        'border': '2px',
                        'border-style': 'solid',
                        'border-color': 'rgb(0,0,0)',
                        'background-color': 'rgb(255,255,255)',
                        'font-weight': 'normal',
                        'font-style': 'normal',
                        'float': 'middle',
                        'margin': '0px',
                        'margin-left': '0vw',
                        'margin-right': '0vw',
                        'margin-top': '0vw',
                        'margin-bottom': '0vw' 
                    }
                }
            )
        },
        link() {
            this.store.addNewComp(
                {
                    'type': 'a',
                    'content': 'Default link text',
                    'styles': {
                        'font-size': '16px',
                        'padding': '0px',
                        'color': 'rgb(0,0,0)',
                        'display': 'block',
                        'border': '2px',
                        'border-style': 'solid',
                        'border-color': 'rgb(0,0,0)',
                        'background-color': 'rgb(255,255,255)',
                        'text-decoration': 'underline',
                        'float': 'middle',
                        'margin': '0px',
                        'margin-left': '0vw',
                        'margin-right': '0vw',
                        'margin-top': '0vw',
                        'margin-bottom': '0vw' 
                    }
                }
            )
        },
        hr() {
            this.store.addNewComp(
                {
                    'type': 'hr',
                    'styles': {
                        'border': '2px',
                        'border-style': 'solid',
                        'border-color': 'rgb(0,0,0)',
                        'margin': '0px',
                        'margin-left': '0vw',
                        'margin-right': '0vw',
                        'margin-top': '0vw',
                        'margin-bottom': '0vw' 
                    }
                }
            )
        }
    },
}
</script>

<style scoped>
#modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    animation: opacity 0.5s ease alternate;
}

#modal-body {
    z-index: 9999;
    position: fixed;
    background-color: white;
    animation: opacity 0.5s ease alternate;
}

.object {
    flex: 1 0 25%;
    height: 150px;
    background-color: rgb(224, 224, 224);
}

@keyframes opacity {
    from {
        opacity: 0;
    }

    to {
        opacity: 100;
    }
}
</style>