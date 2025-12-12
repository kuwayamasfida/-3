// script.js

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('myVideo');
    const videoWrapper = document.querySelector('.video-wrapper');
    const fullscreenButton = document.getElementById('btn-fullscreen');
    const ctaButtons = document.querySelectorAll('.cta-buttons-overlay button');

    // --- 1. インタラクティブなCTAボタンの制御 ---
    
    // 各CTAボタンの表示・有効化する時間を定義 (秒)
    const ctaTimings = {
        'btn-feature': { start: 5, end: 10, url: 'https://www.sfidax.jp/company/' },
        'btn-strength': { start: 15, end: 20, url: 'https://www.sfidax.jp/recruit/' },
        'btn-caution': { start: 25, end: 30, url: 'https://www.sfidax.jp/access/' },
        'btn-example': { start: 35, end: 40, url: 'https://www.sfidax.jp/business/' }
        // 必要に応じて増やしてください
    };

    // 再生時間を監視するイベントリスナー
    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;

        ctaButtons.forEach(button => {
            const buttonId = button.id;
            const timing = ctaTimings[buttonId];

            if (timing) {
                // 現在の時間が表示範囲内にあるかチェック
                if (currentTime >= timing.start && currentTime < timing.end) {
                    // 表示と有効化
                    button.classList.add('active');
                    button.disabled = false;
                } else {
                    // 非表示と無効化
                    button.classList.remove('active');
                    button.disabled = true;
                }
            }
        });
    });

    // CTAボタンクリック時の処理 (新しいタブでURLを開く)
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.disabled) {
                const url = button.dataset.url;
                if (url) {
                    window.open(url, '_blank');
                    // クリック時に動画を一時停止する場合:
                    // video.pause(); 
                }
            }
        });
    });


    // --- 2. カスタム全画面ボタンの制御 ---
    
    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenElement) {
            // 全画面表示を終了
            document.exitFullscreen();
        } else {
            // videoWrapperを全画面表示にする
            if (videoWrapper.requestFullscreen) {
                videoWrapper.requestFullscreen();
            } else if (videoWrapper.webkitRequestFullscreen) { /* Safari */
                videoWrapper.webkitRequestFullscreen();
            } else if (videoWrapper.msRequestFullscreen) { /* IE11 */
                videoWrapper.msRequestFullscreen();
            }
        }
    });

    // 全画面表示の切り替えに応じてボタンのテキストを変更
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenButton.textContent = '全画面解除';
        } else {
            fullscreenButton.textContent = '全画面';
        }
    });
});
