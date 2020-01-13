<template>
  <v-card
    fluid
    v-cloak
    @drop.prevent="addFile"
    @dragover.prevent
    min-height="80%"
  >
    <v-card-title class="display-3">
      Add files
    </v-card-title>
    <v-card-actions>
      <v-btn @click="submit">Submit</v-btn>
    </v-card-actions>

    <v-row>
      <v-col v-for="(file, index) in files" :key="index">
        <v-card>
          <v-card-title v-text="file.name" />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "AddScripts",
  data: () => ({
    files: [],
    raw: []
  }),
  methods: {
    addFile(e) {
      let fileList = e.dataTransfer.files;
      if (!fileList) return;
      [...fileList].forEach(f => {
        this.files.push(f);
      })
    },
    submit() {
      this.files.forEach(f => {
        let reader = new FileReader();
        reader.readAsText(f);
        reader.onload = e => {
          axios.post("http://localhost:8090/v1/scripts", {
            name: f.name,
            content: e.target.result
          });
        };
      });

      this.$emit("overlay");
    }
  }
});
</script>
