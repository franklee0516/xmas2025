document.addEventListener('DOMContentLoaded', function() {
    
    const opener = document.getElementById('opener');
    const audio = document.getElementById('bgm');
    const content = document.getElementById('main-content');

    if (opener) {
        opener.addEventListener('click', function() {
            // 1. 播放音樂
            if(audio) {
                audio.volume = 0.5;
                audio.play().catch(e => console.log("Audio play failed:", e));
            }

            // 2. 啟動雪花
            createSnowflakes();

            // 3. 轉場並啟動打字機
            opener.style.opacity = '0';
            setTimeout(() => {
                opener.style.display = 'none';
                content.style.display = 'block';
                
                // 延遲一點點再開始打字，讓卡片先浮現
                setTimeout(() => {
                    content.classList.add('show');
                    startTypewriter(); // <--- 啟動打字機功能
                }, 300);
            }, 800);
        });
    }

    // === 打字機核心功能 ===
    function startTypewriter() {
        // 抓取所有段落 <p>
        const paragraphs = document.querySelectorAll('.message-body p');
        
        // 先把所有文字藏起來，但保留高度以免版面跳動
        paragraphs.forEach(p => {
            p.dataset.text = p.innerText; // 備份文字
            p.innerText = '';             // 清空內容
            p.style.opacity = '1';        // 確保容器可見
        });

        let pIndex = 0; // 目前打到第幾段
        
        function typeNextParagraph() {
            if (pIndex >= paragraphs.length) return; // 全部打完就結束

            const p = paragraphs[pIndex];
            const text = p.dataset.text;
            let charIndex = 0;

            // 模擬打字游標樣式 (選用)
            p.style.borderRight = "2px solid #d4af37"; 

            function typeChar() {
                if (charIndex < text.length) {
                    p.innerText += text.charAt(charIndex);
                    charIndex++;
                    // 打字速度：隨機 30ms ~ 70ms，比較像真人
                    setTimeout(typeChar, Math.random() * 40 + 30);
                } else {
                    // 這一段打完了
                    p.style.borderRight = "none"; // 移除游標
                    pIndex++;
                    setTimeout(typeNextParagraph, 300); // 停頓 300ms 再打下一段
                }
            }
            typeChar();
        }

        // 開始打第一段
        typeNextParagraph();
    }

    // === 雪花生成函式 (維持不變) ===
    function createSnowflakes() {
        const snowCount = 30; 
        const body = document.body;
        for (let i = 0; i < snowCount; i++) {
            const snow = document.createElement('div');
            snow.className = 'snowflake';
            snow.textContent = '❄';
            const x = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 5;
            const size = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.3;
            snow.style.left = x + 'vw';
            snow.style.animation = `fall ${duration}s linear infinite, sway ${duration/2}s ease-in-out infinite alternate`;
            snow.style.animationDelay = delay + 's';
            snow.style.fontSize = size + 'px';
            snow.style.opacity = opacity;
            body.appendChild(snow);
        }
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes fall { 0% { top: -10vh; } 100% { top: 110vh; } }
            @keyframes sway { 0% { transform: translateX(-10px); } 100% { transform: translateX(10px); } }
        `;
        document.head.appendChild(styleSheet);
    }
});
