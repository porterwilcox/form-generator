<template>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <forms-container></forms-container>     
    </div>
</template>

<script>
import FormsContainer from '@/components/FormsContainer.vue'

export default {
   name: "home",
   props: [],
   data() {
      return {}
   },
   computed: {},
   methods: {},
   components: { FormsContainer }
}
</script>