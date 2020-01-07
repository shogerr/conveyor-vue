<template>
  <v-card>
    <SoftwareToolbar @overlay="overlay_" />
    <SoftwareEntry :dialog="dialog" @overlay="overlay_" />
    <v-overlay :absolute="absolute" :value="overlay">
      <v-card>
        <v-btn @click="overlay_()">
          <v-icon>md-minus</v-icon>
        </v-btn>
      </v-card>
    </v-overlay>
    <v-container>
      <software-card
        v-model="component"
        :data="{ id: '5e1404825a810d5cc4a62dfa' }"
      />
      <p>comp val: {{ component }}</p>
      <slot></slot>
    </v-container>
  </v-card>
</template>

<script>
import SoftwareCard from "./SoftwareCard";
import SoftwareToolbar from "./SoftwareToolbar";
import SoftwareEntry from "./SoftwareEntry";

export default {
  components: {
    SoftwareCard,
    SoftwareToolbar,
    SoftwareEntry
  },
  data: () => ({
    component: [String],
    overlay: false,
    absolute: true,
    dialog: false
  }),
  methods: {
    overlay_() {
      //this.overlay = !this.overlay;
      this.dialog = !this.dialog;
    }
  },
  watch: {
    dialog() {
      console.log("App watcher: " + this.dialog);
    }
  }
}
</script>
