var adMob = null;
export function showBanner() {
  adMob = window.plugins.AdMob || window.AdMob;
  if (/(android)/i.test(navigator.userAgent) && adMob) {
    adMob.banner.config({
      id: "ca-app-pub-3940256099942544/6300978111",
      autoShow: true,
      isTesting: true
    });
    adMob.banner.prepare();
  }
}

export function showInterstitial(){
  adMob = window.plugins.AdMob || window.AdMob;
  if (/(android)/i.test(navigator.userAgent) && adMob) {

    adMob.interstitial.config({
      id: "ca-app-pub-3940256099942544/1033173712",
      autoShow: true,
      isTesting: true
    });
    adMob.interstitial.prepare();
  }
}

export function showRewarded(){
  adMob = window.plugins.AdMob || window.AdMob;
  if (/(android)/i.test(navigator.userAgent) && adMob) {

    adMob.rewarded.config({
      id: "ca-app-pub-3940256099942544/5224354917",
      autoShow: true,
      isTesting: true
    });
    adMob.rewarded.prepare();
  }
}
