<template>
  <v-card>
    <software-toolbar @overlay="overlay_" />
    <software-entry :dialog="dialog" @overlay="overlay_" />
    <v-overlay :absolute="false" :value="overlay">
      <v-card>
        <v-btn @click="overlay_()">
          <v-icon>md-minus</v-icon>
        </v-btn>
      </v-card>
    </v-overlay>
    <v-container>
      <software-card :url="url" :id="selection" />
      <software-list :url="url" @openItem="openItem" />
    </v-container>
  </v-card>
</template>

<script>
import SoftwareCard from "./SoftwareCard";
import SoftwareList from "./SoftwareList.vue";
import SoftwareToolbar from "./SoftwareToolbar";
import SoftwareEntry from "./SoftwareEntry";

export default {
  components: {
    SoftwareCard,
    SoftwareToolbar,
    SoftwareList,
    SoftwareEntry
  },
  data: () => ({
    selection: "5e15683f86004d68588d594f",
    url: "http://localhost:8090/v1/software",
    dialog: false,
    overlay: false
  }),
  methods: {
    overlay_() {
      //this.overlay = !this.overlay;
      this.dialog = !this.dialog;
    },
    openItem(id) {
      this.selection = id;
    }
  },
  watch: {
    value() {
      console.log("value change");
    },
    component() {
      console.log("component change: " + this.component);
    },
    dialog() {
      console.log("App watcher: " + this.dialog);
    }
  }
}
</script>
