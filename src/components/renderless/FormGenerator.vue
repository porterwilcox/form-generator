<template>
    <div class="form-generator border my-2">
       <form :class="'form'+formGenIndex" class="w-100 d-flex flex-wrap justify-content-center">
            <div :class="f.classes" v-for="(f, i) in fields" :key="i"> <!-- NOTE dynamic input group -->   
                <label :for="f.label">{{f.label}}</label>
                <input class="w-100" :name="f.label" v-if="f.type !== 'dropdown'" :type="f.type" :required="f.required" @keyup="updateFormVals($event)">
                <select class="w-100" v-else :name="f.label" @change="updateFormVals($event)">
                    <option selected disabled>select</option>
                    <option v-for="(o, j) in f.options" :value="o" :key="j">{{o}}</option>
                </select>
            </div>
            <!-- NOTE every form allows for comments -->
            <textarea class="m-3 w-100 order-10" name="comments" cols="30" rows="3" placeholder="comments..." @keyup="updateFormVals($event)"></textarea>
       </form>
            <slot></slot>
    </div>
</template>

<script>
export default {
   name: "form-generator",
   props: {
       fields: {
           type: Array,
           default: [/** @/models/InputField.js */]
       },
       formGenIndex: {
           type: Number,
           required: true
       },
       savedVals: {
           type: Object,
           default: {/** name: saved user value */}
       }
   },
   data() {
      return {
          vals: {},
          debounceId: 0
      }
   },
   computed: {},
   methods: {
       updateFormVals(e) {
           this.vals[e.target.name] = e.target.value
           if(this.debounceId) {
               clearTimeout(this.debounceId)
           }
           this.debounceId = setTimeout(() => {
               this.$emit("updateVals", {i: this.formGenIndex, vals: this.vals})
               this.debounceId = 0
           }, 500)
        }
   },
   components: {},
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
        /* background: white; */
        opacity: 1;
    }
</style>