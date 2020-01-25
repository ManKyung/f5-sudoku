<template>
  <v-ons-page>
    <v-ons-toolbar class="primary">
      <div class="left">
        <v-ons-back-button></v-ons-back-button>
      </div>
      <div class="center white--text">스도쿠 {{ title }}</div>
    </v-ons-toolbar>

    <v-ons-tabbar swipeable position="auto" :index.sync="activeIndex" :visible="true">
      <template slot="pages">
        <stage-component v-for="(item, index) in tabs" :key="index" :stage="item.key" v-on:favoriteUpdate="favoriteUpdate"></stage-component>
      </template>
      <v-ons-tab v-for="(tab, i) in tabs" :key="i" :label="tabs[i].label"></v-ons-tab>
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
          // icon: this.md() ? null : 'ion-home',
          label: "Easy",
          page: Stage,
          key: "easy"
        },
        {
          // icon: this.md() ? null : 'ion-ios-bell',
          label: "Normal",
          page: Stage,
          // badge: 7,
          key: "normal"
        },
        {
          // icon: this.md() ? null : 'ion-ios-settings',
          label: "Hard",
          page: Stage,
          key: "hard"
        }
      ]
    };
  },
  mounted() {
    this.initStage();
  },
  methods: {
    favoriteUpdate(){
      console.log(123)
    },
    initStage() {
      this.$store.commit("levels/getStageMode");
    },
    md() {
      return this.$ons.platform.isAndroid();
    }
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back-button__icon {
  fill: white !important;
}
.header {
  text-align: center;
}

ons-list-title {
  text-transform: none;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item,
ons-card {
  cursor: pointer;
}
</style>
