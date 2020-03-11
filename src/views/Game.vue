<template>
  <v-ons-page>
    <v-ons-toolbar class="primary toolbar-title">
      <div class="center fs-20 white--text">SUDOKU PUZZLE</div>
    </v-ons-toolbar>

    <div class="content">
      <div class="content-wrap" :style="`background:url(${logoImage});height:100%; background-size:contain; background-repeat:repeat`">
        <v-ons-card class="text-center pa-5" style="border:2px solid #333; width:80%; background: #b5d0ff">
          <div class="pt-7 pb-8"><strong class="fs-24">LEVEL MODE</strong></div>

          <div class="mt-4">
            <p class="text-center" v-for="(tab, index) in tabs" :key="index">
              <v-ons-button
                class="pa-2 btn-stage"
                v-hammer:tap="(e)=> goGame(e, tab)"
                v-hammer:pan.start="(e)=> goGame(e, tab)"
              >{{tab.toUpperCase()}}</v-ons-button>
            </p>
          </div>
        </v-ons-card>
      </div>
    </div>
  </v-ons-page>
</template>

<style>
.content-wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.btn-item {
  border:2px solid #675bc5 !important;
  padding: 5px 0px !important;
  border-radius: 50px !important;
  margin:20px 0 10px 0 !important;
  width:48% !important;
}
.btn-item:active {
  transform: translateY(2px);
  background: #6c5ce7 !important;
}
.list-item__center, .list-item__right {
background-image: none !important;
}
:checked + .switch__toggle {
  box-shadow: inset 0 0 0 2px #6c5ce7 !important;
  background-color: #6c5ce7 !important;
}
</style>
<script>
import stagePage from "./Stage";
import logoImage from '@/assets/images/background.png';
export default {
  name: "game",
  data() {
    return {
      logoImage,
      // activeIndex: 0,
      // tabs: [
      //   {
      //     icon: this.md() ? null : 'ion-home',
      //     label: 'Home',
      //     page: homePage,
      //     props: {
      //       myProp: 'This is a page prop!'
      //     },
      //     key: "homePage"
      //   },
      //   {
      //     icon: this.md() ? null : 'ion-ios-bell',
      //     label: 'News',
      //     page: newsPage,
      //     badge: 7,
      //     key: "newsPage"
      //   },
      //   {
      //     icon: this.md() ? null : 'ion-ios-settings',
      //     label: 'Settings',
      //     page: settingsPage,
      //     key: "settingsPage"
      //   }
      // ]
      tabs: ["easy", "normal", "hard", "insane"],
    };
  },
  mounted() {
  },
  methods: {
    goGame(e, stage) {
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