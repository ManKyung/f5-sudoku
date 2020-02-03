<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center primary--text">CLEAR</div>
    </v-ons-toolbar>

    <div class="text-center pt-10">
      <img src="../assets/images/clear.gif" style="width:80%" class="mb-7" />
      <v-ons-toolbar-button class="pa-0" v-if="isShow" @click="nextHandler">
        <v-ons-button class="next-btn">
          <v-ons-icon icon="md-arrow-right"></v-ons-icon>
        </v-ons-button>
      </v-ons-toolbar-button>
    </div>
  </v-ons-page>
</template>

<script>
import playPage from "./Play";
import { showInterstitial } from "@/api/admob.js";
export default {
  props: ["stage", "id"],
  name: "clear",
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 2000);
    setTimeout(() => {
      showInterstitial();
    }, 1000);
  },
  methods: {
    nextHandler() {
      this.$emit("push-page", {
        ...playPage,
        onsNavigatorProps: {
          stage: this.stage,
          id: this.id
        }
      });
    }
  }
};
</script>

<style>
.next-btn {
  width: 150px;
}
</style>