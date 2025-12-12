// 動画要素を取得
const video = document.getElementById('myVideo');
// 全てのCTAボタンを取得 
const ctaButtons = document.querySelectorAll('.cta-buttons-overlay button'); 
// カスタム全画面ボタンを取得 
const fullscreenButton = document.getElementById('btn-fullscreen');
// 全画面表示のターゲット要素
const fullscreenTarget = document.querySelector('.video-wrapper');
// 有効化の閾値（10秒）
const THRESHOLD_TIME = 10;

// =========================================================
// 1. CTAボタンの有効/無効切り替えロジック
// =========================================================

/**
 * 動画の現在の再生時間に基づいてCTAボタンの有効/無効を切り替える関数
 */
function updateButtonState() {
  const currentTime = video.currentTime;
  const isEnabled = currentTime >= THRESHOLD_TIME;

  ctaButtons.forEach(button => {
    button.disabled = !isEnabled;
  });
}

/**
 * CTAボタンがクリックされたときの処理
 */
function handleCtaClick(event) {
  const button = event.currentTarget;
  if (button.disabled) {
    return;
  }
  const url = button.getAttribute('data-url');
  if (url) {
    window.open(url, '_blank');
  }
}

// =========================================================
// 2. カスタム全画面ロジック
// =========================================================

/**
 * 全画面表示の切り替え処理
 */
function toggleFullscreen() {
  const target = fullscreenTarget; // .video-wrapper要素
  
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
    // 現在全画面表示中の場合 -> 全画面を解除
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    }
  } else {
    // 現在全画面表示中でない場合 -> 全画面を表示
    if (target.requestFullscreen) {
      target.requestFullscreen();
    } else if (target.webkitRequestFullscreen) { /* Chrome, Safari, Edge */
      target.webkitRequestFullscreen();
    } else if (target.mozRequestFullScreen) { /* Firefox */
      target.mozRequestFullScreen();
    }
  }
}

/**
 * 全画面状態が変化した際のボタンテキスト更新
 */
function handleFullscreenChange() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
    fullscreenButton.textContent = '全画面解除';
  } else {
    fullscreenButton.textContent = '全画面';
  }
}


// --- イベントリスナーの設定 ---

// CTAのロジック
video.addEventListener('timeupdate', updateButtonState);
video.addEventListener('loadedmetadata', updateButtonState);
ctaButtons.forEach(button => {
  button.addEventListener('click', handleCtaClick);
});

// カスタム全画面のロジック
fullscreenButton.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
