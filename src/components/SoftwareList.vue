<template>
  <v-item-group>
    <v-row v-if="softwareList && softwareList.length">
      <v-col v-for="software in softwareList" v-bind:key="software.index">
        <SoftwareCard :data="{ software }" />
      </v-col>
    </v-row>
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
