<template>
  <v-card>
    <div class="d-flex">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{ item.type }}</div>
          <v-list-item-title class="display-1 mb-1">
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item._id }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <!--v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar-->
      </v-list-item>

      <v-card-actions>
        <v-speed-dial v-model="fab" direction="left" right>
          <template v-slot:activator>
            <v-btn v-model="fab" small fab>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-wrench</v-icon>
            </v-btn>
          </template>
          <v-btn v-if="!opened" v-on:click="open(item)" dark small>
            open
          </v-btn>
          <v-btn v-else v-on:click="close(item)" dark small>
            close
          </v-btn>
          <v-btn icon v-on:click="drop(item._id)" dark fab small color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-speed-dial>
        <v-btn icon v-on:click="details = !details">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </v-card-actions>
    </div>

    <v-card-text class="mb-auto" :hidden="details">
      {{ item }}
    </v-card-text>

    <template v-if="opened && breakout">
      <v-toolbar>
        <v-btn absolute right v-on:click="close(item)" dark small v-if="opened">
          Close
        </v-btn>
      </v-toolbar>
    </template>
    <slot></slot>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "ItemCard",
  props: {
    breakout: {
      type: Boolean,
      default: false
    },
    id: String,
    url: String,
    data: [Object]
  },
  data: () => ({
    item: [{}],
    fab: false,
    opened: false,
    details: true,
    errors: [Object]
  }),
  methods: {
    open(item: any) {
      if (!this.opened) {
        console.log(this.$refs);
        this.opened = true;
        this.$forceUpdate();
        this.$emit("open-item", item, this.$refs);
      }
    },
    close(item: any) {
      this.opened = false;
      this.$emit("close-item", item, this.$refs);
    },
    drop(id: string) {
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
});
</script>
