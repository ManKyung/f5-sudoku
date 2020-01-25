<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center primary--text">CLEAR</div>
    </v-ons-toolbar>

    <div class="text-center pt-10">
    <img src="../assets/images/clear.gif" style="width:80%" class="mb-7"/>
      <v-ons-toolbar-button class="pa-0" v-touch:tap="nextHandler">
        <v-ons-button class="next-btn">
          <v-ons-icon icon="md-arrow-right"></v-ons-icon>
        </v-ons-button>
      </v-ons-toolbar-button>
    </div>
  </v-ons-page>
</template>

<script>
import {showInterstitial} from '@/api/admob.js'
export default {
  name: "clear",
  data() {
    return {
      params: this.$router.history.current.params,
    };
  },
  mounted(){
    document.addEventListener("deviceready", function(){
      showInterstitial();
    })
  },
  methods: {
    nextHandler(){
      let stage = this.params.stage;
      let id = this.params.id;
      this.$router.push({
        name: "Play",
        params: { stage: stage, id: id }
      });
    },
  }
};
</script>

<style>
.next-btn{
  width:150px;
}
</style>