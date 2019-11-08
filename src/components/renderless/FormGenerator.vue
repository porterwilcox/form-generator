<template>
    <div class="form-generator border my-2">
       <form :class="'form'+formGenIndex" class="w-100 d-flex flex-wrap justify-content-center">
            <div :class="f.classes" v-for="(f, i) in fields" :key="i"> <!-- NOTE dynamic input group -->   
                <label @keyup="editLabel($event, f)" :contenteditable="canEditLabels" :for="f.label">{{f.label}}</label>
                <input class="w-100" :name="f.label" v-if="f.type !== 'dropdown'" :type="f.type" :required="f.required" @change="updateFormVals($event)">
                <select class="w-100" v-else :name="f.label" @change="updateFormVals($event)">
                    <option selected disabled>select</option>
                    <option v-for="(o, j) in f.options" :value="o" :key="j">{{o}}</option>
                </select>
            </div>
            <!-- NOTE every form allows for comments -->
            <textarea class="m-3 w-100 order-last" name="comments" cols="30" rows="3" placeholder="comments..." @change="updateFormVals($event)"></textarea>
       </form>
       <div class="d-flex w-100 justify-content-end mb-1">
           <slot></slot>
           <button @click="toggleEditLabels" :class="canEditLabels ? 'btn-info' : 'btn-outline-info'" class="btn ml-1">{{canEditLabels ? "Lock" : "Edit Labels"}}</button>
           <input-field-constructor @addField="addField" :formIndex="formGenIndex"></input-field-constructor>
       </div>
    </div>
</template>

<script>
import InputFieldConstructor from '@/components/InputFieldConstructor.vue'

export default {
   name: "form-generator",
   props: {
       fields: {
           type: Array,
           default: () => [/** @/models/InputField.js */]
       },
       formGenIndex: {
           type: Number,
           required: true
       },
       savedVals: {
           type: Object,
           default: () => {/** name: saved user value */}
       }
   },
   data() {
      return {
          vals: {},
          debounceId: 0,
          oldLabel: "",
          canEditLabels: false
      }
   },
   computed: {},
   methods: {
       updateFormVals(e) {
           this.vals[e.target.name] = e.target.value
           this.updateParentList()
        },
        updateParentList() {
            if(this.debounceId) {
               clearTimeout(this.debounceId)
           }
           this.debounceId = setTimeout(() => {
               this.debounceId = 0
               this.$emit("updateVals", {i: this.formGenIndex, vals: this.vals})
           }, 500)
        },
        editLabel(e, f) {
            if(this.debounceId) {
               clearTimeout(this.debounceId)
           }
           this.oldLabel = e.target.htmlFor
           this.debounceId = setTimeout(() => {
               this.debounceId = 0
               f.label = e.target.textContent
               this.vals[e.target.textContent] = this.vals[this.oldLabel]
               delete this.vals[this.oldLabel]
               this.updateParentList()
           }, 500)
        },
        toggleEditLabels() {
            this.canEditLabels = !this.canEditLabels
            let labels = document.querySelectorAll(`.form${this.formGenIndex} label`)
            if(this.canEditLabels) {
                labels.forEach(l => l.classList.add("action", "text-primary"))
            } else {
                labels.forEach(l => l.classList.remove("action", "text-primary"))
            }
        },
        addField(f) {
            this.fields.push(f)
        }
   },
   components: { InputFieldConstructor },
   watch: {
       savedVals: {
           handler(newVals) {
               let form = document.querySelector('.form'+this.formGenIndex)
               form.reset()
               for(let i = 0; true; i++) {
                   let child = form[i]
                   if(!child) break
                   child.value = newVals[child.name] || ""
               }
           }
       }
   }
}
</script>

<style>
    .form-generator {
        background: var(--light);
        transition: all .33s linear;
        opacity: .7;
    }
    .form-generator:hover, .form-generator:active, .form-generator:focus {
        box-shadow: -1px 1px 2px var(--secondary);
        opacity: 1;
    }
</style>