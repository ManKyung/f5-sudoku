<template>
  <div id="app">
    <v-ons-navigator
      swipeable
      swipe-target-width="200px"
      :page-stack="pageStack"
      @push-page="pageStack.push($event)"
    ></v-ons-navigator>
  </div>
</template>

<script>
import gamePage from "@/views/Game";
import { initAd, showBanner } from "@/api/admob.js";
export default {
  name: "app",
  data() {
    return {
      pageStack: [gamePage]
    };
  },
  created() {
    this.$ons.disableAutoStyling();
    window.addEventListener("orientationchange", function() {
      if (window.innerHeight > window.innerWidth) {
        document.getElementsByTagName("body").style.transform = "rotate(90deg)";
      }
    });
  },
  mounted() {
    document.addEventListener("deviceready", function() {
      initAd();

      setTimeout(() => {
        showBanner();
      }, 500);
    });
  }
};
</script>