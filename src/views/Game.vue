<template>
  <v-ons-page>
    <v-ons-toolbar class="primary">
      <div class="center white--text">스도쿠 {{ title }}</div>
    </v-ons-toolbar>

    <v-ons-tabbar swipeable position="auto" :index.sync="activeIndex" :visible="true">
      <v-ons-tab v-for="(tab, i) in tabs" :key="i" :label="tabs[i].label"></v-ons-tab>
      <template slot="pages">
        <stage-component v-for="(item, index) in tabs" :key="index" :stage="item.key"></stage-component>
      </template>
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import Stage from "@/components/Stage";
export default {
  name: "game",
  components: {
    "stage-component": Stage
  },
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {
          label: "EASY",
          key: "easy"
        },
        {
          label: "NORMAL",
          key: "normal"
        },
        {
          label: "HARD",
          key: "hard"
        }
      ]
    };
  },
  mounted() {
    this.$store.commit("levels/getStageMode");
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
};
</script>