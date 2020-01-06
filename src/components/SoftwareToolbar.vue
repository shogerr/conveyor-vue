<template>
  <v-toolbar>
    <template v-slot:extension>
      <v-btn
        fab
        bottom
        right
        absolute
        @click="dialog = !dialog"
      >
      <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: "SoftwareToolbar"
};
</script>