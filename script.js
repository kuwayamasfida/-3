// script.js

// 動画要素を取得
const video = document.getElementById('myVideo');
// 全てのCTAボタンを取得 
const ctaButtons = document.querySelectorAll('.cta-buttons-overlay button'); 
// カスタム全画面ボタンを取得 
const fullscreenButton = document.getElementById('btn-fullscreen');
// 全画面表示のターゲット要素
const fullscreenTarget = document.querySelector('.video-wrapper');

// =========================================================
// 1. CTAボタンの有効/無効切り替えロジック
// =========================================================

/**
 * 💡 修正点：各CTAボタンのIDとタイミングを一致させ、5つ目のボタンを追加
 */
const ctaTimings = {
    // HTML ID: btn-feature
    'btn-feature': { start: 15, end: 25, url: 'https://www.sfidax.jp/company/' },
    // HTML ID: btn-strength
    'btn-strength': { start: 15, end: 25, url: 'https://www.sfidax.jp/company/' },
    // HTML ID: btn-choice (情報の選択)
    'btn-choice': { start: 15, end: 25, url: 'https://www.sfidax.jp/recruit/' },
    // HTML ID: btn-example
    'btn-example': { start: 15, end: 25, url: 'https://maruwa-kainyou.com/' },
    // HTML ID: btn-caution (注意点)
    'btn-caution': { start: 15, end: 25, url: 'https://www.sfidax.jp/access/' } // 新しいタイミングを設定
};

/**
 * 動画の現在の再生時間に基づいてCTAボタンの有効/無効を切り替える関数
 */
function updateButtonState() {
    const currentTime = video.currentTime;

    ctaButtons.forEach(button => {
        const buttonId = button.id;
        // 💡 ctaTimingsの定義とHTMLのIDを照合
        const timing = ctaTimings[buttonId]; 

        if (timing) {
            // 現在の時間が表示範囲内にあるかチェック
            if (currentTime >= timing.start && currentTime < timing.end) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        } else {
            // 💡 IDがctaTimingsに存在しないボタンは常に無効にしておく
            button.disabled = true;
        }
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
        // 必要であればここで video.pause(); を呼び出し動画を一時停止する
    }
}

// =========================================================
// 2. カスタム全画面ロジック (変更なし)
// =========================================================

/**
 * 全画面表示の切り替え処理
 */
function toggleFullscreen() {
    const target = fullscreenTarget; // .video-wrapper要素
    
    // 現在全画面表示中の要素を取得 (クロスブラウザ対応)
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
    
    if (isFullscreen) {
        // 全画面を解除
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        }
    } else {
        // 全画面を表示
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
    // 現在全画面表示中の要素を取得 (クロスブラウザ対応)
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
    
    if (isFullscreen) {
        fullscreenButton.textContent = '全画面解除';
    } else {
        fullscreenButton.textContent = '全画面27';
    }
}


// --- イベントリスナーの設定 (変更なし) ---

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