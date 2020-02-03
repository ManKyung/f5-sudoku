var admob = null;

// 실제
var admobId = {
  android: {
    banner: 'ca-app-pub-1963334904140891/2526023933',
    interstitial: 'ca-app-pub-1963334904140891/7165489987',
    rewardvideo: 'ca-app-pub-1963334904140891/9128226771',
  },
  ios: {
    banner: 'ca-app-pub-1963334904140891/9613234519',
    interstitial: 'ca-app-pub-1963334904140891/3034673284',
    rewardvideo: 'ca-app-pub-1963334904140891/5333533567',
  }
}

// 테스트
// var admobId = {
//   android: {
//     banner: 'ca-app-pub-3940256099942544/6300978111',
//     interstitial: 'ca-app-pub-3940256099942544/1033173712',
//     rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
//   },
//   ios: {
//     banner: 'ca-app-pub-3940256099942544/6300978111',
//     interstitial: 'ca-app-pub-3940256099942544/1033173712',
//     rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
//   }
// }

export function initAd() {
  admob = window.plugins.admob || window.admob;
  if (/(android)/i.test(navigator.userAgent) && admob) {
    // 배너
    admob.banner.config({
      id: admobId.android.banner,
      autoShow: false,
    });
    admob.banner.prepare();

    // 전면
    admob.interstitial.config({
      id: admobId.android.interstitial,
      autoShow: false,
    });
    admob.interstitial.prepare();

    // 리워드
    admob.rewardvideo.config({
      id: admobId.android.rewardvideo,
      autoShow: false,
    });
    admob.rewardvideo.prepare();

  } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent) && admob) {
    // 배너
    admob.banner.config({
      id: admobId.ios.banner,
      autoShow: false,
    });
    admob.banner.prepare();

    // 전면
    admob.interstitial.config({
      id: admobId.ios.interstitial,
      autoShow: false,
    });
    admob.interstitial.prepare();

    // 리워드
    admob.rewardvideo.config({
      id: admobId.ios.rewardvideo,
      autoShow: false,
    });
    admob.rewardvideo.prepare();
  }

  let interstitialEvent = ['LOAD_FAIL', 'CLOSE', 'EXIT_APP'];
  interstitialEvent.forEach((v) => {
    document.addEventListener(`admob.interstitial.events.${v}`, function () {
      admob.interstitial.prepare();
    })
  })

  let rewardvideoEvent = ['LOAD_FAIL', 'CLOSE', 'EXIT_APP', 'REWARD'];
  rewardvideoEvent.forEach((v) => {
    document.addEventListener(`admob.rewardvideo.events.${v}`, function () {
      admob.rewardvideo.prepare();
    })
  })
}

export function showBanner() {
  if (admob) {
    admob.banner.show();
  }
}
export function removeBanner() {
  if (admob) {
    admob.banner.remove();
  }
}
export function showInterstitial() {
  if (admob) {
    admob.interstitial.show();
  }
}
export function showRewardVideo() {
  if (admob) {
    admob.rewardvideo.show();
  }
}
