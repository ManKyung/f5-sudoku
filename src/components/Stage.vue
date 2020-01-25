<template>
  <v-ons-page>
    <div ref="gameStage">
      <router-link :to="{name: 'Clear'}">클리어</router-link>
      <v-ons-row class="pt-5">
        <v-ons-col
          :width="`${width/5}px`"
          v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"
          :key="i"
          vertical-align="center"
        >
        <router-link :to="{name: 'Play', params: { stage: stage, id : i}}" ><div
          class="stage-num pa-4"
          :class="clearList.indexOf(String(i)) !== -1 ? 'clear' : ''">{{i}}</div></router-link>
          </v-ons-col>
        
      </v-ons-row>
    </div>
    <v-ons-fab
      position="bottom right"
      :visible="true"
      @click="randomPlay()"
    >
      <v-ons-icon icon="md-play"></v-ons-icon>
    </v-ons-fab>
    <!-- <v-ons-card v-for="i in level" :key="i"  style="width:20%">
      <div class="">
        <router-link :to="{name: 'Play', params: { stage: stage, id : i}}" >Go {{i}}</router-link>
      </div>
    </v-ons-card>-->
  </v-ons-page>
</template>

<style scoped>
.clear {
  background: #3880ff !important;
  color: white !important;
}
.stage-num{
  font-size:6vw;
  border-radius:20px;
  margin:4px;
  text-align:center;
  border: 1px solid #3880ff !important;
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
  created(){
    this.gameSetting();
  },
  mounted() {

    let temp = [];
    for (let i = 1; i <= 500; i++) {
      temp.push(i);
    }
    this.level = temp;

    this.$nextTick(() => {
      this.width = this.$refs.gameStage.clientWidth;
    });
  },
  methods: {
    randomPlay(){
      let id = Math.floor(Math.random() * 500) + 1;
      console.log(id)
    },
    gameSetting() {
      let key = `${this.stage}-favorite`;
      let result = localStorage[key];
      if (result === undefined) {
        localStorage[key] = [];
      } else {
        this.favoriteList = result.split(",");
      }

      key = `${this.stage}-clear`;
      result = localStorage[key];
      if (result === undefined) {
        localStorage[key] = [];
      } else {
        this.clearList = result.split(",");
      }
    },
  }
};
</script>