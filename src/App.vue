<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn icon>
          <v-icon>mdi-robot-industrial</v-icon>
        </v-btn>

        <v-toolbar-title>Conveyor</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>

      <!--
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      -->
    </v-app-bar>

    <v-content>
      <SoftwareToolbar />
      <app-view>
        <v-container fluid>
          <component v-bind:is="component" />
        </v-container>
      </app-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import SoftwareCard from "./components/SoftwareCard.vue";
import SoftwareList from "./components/SoftwareList.vue";
import SoftwareToolbar from "./components/SoftwareToolbar.vue";
import AppView from "./components/AppView.vue";

export default Vue.extend({
  name: "App",

  components: {
    SoftwareCard,
    SoftwareList,
    SoftwareToolbar,
    AppView
  },
  data: () => ({
    component: "SoftwareList"
  }),
  methods: {
    toggle() {
      if (this.component === "SoftwareList") {
        this.component = "SoftwareCard";
      }
    }
  }
});
</script>
