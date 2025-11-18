document.addEventListener('DOMContentLoaded', () => {
    // --- 深色模式切换功能 ---
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;

    // 检查用户是否有保存的主题偏好
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }

    // 切换主题时保存偏好
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // --- 滚动动画效果 ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1, // 元素 10% 进入视口时触发
        rootMargin: "0px 0px -50px 0px" // 底部留出 50px 缓冲
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                appearOnScroll.unobserve(entry.target); // 动画只播放一次
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- 动态更新 footer 中的日期 ---
    const lastUpdatedSpan = document.getElementById('last-updated');
    if (lastUpdatedSpan) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        lastUpdatedSpan.textContent = `${yyyy}-${mm}-${dd}`;
    }
});
