/**
 * 张韬 - 产品经理个人简历网站主脚本
 * 实现导航、滚动效果、粒子效果、雷达图和其他交互功能
 */

// DOM 元素
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('back-to-top');
const currentYear = document.getElementById('current-year');
const toggleButtons = document.querySelectorAll('.toggle-details');

// 设置当前年份
currentYear.textContent = new Date().getFullYear();

// 移动端菜单切换
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 点击导航链接时，关闭移动端菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// 项目卡片展开/折叠
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectCard = button.closest('.expandable-card');
        const details = projectCard.querySelector('.project-details');
        
        // 切换详情显示状态
        details.classList.toggle('active');
        button.classList.toggle('active');
        
        // 更新按钮文本
        if (details.classList.contains('active')) {
            button.innerHTML = '收起详情 <i class="ri-arrow-up-s-line"></i>';
        } else {
            button.innerHTML = '查看详情 <i class="ri-arrow-down-s-line"></i>';
        }
    });
});

// 返回顶部按钮
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 滚动动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// 初始化粒子效果和雷达图
document.addEventListener('DOMContentLoaded', () => {
    // 初始化雷达图
    setTimeout(() => {
        initRadarChart();
    }, 500);
    
    // 粒子效果配置 - 修改为更加柔和的视觉效果
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 40,  // 减少粒子数量
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": "#6a30a2"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.2,  // 降低不透明度
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.2,  // 减慢动画速度
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,  // 减小粒子尺寸
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,  // 减慢尺寸变化速度
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6a30a2",
                "opacity": 0.15,  // 降低连线不透明度
                "width": 0.8  // 减小连线宽度
            },
            "move": {
                "enable": true,
                "speed": 0.5,  // 减慢移动速度
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": false,  // 禁用点击效果，减少干扰
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.3  // 降低交互时连线的不透明度
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 20,
                    "duration": 2,
                    "opacity": 4,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 2  // 减少点击添加的粒子数
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // 卡片交互效果
    document.querySelectorAll('.section-card, .project-card, .honor-card').forEach(card => {
        // 移除原有的3D效果，改为光效果交互
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-active');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-active');
        });
    });
    
    // 创建科技网格背景
    createTechGrid();
    
    // 实现滚动指示器
    createScrollIndicator();
    
    // 实现光标光晕
    createCursorGlow();
    
    // 在首页标题应用打字机效果
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const text = heroDescription.innerText;
        heroDescription.innerHTML = '';
        heroDescription.classList.add('typing-effect');
        
        // 将文本按句号和逗号分割成多行
        const lines = text.split(/([。，,.])/);
        const formattedLines = [];
        
        // 重新组合分割的文本，保留分隔符
        for (let i = 0; i < lines.length; i += 2) {
            if (i + 1 < lines.length) {
                formattedLines.push(lines[i] + lines[i+1]);
            } else {
                formattedLines.push(lines[i]);
            }
        }
        
        // 实现逐行显示效果，速度调慢
        let lineIndex = 0;
        let currentLine = '';
        
        function typeLine() {
            if (lineIndex < formattedLines.length) {
                const line = formattedLines[lineIndex];
                heroDescription.innerHTML += line + '<br>';
                lineIndex++;
                
                // 逐行显示，每行之间延迟800毫秒
                setTimeout(typeLine, 800);
            } else {
                // 全部显示完成后，移除打字效果
                setTimeout(() => {
                    heroDescription.classList.remove('typing-effect');
                }, 1000);
            }
        }
        
        // 开始打字效果，延迟启动
        setTimeout(typeLine, 500);
    }
});

// 初始化雷达图
function initRadarChart() {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;
    
    // 能力值数据
    const data = {
        labels: ['执行力', '分析力', '策略力', '洞察力', '钻研力'],
        datasets: [{
            label: '能力评分',
            data: [90, 85, 88, 92, 95],
            backgroundColor: 'rgba(106, 48, 162, 0.2)',
            borderColor: 'rgba(106, 48, 162, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(106, 48, 162, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(106, 48, 162, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };
    
    // 图表配置
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1a202c',
                    bodyColor: '#1a202c',
                    borderColor: 'rgba(106, 48, 162, 0.3)',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '/100';
                        }
                    }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        display: false,
                        stepSize: 20
                    },
                    angleLines: {
                        color: 'rgba(106, 48, 162, 0.1)',
                    },
                    grid: {
                        color: 'rgba(106, 48, 162, 0.1)',
                    },
                    pointLabels: {
                        color: '#1a202c',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            animation: {
                duration: 1500
            }
        }
    };
    
    try {
        // 创建雷达图
        new Chart(ctx, config);
        console.log('雷达图初始化成功');
    } catch (error) {
        console.error('雷达图初始化失败:', error);
    }
}

// 滚动视差效果
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // 背景视差
    document.body.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    
    // 卡片视差，改为更轻微的效果
    document.querySelectorAll('.section-card').forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight && cardTop > -card.offsetHeight) {
            const scrollDistance = (window.innerHeight - cardTop) / 10;
            card.style.transform = `translateY(${Math.min(scrollDistance, 15)}px)`;
        }
    });
    
    // 元素视差
    document.querySelectorAll('.section-title').forEach(title => {
        const titleTop = title.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (titleTop < windowHeight) {
            const opacity = 1 - (titleTop < 0 ? 0 : titleTop / windowHeight);
            title.style.opacity = Math.max(0.5, opacity);
        }
    });
});

// 创建科技网格背景
function createTechGrid() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'tech-grid-background';
    document.body.appendChild(gridContainer);
    
    const gridSize = 20;
    const rows = Math.ceil(window.innerHeight / gridSize);
    const cols = Math.ceil(window.innerWidth / gridSize);
    
    for (let i = 0; i < rows * cols; i++) {
        const dot = document.createElement('div');
        dot.className = 'grid-dot';
        
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        dot.style.top = row * gridSize + 'px';
        dot.style.left = col * gridSize + 'px';
        
        // 随机透明度和大小
        const originalOpacity = Math.random() * 0.5 + 0.1;
        dot.style.opacity = originalOpacity;
        dot.dataset.originalOpacity = originalOpacity;
        
        gridContainer.appendChild(dot);
    }
    
    // 添加鼠标交互
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        document.querySelectorAll('.grid-dot').forEach(dot => {
            const dotX = dot.offsetLeft;
            const dotY = dot.offsetTop;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - dotX, 2) + 
                Math.pow(mouseY - dotY, 2)
            );
            
            if (distance < 100) {
                const scale = 1 - distance / 100;
                dot.style.transform = `scale(${1 + scale})`;
                dot.style.opacity = Math.min(1, parseFloat(dot.dataset.originalOpacity) + 0.3);
            } else {
                dot.style.transform = 'scale(1)';
                dot.style.opacity = dot.dataset.originalOpacity;
            }
        });
    });
}

// 创建滚动指示器
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        indicator.style.width = scrollPercentage + '%';
    });
}

// 创建光标光晕
function createCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // 交互元素悬停时放大光晕，但更加轻微
    document.querySelectorAll('a, button, .btn, .skill-tag').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.2)'; // 减小放大效果
            cursor.style.opacity = '0.3'; // 降低不透明度
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '0.3'; // 保持较低的不透明度
        });
    });
}

// 数值动画函数
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.innerHTML = currentValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

// 打字机效果
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.innerHTML = '';
                i = 0;
                type();
            }, 3000);
        }
    }
    
    type();
} 