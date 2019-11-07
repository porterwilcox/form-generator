<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <form-generator @updateVals="updateForms" v-for="(fg, fgI) in forms" :key="'fgIndex' + fgI" :fields="fields" :formGenIndex="fgI" :savedVals="forms[fgI]">
      <button type="button" v-if="fgI != 0 || forms.length > 1" @click="removeForm(fgI)">Remove</button>
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
  data() {
    return {
      forms: [{}],
      fields: [new InputField({
        label: "username",
        type: "text",
        required: true
      }), new InputField({
        label: "activity",
        type: "dropdown",
        required: true,
        options: ["climbing", "kayaking", "flippity-floppity"]
      })]
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
