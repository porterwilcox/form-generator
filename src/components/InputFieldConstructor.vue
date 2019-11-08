<template>
    <div class="input-field-constructor">
       <button data-toggle="modal" :data-target="'#modal'+formIndex" class="btn btn-outline-info">Add Column</button>
       <div data-backdrop="false" :id="'modal'+formIndex" class="modal fade" tabindex="-1" role="dialog">
           <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Input Field Constructor</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="genInputGroup" class="d-flex flex-column align-items-center">
                            <div class="d-flex flex-column align-items-center">
                                <label>Column Name</label>
                                <input required name="labelName" placeholder="eg: username" type="text">
                            </div>
                            <select @change="checkDisplayOptionsCapture" class="mt-4 mb-3 w-50" required name="inputType">
                                <option selected disabled>type</option>
                                <option v-for="t in inputTypes" :value="t">{{t}}</option>
                            </select>
                            <div v-if="captureOptions" class="d-flex flex-column align-items-center w-100 mb-3">
                                <label>Dropdown Options</label>
                                <input required name="dropdownOptions" placeholder="(comma separated list) eg: unicycle, bicycle, tricycle,..." type="text" class="w-100">
                            </div>
                            <div class="d-flex flex-column align-items-center mb-3">
                                <label>Is Required</label>
                                <input name="isRequired" type="checkbox">
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <label>Field Size: {{size == 6 ? '1/2' : size == 12 ? "1" : size == 3 ? "1/4" : "3/4"}}</label>
                                <input step="3" v-model="size" value="6" name="colSize" type="range" min="3" max="12">
                            </div>
                            <div class="modal-footer mt-2">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-info">Generate Field</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputField from '@/models/InputField.js'

export default {
   name: "input-field-constructor",
   props: ['formIndex'],
   data() {
      return {
          inputTypes: ["text", "number", "checkbox", "dropdown", "date"],
          captureOptions: false,
          size: 6
      }
   },
   computed: {},
   methods: {
       genInputGroup({target}) {
           let { labelName, inputType, isRequired, dropdownOptions, colSize } = target
           if(dropdownOptions) dropdownOptions = dropdownOptions.value.split(",").map(w => w.trim())
           let field = new InputField({
               label: labelName.value,
               type: inputType.value,
               required: isRequired.checked,
               options: dropdownOptions,
               classes: `col-${colSize.value} order-last`
           })
           target.reset()
           this.captureOptions = false
           this.size = 6
           this.$emit('addField', field)
           $('#modal'+this.formIndex).modal('hide')
       },
       checkDisplayOptionsCapture({target: {value}}) {
           this.captureOptions = value == "dropdown"
       }
   },
   components: {}
}
</script>