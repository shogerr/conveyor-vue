<template>
  <div class="d-flex flex-column">
    <div class="" v-for="(item, index) in list" :key="item._id">
      <item-card
        :data="{ item }"
        :selection="selection"
        :url="_url"
        :ref="'item' + item._id"
        @removeItem="removeItem(index)"
        @open-item="open"
        @close-item="$emit('close-item', item, $refs)"
      >
        <v-card :ref="'editor' + item._id">
          <slot></slot>
        </v-card>
      </item-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import ItemCard from "./ItemCard.vue";

export default Vue.extend({
  name: "ItemList",
  props: {
    url: String,
    selection: String,
  },
  data: () => ({
    tag: "",
    _url: "",
    list: [],
    errors: [] as any,
    view: "item-card"
  }),
  components: {
    ItemCard
  },
  methods: {
    removeItem(id: string) {
      this.$delete(this.list, id);
    },
    open(id: any, ref: any) {
      console.log("Refs in ItemList")
      console.log(this.$refs)
      this.$emit("open-item", id, this.$refs);
    },
    get(url: string) {
      axios
        .get(url)
        .then(response => {
          this.list = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    console.log("url: " + this.url)
    this._url = this.url + this.selection;
    this.get(this._url);
  },
  watch: {
    url() {
      console.log("url changed")
      this.get(this.url);
    },
    selection() {
      console.log("selection changed")
      console.log(this.url);
      this.get(this.url + this.selection);
    }
  }
});
</script>
