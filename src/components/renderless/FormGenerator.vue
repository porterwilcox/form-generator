<template>
    <div class="form-generator">
       <form :class="'form'+formGenIndex">
            <div v-for="(f, i) in fields" :key="i"> <!-- NOTE dynamic input group -->   
                <label :for="f.label">{{f.label}}</label>
                <input :name="f.label" v-if="f.type !== 'dropdown'" :type="f.type" :required="f.required" @keyup="updateFormVals($event)">
                <select v-else :name="f.label" @change="updateFormVals($event)">
                    <option selected disabled>select</option>
                    <option v-for="(o, j) in f.options" :value="o" :key="j">{{o}}</option>
                </select>
            </div>
            <!-- NOTE every form allows for comments -->
            <textarea name="comments" cols="30" rows="10" placeholder="comments..." @keyup="updateFormVals($event)"></textarea>
            <slot></slot>
       </form>
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