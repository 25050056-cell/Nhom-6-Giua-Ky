document.addEventListener('DOMContentLoaded', () => {

    /* 1. CHẾ ĐỘ DARK / LIGHT MODE */
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeBtn.addEventListener('click', () => {
        let isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    /* 2. MOBILE MENU TOGGLE */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navbar = document.getElementById('navbar');

    mobileBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Tự động đóng menu mobile khi nhấn chọn link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });

    /* 3. TYPING ANIMATION (HIỆU ỨNG GÕ CHỮ) */
    const typingText = document.querySelector('.typing-text');
    const roles = ['Graphic Designer', 'Sinh viên CNTT'];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const current = roles[roleIdx];
        if (isDeleting) {
            typingText.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingText.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIdx === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }
    type();

    /* 4. SCROLL TO TOP & ACTIVE NAV LINK */
    const scrollTop = document.getElementById('scroll-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Nút Scroll to top
        if (window.scrollY > 300) {
            scrollTop.style.display = 'flex';
        } else {
            scrollTop.style.display = 'none';
        }

        // Active link khi scroll qua các phần
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* 5. KIỂM TRA FORM LIÊN HỆ (FORM VALIDATION) */
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Validation Họ tên & Nội dung
        ['name', 'message'].forEach(id => {
            const input = document.getElementById(id);
            if (!input.value.trim()) {
                input.parentElement.classList.add('error');
                valid = false;
            } else {
                input.parentElement.classList.remove('error');
            }
        });

        // Validation Email
        const email = document.getElementById('email');
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.value.match(emailPattern)) {
            email.parentElement.classList.add('error');
            valid = false;
        } else {
            email.parentElement.classList.remove('error');
        }

        // Hiển thị thông báo khi hợp lệ
        if (valid) {
            const successMsg = document.getElementById('form-success');
            successMsg.style.display = 'block';
            form.reset();
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 4000);
        }
    });
});