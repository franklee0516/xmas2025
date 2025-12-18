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
                
                setTimeout(() => {
                    content.classList.add('show');
                    startTypewriter();
                }, 300);
            }, 800);
        });
    }

    // === 打字機功能 (維持不變) ===
    function startTypewriter() {
        const paragraphs = document.querySelectorAll('.message-body p');
        paragraphs.forEach(p => {
            p.dataset.text = p.innerText;
            p.innerText = '';
            p.style.opacity = '1';
        });

        let pIndex = 0;
        
        function typeNextParagraph() {
            if (pIndex >= paragraphs.length) return;
            const p = paragraphs[pIndex];
            const text = p.dataset.text;
            let charIndex = 0;
            p.style.borderRight = "2px solid #d4af37"; 

            function typeChar() {
                if (charIndex < text.length) {
                    p.innerText += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, Math.random() * 40 + 30);
                } else {
                    p.style.borderRight = "none";
                    pIndex++;
                    setTimeout(typeNextParagraph, 300);
                }
            }
            typeChar();
        }
        typeNextParagraph();
    }

    // === 雪花生成函式 (手機優化版) ===
    function createSnowflakes() {
        const body = document.body;
        
        // 偵測是否為手機 (螢幕寬度小於 768px)
        const isMobile = window.innerWidth < 768;

        // 手機版：雪花只有 15 片 / 電腦版：30 片
        const snowCount = isMobile ? 15 : 30; 

        for (let i = 0; i < snowCount; i++) {
            const snow = document.createElement('div');
            snow.className = 'snowflake';
            snow.textContent = '❄';
            
            const x = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 5;

            // 手機版：雪花較小 (8-13px) / 電腦版：(10-20px)
            const size = isMobile ? Math.random() * 5 + 8 : Math.random() * 10 + 10;
            
            // 手機版：雪花較淡 (透明度 0.1-0.4) / 電腦版：(0.3-0.8)
            const opacity = isMobile ? Math.random() * 0.3 + 0.1 : Math.random() * 0.5 + 0.3;

            snow.style.left = x + 'vw';
            snow.style.animation = `fall ${duration}s linear infinite, sway ${duration/2}s ease-in-out infinite alternate`;
            snow.style.animationDelay = delay + 's';
            snow.style.fontSize = size + 'px';
            snow.style.opacity = opacity;

            body.appendChild(snow);
        }
        
        // 加入動畫 keyframes (如果 HTML 裡沒有這段 style，JS 會自動補上)
        if (!document.getElementById('snow-keyframes')) {
            const styleSheet = document.createElement("style");
            styleSheet.id = 'snow-keyframes';
            styleSheet.innerText = `
                @keyframes fall { 0% { top: -10vh; } 100% { top: 110vh; } }
                @keyframes sway { 0% { transform: translateX(-10px); } 100% { transform: translateX(10px); } }
            `;
            document.head.appendChild(styleSheet);
        }
    }
});
