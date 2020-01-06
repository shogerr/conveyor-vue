<template>
  <v-container fluid>
    <software-card v-model="component" :data="{'id':'5e1165af48df7962484c67a4'}"/>
    <p>comp val: {{component}}</p>
    <slot></slot>
  </v-container>
</template>

<script>
import SoftwareCard from "./SoftwareCard";

export default {
  components: {
    SoftwareCard
  },
  data: () => ({
    component: [String]
  })
}
</script>
