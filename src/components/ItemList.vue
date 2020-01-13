<template>
  <div class="d-flex flex-column">
    <div class="mt-4" v-for="(item, index) in list" :key="item._id">
      <item-card
        :data="{ item }"
        :selection="selection"
        :url="_url"
        :ref="'item' + item._id"
        :breakout="options.breakout"
        @removeItem="removeItem(index)"
        @open-item="open"
        @close-item="close(item)"
      >
        <v-card class="editor-pane" :ref="'editor' + item._id">
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
    options: {
      type: Object,
      default: () => ({
        breakout: false
      })
    }
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
      this.$emit("open-item", id, this.$refs);
    },
    close(item: any) {
      (this.$refs["editor" + item._id] as Array<any>)[0].$el.innerHTML = "";
      this.$forceUpdate();
      this.$emit("close-item", item, this.$refs);
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
    this._url = this.url + this.selection;
    this.get(this._url);
  },
  watch: {
    url() {
      this.get(this.url);
    },
    selection() {
      this.get(this.url + this.selection);
    }
  }
});
</script>
