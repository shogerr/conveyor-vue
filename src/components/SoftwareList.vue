<template>
  <div>
    <software-card
      v-for="(item, index) in list"
      :key="item._id"
      :data="{ item }"
      @removeItem="removeItem(index)"
      @openItem="openItem(item._id)"
    />
  </div>
</template>

<script>
import axios from "axios";
import SoftwareCard from "./SoftwareCard";

export default {
  name: "SoftwareList",
  props: { url: String },
  data: () => ({
    list: [],
    errors: []
  }),
  components: {
    SoftwareCard
  },
  methods: {
    removeItem(id) {
      this.$delete(this.list, id);
    },
    openItem(id) {
      this.$emit("openItem", id)
    },
    get(url) {
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
    this.get(this.url);
  }
};
</script>
