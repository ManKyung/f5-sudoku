<template>
  <v-ons-page>
    <div ref="gameStage">
      <v-ons-row class="pt-5">
        <v-ons-col
          :width="`${width/5}px`"
          v-for="i in level"
          :key="i"
          class="pa-1"
          v-touch:tap="goPlay"
        >
          <!-- <router-link v-touch:tap="touchHandler" :to="{name: 'Play', params: { stage: stage, id : i}}" ><v-ons-button -->
          <v-ons-button
            class="stage-num w-100"
            modifier="outline"
            :style="`height:${width/5-10}px`"
            :class="clearList.indexOf(String(i)) !== -1 ? 'clear' : ''"
          >{{i}}</v-ons-button>
        </v-ons-col>
      </v-ons-row>
    </div>
  </v-ons-page>
</template>

<style scoped>
.clear {
  background: #3880ff !important;
  color: white;
}
.stage-num {
  font-size: 6vw;
  border-radius: 20px;
  padding-top: 3vw;
  text-align: center;
  border: 1px solid #3880ff !important;
}
@media (max-width: 321px) {
  .stage-num {
    padding-top: 3vw;
  }
}
</style>

<script>
export default {
  props: ["stage"],
  name: "level-stage",
  data() {
    return {
      level: [],
      width: 0,
      favoriteList: [],
      clearList: []
    };
  },
  created() {
    this.gameSetting();
  },
  mounted() {
    let temp = [];
    for (let i = 1; i <= 10; i++) {
      temp.push(i);
    }
    this.level = temp;

    this.$nextTick(() => {
      this.width = this.$refs.gameStage.clientWidth;
    });
  },
  methods: {
    goPlay(e) {
      let id = Number(e.target.innerText);
      this.$router.push({
        name: "Play",
        params: { stage: this.stage, id: id }
      });
    },
    gameSetting() {
      // let key = `${this.stage}-favorite`;
      // let result = localStorage[key];
      // if (result === undefined) {
      //   localStorage[key] = [];
      // } else {
      //   this.favoriteList = result.split(",");
      // }

      let key = `${this.stage}-clear`;
      let result = localStorage[key];
      if (result === undefined) {
        localStorage[key] = [];
      } else {
        this.clearList = result.split(",");
      }
    }
  }
};
</script>