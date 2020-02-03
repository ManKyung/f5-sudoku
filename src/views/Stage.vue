<template>
  <v-ons-page>
    <v-ons-toolbar class="primary">
      <div class="left">
        <v-ons-back-button></v-ons-back-button>
      </div>
      <div class="center white--text">SUDOKU {{stage.toUpperCase()}}</div>
    </v-ons-toolbar>
    <div ref="gameStage">
      <v-ons-row v-for="(level, i) in levels" :key="i" :class="i === 0 ? 'pt-5' : ''">
        <v-ons-col v-for="(le, j) in level" :key="j" class="pa-1" @click="goPlay(le)">
          <v-ons-button
            class="stage-num w-100 pa-3"
            modifier="outline"
            :class="clearList.indexOf(String(le)) !== -1 ? 'clear' : ''"
          >{{le}}</v-ons-button>
        </v-ons-col>
      </v-ons-row>
    </div>
  </v-ons-page>
</template>

<script>
import playPage from "./Play";
export default {
  props: ["stage"],
  name: "level-stage",
  data() {
    return {
      levels: [],
      width: 0,
      favoriteList: [],
      clearList: [],
      params: this.$router.history.current.params
    };
  },
  mounted() {
    setTimeout(() => {
      this.gameSetting();
    }, 10);
  },
  methods: {
    goPlay(id) {
      this.$emit("push-page", {
        ...playPage,
        onsNavigatorProps: {
          stage: this.stage,
          id: id
        }
      });
    },
    gameSetting() {
      this.$store.commit("levels/getStageMode", this.stage);

      let key = `${this.stage}-clear`;
      let result = localStorage[key];
      if (result === undefined) {
        localStorage[key] = [];
      } else {
        this.clearList = result.split(",");
      }

      for (let i = 0; i < 40; i++) {
        let t = [];
        for (let j = 0; j < 5; j++) {
          t.push(i * 5 + j + 1);
        }
        this.levels.push(t);
      }
    }
  }
};
</script>