import { defineStore } from "pinia";

export const useCompsStore = defineStore('comps', {
    state: () => ({
        website_components: [
            
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
    }
})