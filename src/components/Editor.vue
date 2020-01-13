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
          <span class="headline">Add Software</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div id="editor">blah</div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('overlay')"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";

export default {
  props: {
    dialog: {
      type: Boolean,
      default: true
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
    }
  },
  watch: {
    dialog() {
      console.log("watcher: " + this.dialog);
    }
  }
};
</script>
