<template>
  <div class="home container">
    <form-generator class="row justify-content-center" @updateVals="updateForms" v-for="(fg, fgI) in forms" :key="'fgIndex' + fgI" :fields="fields" :formGenIndex="fgI" :savedVals="forms[fgI]">
      <button class="btn btn-outline-dark" type="button" v-if="fgI != 0 || forms.length > 1" @click="removeForm(fgI)">remove</button>
    </form-generator>
    <span></span>
    <button @click="forms.push({})">add another</button>
  </div>
</template>

<script>
import FormGenerator from '@/components/renderless/FormGenerator.vue'
import InputField from '@/models/InputField.js'

export default {
  name: 'home',
  props: {
      fields: {
          type: Array,
          default: () => [new InputField({
                label: "time",
                type: "date",
                required: true,
                classes: "col-7 order-3"
            }),
                new InputField({
                label: "activity",
                type: "dropdown",
                required: true,
                options: ["climbing", "kayaking", "flippity-floppity"],
                classes: "col-5 order-2"
            }), new InputField({
                label: "username",
                type: "text",
                required: true,
                classes: "col-7 order-1"
            })]
      }
  },
  data() {
    return {
      forms: [{}]
    }
  },
  computed: {},
  methods: {
    updateForms({i, vals}) {
      this.forms[i] = vals
    },
    removeForm(i) {
      this.forms.splice(i, 1)
    }
  },
  components: { FormGenerator }
}
</script>

<style>
/* NOTE permeating styles for the components */
.action {
    cursor: pointer;
}
</style>