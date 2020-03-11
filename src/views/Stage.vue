<template>
  <v-ons-page>
    <v-ons-toolbar class="primary toolbar-title">
      <div class="left">
        <v-ons-back-button></v-ons-back-button>
      </div>
      <div class="center fs-24 white--text">SUDOKU {{stage.toUpperCase()}}</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-item v-for="i in levels" :key="i" tappable v-hammer:tap="(e)=> goPlay(e, i + 1)" modifier="longdivider">
        <div class="w-100">
          <div class="float-left">LEVEL {{i+1}}</div>
          <div class="float-right" v-if="clearList.indexOf(String(i + 1)) !== -1" style="height: 10px;">
            <v-ons-icon icon="ion-ios-checkmark" class="fs-32 primary--text" style="margin-top:-6px;"></v-ons-icon>
          </div>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more"></div>
    </infinite-loading>
  </v-ons-page>
</template>

<style>
.page__content, .page__background{
  top: 64px !important;
}
</style>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import playPage from "./Play";
export default {
  props: ["stage"],
  name: "level-stage",
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      page: 1,
      width: 0,
      clearList: [],
    };
  },
  created(){
    this.gameSetting();
  },
  methods: {
    infiniteHandler($state) {
      if(this.levels.length < 200){
        let temp = [];
        for(let i = 20 * this.page ; i < 20 * (this.page + 1) ; i++){
          temp.push(i);
        }
        this.page += 1;
        this.levels = this.levels.concat(temp)
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    goPlay(e, id) {
      if(e.additionalEvent === 'pandown' || e.additionalEvent === 'panup'){
        return;
      }
      this.$emit("push-page", {
        ...playPage,
        onsNavigatorProps: {
          stage: this.stage,
          id: id
        }
      });
    },
    gameSetting() {
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