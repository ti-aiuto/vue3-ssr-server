<style scoped>
.hello {
  color: red;
}
</style>

<template>
  <span class="hello">{{ helloText }} {{foo}}  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  props: {
   foo: { type: String, default: 'defaultValue' }
  },
  setup() {
    return {
      helloText: 'helloWorld',
    };
  },
});
</script>
