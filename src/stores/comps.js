import { defineStore } from "pinia";

export const useCompsStore = defineStore('comps', {
    state: () => ({
        website_components: [
            {
                'type': 'nav',
                'content': 'Default Header text',
                'contentSize': 16,
                'contentColor': 'rgb(0,0,0)',
                'block': true,
                'border': 2,
                'borderColor': 'rgb(0,0,0)',
                'bgColor': 'rgb(255,255,255)',
                // 'src': ''
            }
        ],
        editingIndex: -1
    }),
    actions: {
        addNewComp (new_comp) {
            this.website_components.push(new_comp)
        },
        removeComp(index) {
            this.website_components.splice(index, 1)
        },
        updateComp(component) {
            this.website_components[this.editingIndex] = component
        }
    }
})