<template>
  <v-container>
    <app-toolbar
      class="mb-12"
      @overlay="overlay_"
      @select-view="selectView"
      @select="select"
    >
      <v-btn fab large dark absolute bottom right @click="overlay_()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </app-toolbar>

    <software-entry :dialog="dialog" @overlay="overlay_" />
    <editor :dialog="editor" @overlay="overlay_" />
    <component
      :selection="selected"
      :url="url"
      v-bind:is="view"
      @open-item="openItem"
    />
    <!--component
      v-bind:is="view"
      :url="url"
    /-->
    <!--
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
    -->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AppToolbar from "./AppToolbar.vue";
import SoftwareEntry from "./SoftwareEntry.vue";
import ScriptsView from "./ScriptsView.vue";
import ItemList from "./ItemList.vue";
import Editor from "./Editor.vue";

export default Vue.extend({
  components: {
    AppToolbar,
    SoftwareEntry,
    ScriptsView,
    ItemList,
    Editor
  },
  data: () => ({
    selected: "software",
    selection: "",
    url: "http://localhost:8090/v1/",
    view: "item-list",
    editor: false,
    dialog: false,
    overlay: false
  }),
  methods: {
    overlay_() {
      //this.overlay = !this.overlay;
      this.dialog = false;
      this.editor = false;
    },
    openItem(id: string) {
      this.editor = true;
      this.selection = id;
    },
    select(item: any) {
      this.selected = item;
      this.$forceUpdate();
      console.log(item);
    },
    selectView(view: any) {
      console.log(view);
      this.view = view;
      this.$forceUpdate();
    }
  },
  watch: {
    value() {
      console.log("value change");
    },
    dialog() {
      console.log("App watcher: " + this.dialog);
    }
  }
});
</script>
