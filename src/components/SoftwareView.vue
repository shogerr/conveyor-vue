
<template>
  <item-list
    :url="url+'software'"
    class="mt-12"
  />
</template>
<script lang="ts">
import Vue from "vue";
import ItemList from "./ItemList.vue";

export default Vue.extend({
  props: {
    url: String,
  },
  data: () => ({
  }),
  components: {
    ItemList
  }
})
</script>