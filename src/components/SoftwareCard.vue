<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{ software.type }}</div>
        <v-list-item-title class="headline mb-1">{{
          software.name
        }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ software._id }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
      <v-btn v-on:click="updateValue(software._id)">
        Open
      </v-btn>
      <v-btn icon v-on:click="drop(software._id)">
        <v-icon>mdi-minus-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "SoftwareCard",
  data: () => ({
    id: String,
    software: [Object],
    errors: []
  }),
  props: {
    component: [String],
    data: [Object]
  },
  methods: {
    updateValue: function(component) {
      this.$emit("input", component);
    },
    drop(id) {
      axios.delete("http://localhost:8090/v1/software/" + id);
      this.$emit("removeSoftware");
    }
  },
  created() {
    if (typeof this.data.software !== "undefined") {
      this.software = this.data.software;
    } else {
      if (typeof this.data.id !== "undefined") {
        this.id = this.data.id;
      }

      axios
        .get("http://localhost:8090/v1/software/" + this.id)
        .then(response => {
          this.software = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>
