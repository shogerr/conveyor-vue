<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{ item.type }}</div>
        <v-list-item-title class="headline mb-1">{{
          item.name
        }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ item._id }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
      <v-btn v-on:click="open(item._id)">
        Open
      </v-btn>
      <v-btn icon v-on:click="drop(item._id)">
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
    item: [{}],
    errors: []
  }),
  props: {
    id: String,
    url: String,
    data: [Object]
  },
  methods: {
    open(value) {
      console.log(value)
      this.$emit("openItem", value);
    },
    drop(id) {
      axios.delete(this.url + "/" + id);
      this.$emit("removeItem");
    },
    get() {
      axios
        .get(this.url + "/" + this.id)
        .then(response => {
          this.item = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    if (
      typeof this.data !== "undefined" &&
      typeof this.data.item !== "undefined"
    ) {
      this.item = this.data.item;
    } else {
      this.get();
    }
  },
  watch: {
    id() {
      this.get();
    }
  }
};
</script>
