// 1. Canvas Hiệu ứng Cánh hoa (ko giong thi ke)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let petals = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Petal {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20; // Bắt đầu từ phía trên màn hình
        this.size = Math.random() * 8 + 4; // Kích thước cánh hoa
        this.speedY = Math.random() * 1.2 + 0.5; // Tốc độ rơi xuống
        this.speedX = Math.random() * 1 - 0.5; // Độ lượn sóng ngang nhẹ
        this.rotation = Math.random() * 360; // Góc xoay
        this.rotationSpeed = Math.random() * 2 - 1; // Tốc độ xoay
        this.opacity = Math.random() * 0.5 + 0.3; // Độ trong suốt
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 30) * 0.5; // Hiệu ứng gió thổi nhẹ
        this.rotation += this.rotationSpeed;

        // Nếu rơi quá đáy màn hình thì reset lại từ đỉnh
        if (this.y > canvas.height + 20) {
            this.reset();
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        
        // Vẽ hình dáng cánh hoa mềm mại (dùng hình ellipse)
        ctx.fillStyle = '#e9d5ff';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// Tạo 40 cánh hoa rơi (nhiu qua so lag)
for (let i = 0; i < 40; i++) {
    let p = new Petal();
    p.y = Math.random() * canvas.height; // Phân bổ sẵn ngẫu nhiên khắp màn hình khi mới load
    petals.push(p);
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// 2. Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 3. Dark / Light Mode Toggle
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

// 4. Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// 5. Form Validation & Toast Notification
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name.value.trim() === '') {
        document.getElementById('nameError').innerText = 'Vui lòng nhập họ tên!';
        isValid = false;
    } else {
        document.getElementById('nameError').innerText = '';
    }

    if (email.value.trim() === '' || !email.value.includes('@')) {
        document.getElementById('emailError').innerText = 'Vui lòng nhập email hợp lệ!';
        isValid = false;
    } else {
        document.getElementById('emailError').innerText = '';
    }

    if (message.value.trim() === '') {
        document.getElementById('messageError').innerText = 'Vui lòng nhập lời nhắn!';
        isValid = false;
    } else {
        document.getElementById('messageError').innerText = '';
    }

    if (isValid) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
        contactForm.reset();
    }
});