<template>
  <v-container>
    <app-toolbar
      class="mb-12"
      @overlay="dialog = !dialog"
      @select-view="selectView"
      @select="select"
    >
      <v-btn fab large dark absolute bottom right @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </app-toolbar>

    <software-entry :dialog="dialog" @overlay="dialog = !dialog" />

    <editor
      ref="editor"
      :content="content"
      :dialog="editor"
      @close-editor="closeItem"
    />
    <component
      :selection="selected"
      :url="url"
      v-bind:is="view"
      @open-item="openItem"
    />
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
    content: "some blank content",
    dialog: false,
    overlay: false
  }),
  methods: {
    closeItem() {
      this.editor = false;
      //this.$refs.editor.$el.innerHTML = "";
    },
    openItem(item: any) {
      this.editor = true;
      this.content = item._id;
      this.selection = item._id;
    },
    select(item: any) {
      this.selected = item;
      this.$forceUpdate();
    },
    selectView(view: any) {
      this.view = view;
      this.$forceUpdate();
    }
  }
});
</script>
