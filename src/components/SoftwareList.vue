<template>
  <v-item-group>
    <SoftwareCard v-for="software in softwareList"
      :key="software.index"
      :data="{ software }"
      @removeit="removeit('extra', software._id)"
    />
  </v-item-group>
</template>

<script>
import axios from "axios";
import SoftwareCard from "./SoftwareCard";

export default {
  name: "SoftwareList",
  data: () => ({
    softwareList: [],
    errors: []
  }),
  components: {
    SoftwareCard
  },
  methods: {
    removeit(extra, id) {
      //this.softwareList = this.softwareList.filter(s => s._id !== id);
    }
  },
  created() {
    axios
      .get("http://localhost:8090/v1/software")
      .then(response => {
        this.softwareList = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>
