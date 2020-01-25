<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center primary--text">CLEAR</div>
    </v-ons-toolbar>

    <div class="text-center pt-10">LEVEL CLEAR</div>
    <div class="text-center pt-10">
      <v-ons-toolbar-button>
        <v-ons-button class="next-btn">
          <v-ons-icon icon="md-arrow-right"></v-ons-icon>
        </v-ons-button>
      </v-ons-toolbar-button>
    </div>
  </v-ons-page>
</template>

<script>
// import { initAd, showAd } from "@/api/adMob.js";
import admob from 'cordova-plugin-admob-free'
export default {
  name: "clear",
  data() {
    return {};
  },
  created() {},
  mounted() {
    // banner.config({
    // id: 'ca-app-pub-3940256099942544/6300978111',
    // })
    document.addEventListener("deviceready", () => {
      console.log(123)
      // initAd();
      // showAd();
    });
//     banner.config({
//  id: 'ca-app-pub-3940256099942544/6300978111',
// })
// banner.prepare()

// // Show the banner
// banner.show()
  },
  destroyed() {},
  methods: {}
};
</script>

<style>
.next-btn{
  width:150px;
}
</style>