<template>
  <div>
    <SoftwareCard
      v-for="(software, index) in softwareList"
      :key="software._id"
      :data="{ software }"
      @removeSoftware="removeSoftware(index)"
    />
  </div>
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
    removeSoftware(id) {
      //this.softwareList = this.softwareList.filter(s => s._id !== id);
      this.$delete(this.softwareList, id);
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
