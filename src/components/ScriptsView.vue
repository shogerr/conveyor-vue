<template>
  <div>
    <add-scripts class="mt-12" />
    <item-list
      :url="url"
      :selection="selection"
      :options="{ breakout: true }"
      class="d-flex mt-12"
      @open-item="open"
      @close-item="closeEditor"
    >
    </item-list>
  </div>
</template>

<style>
/*
.editor-pane::-webkit-scrollbar {
  width: 0;
}
*/

.editor-pane {
  scrollbar-width: none;
}
</style>

<script lang="ts">
import Vue from "vue";
import ItemList from "./ItemList.vue";
import AddScripts from "./AddScripts.vue";

// @ts-ignore
import * as monaco from "monaco-editor";

/*
// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "json") {
      return "./json.worker.bund.js";
    }
  }
};
*/

export default Vue.extend({
  props: {
    url: String,
    selection: {
      type: String,
      default: "scripts"
    }
  },
  data: () => ({}),
  components: {
    ItemList,
    AddScripts
  },
  methods: {
    open(data: any, ref: any) {
      //this.$emit("open-item", content)
      //console.log(data)
      //console.log(ref)
      //console.log(ref.editor5e1b1bee1ba75760e000affa[0])
      //console.log(ref['editor' + data._id][0].$el)
      ref["editor" + data._id][0].$el.style =
        "height:322px;resize:vertical;overflow:auto;";
      monaco.editor.create(ref["editor" + data._id][0].$el, {
        value: data.content,
        language: "javascript",
        automaticLayout: true
      });
    },
    closeEditor(item: Object, refs: any) {
      //console.log(refs['editor' + item._id][0].$el)
      // @ts-ignore
      refs["editor" + item._id][0].$el.style = "display: none";
      this.$forceUpdate();
      //console.log(refs['editor' + item._id][0].$el)
      //console.log(refs)
    }
  }
});
</script>
