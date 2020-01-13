<template>
  <v-toolbar>
    <v-toolbar-items>
      <v-btn
        text
        @click="
          $emit('select', 'software');
          $emit('select-view', 'item-list');
        "
        >Software</v-btn
      >
      <v-btn
        text
        @click="
          $emit('select', 'scripts');
          $emit('select-view', 'item-list');
        "
        >Scripts</v-btn
      >
      <v-btn
        text
        @click="
          $emit('select', 'scripts');
          $emit('select-view', 'scripts-view');
        "
        >Scripts+</v-btn
      >
    </v-toolbar-items>
    <slot></slot>
    <!--template v-slot:extension>
      <v-btn fab bottom right absolute @click="$emit('overlay')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template-->
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppToolbar",
  data: () => ({})
});
</script>
