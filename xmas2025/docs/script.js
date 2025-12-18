// script.js 內容

document.addEventListener('DOMContentLoaded', function() {
    
    // 取得頁面元素
    const opener = document.getElementById('opener');
    const audio = document.getElementById('bgm');
    const content = document.getElementById('main-content');

    // 點擊禮物盒事件
    if (opener) {
        opener.addEventListener('click', function() {
            
            // 1. 播放音樂
            if(audio) {
                audio.volume = 0.5; // 設定音量
                audio.play().catch(e => console.log("Audio play failed:", e));
            }

            // 2. 啟動雪花特效
            createSnowflakes();

            // 3. 轉場動畫
            opener.style.opacity = '0'; // 禮物盒淡出
            
            setTimeout(() => {
                opener.style.display = 'none'; // 移除禮物盒
                
                // 顯示卡片並觸發 CSS 動畫
                content.style.display = 'block'; 
                setTimeout(() => {
                    content.classList.add('show'); // 加上 class 觸發彈出效果
                }, 50);
                
            }, 800); // 配合 CSS transition 時間
        });
    }

    // === 雪花生成函式 ===
    function createSnowflakes() {
        const snowCount = 30; // 雪花數量 (手機建議 30-50)
        const body = document.body;

        for (let i = 0; i < snowCount; i++) {
            const snow = document.createElement('div');
            snow.className = 'snowflake';
            snow.textContent = '❄'; // 雪花符號
            
            // 隨機設定參數
            const x = Math.random() * 100; // 水平位置 0-100%
            const delay = Math.random() * 5; // 延遲時間
            const duration = Math.random() * 10 + 5; // 飄落時間
            const size = Math.random() * 10 + 10; // 大小
            const opacity = Math.random() * 0.5 + 0.3; // 透明度

            // 套用樣式
            snow.style.left = x + 'vw';
            snow.style.animation = `fall ${duration}s linear infinite, sway ${duration/2}s ease-in-out infinite alternate`;
            snow.style.animationDelay = delay + 's';
            snow.style.fontSize = size + 'px';
            snow.style.opacity = opacity;

            body.appendChild(snow);
        }
        
        // 加入動態 Style (定義動畫關鍵影格)
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes fall {
                0% { top: -10vh; }
                100% { top: 110vh; }
            }
            @keyframes sway {
                0% { transform: translateX(-10px); }
                100% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});