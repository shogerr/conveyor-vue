<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <!--
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      -->
      <v-card>
        <v-card-title>
          <span class="headline">Detail</span>
        </v-card-title>
        <v-card-text> </v-card-text>
        <v-container ref="editor"> </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('close-editor')"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";

// @ts-ignore
import * as monaco from "monaco-editor";

export default Vue.extend({
  props: {
    dialog: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: "null"
    }
  },
  data: () => ({
    name: "",
    type: []
  }),
  methods: {
    submit() {
      axios.post("http://localhost:8090/v1/software", {
        name: this.name,
        type: this.type
      });
      this.$emit("overlay");
    },
    newEditor() {
      // @ts-ignore
      monaco.editor.create(this.$refs.editor as HTMLElement, {
        value: this.content,
        language: "javascript"
      });
    }
  },
  watch: {
    dialog() {
      console.log(this.$refs[0]);
      setTimeout(this.newEditor, 300);
    }
  }
});
</script>
