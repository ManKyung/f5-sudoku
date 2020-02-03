<template>
  <v-ons-page>
    <v-ons-toolbar class="primary">
      <div class="center white--text">SUDOKU GAME</div>
    </v-ons-toolbar>

    <div class="mt-12">
      <p class="text-center" v-for="(tab, index) in tabs" :key="index">
        <v-ons-button
          class="pa-5 btn-stage"
          @click="goGame(tab)"
        >{{tab.toUpperCase()}}</v-ons-button>
      </p>
    </div>
  </v-ons-page>
</template>

<script>
import stagePage from "./Stage";
export default {
  name: "game",
  data() {
    return {
      tabs: ["easy", "normal", "hard", "insane"]
    };
  },
  mounted() {
  },
  methods: {
    goGame(stage) {
      this.$emit("push-page", {
        ...stagePage,
        onsNavigatorProps: {
          stage: stage
        }
      });
    }
  }
};
</script>