<template>
  <div id="app">
    <v-ons-navigator
      id="navigator"
      swipe-target-width="200px"
      :page-stack="pageStack"
      @push-page="pushStack"
      @pop-page="popStack"
      @main-page="mainStack"
      @deviceBackButton="deviceBack"
    ></v-ons-navigator>
    
    <v-ons-modal :visible="closeVisible" @click="closeVisible = false">
      <div class="close-modal-wrap" :class="isModalOn ? 'on' : ''">
        <v-ons-card>
          <div class="black--text">Would you please leave a review<br/>before you exit?</div>
          <div class="pt-8 px-4">
            <v-ons-button modifier="quiet" class="text-center fo" 
            v-hammer:tap="(e)=> goClose(e, 'cancel')"
            v-hammer:press="(e)=> goClose(e, 'cancel')"
            v-hammer:pressup="(e)=> goClose(e, 'cancel')"
            v-hammer:pan.start="(e)=> goClose(e, 'cancel')">Cancel</v-ons-button>
            <v-ons-button class="text-center fo"
            v-hammer:tap="(e)=> goClose(e, 'No')"
            v-hammer:press="(e)=> goClose(e, 'No')"
            v-hammer:pressup="(e)=> goClose(e, 'No')"
            v-hammer:pan.start="(e)=> goClose(e, 'No')">No, Thanks</v-ons-button>
            <v-ons-button class="text-center fo"
            v-hammer:tap="(e)=> goClose(e, 'OK')"
            v-hammer:press="(e)=> goClose(e, 'OK')"
            v-hammer:pressup="(e)=> goClose(e, 'OK')"
            v-hammer:pan.start="(e)=> goClose(e, 'OK')">OK</v-ons-button>
          </div>
        </v-ons-card>
      </div>
    </v-ons-modal>
  </div>
</template>

<script>
import gamePage from "@/views/Game";
import { initAd, removeBanner, showInterstitial } from "@/api/admob.js";
export default {
  name: "app",
  data() {
    return {
      pageStack: [gamePage],
      closeVisible: false,
      isModalOn: false,
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
    });
    setTimeout(() => {
      this.$ons.GestureDetector(document.getElementById("navigator")).dispose();
    }, 10);
    this.$store.dispatch("levels/setGameMode");
  },
  methods: {
    pushStack(e){
      this.pageStack.push(e)
    },
    popStack(e){
      this.pageStack.pop();
      removeBanner();
    },
    mainStack(){
      this.pageStack = [gamePage];
      removeBanner();
    },
    goClose(e, title){
      if(e.type === 'tap' || e.type === 'pressup' || e.type === 'panstart'){
        if (title === "cancel") {
          setTimeout(() => {
            this.isModalOn = false;
          }, 100)
          setTimeout(() => {
            this.closeVisible = false;
          }, 400)
        } else if(title === "No") {
          showInterstitial();
          navigator.app.exitApp();
        } else if(title === "OK") {
          location.href = "https://play.google.com/store/apps/details?id=com.f5game.sudoku";
        }
      }
    },
    deviceBack(e){
      if(this.pageStack.length === 1){
        e.preventDefault();
        setTimeout(() => {
          this.isModalOn = true;
        }, 100)
        setTimeout(() => {
          this.closeVisible = true;
        }, 400)
      }
    }
  }
};
</script>