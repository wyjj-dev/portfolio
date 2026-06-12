// ── Hamburger Menu ──

function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}


// ── Theme (Dark / Light Mode) ──

const btn = document.getElementById("modeToggle");
const btn2 = document.getElementById("modeToggle2");
const themeIcons = document.querySelectorAll(".icon");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
    setDarkMode();
}

btn.addEventListener("click", function () {
    setTheme();
});

btn2.addEventListener("click", function () {
    setTheme();
});

function setTheme() {
    const currentTheme = document.body.getAttribute("theme");
    if (currentTheme === "dark") {
        setLightMode();
    } else {
        setDarkMode();
    }
}

function setDarkMode() {
    document.body.setAttribute("theme", "dark");
    localStorage.setItem("theme", "dark");
    themeIcons.forEach((icon) => {
        icon.src = icon.getAttribute("src-dark");
    });
}

function setLightMode() {
    document.body.removeAttribute("theme");
    localStorage.setItem("theme", "light");
    themeIcons.forEach((icon) => {
        icon.src = icon.getAttribute("src-light");
    });
}


// ── Navigation (Hide / Show on Scroll) ──

let lastScrollY = window.scrollY;
const desktopNav = document.getElementById('desktop-nav');
const hamburgerNav = document.getElementById('hamburger-nav');

window.addEventListener('scroll', () => {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');

    // Close hamburger menu on scroll
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        icon.classList.remove('open');
    }

    // Hide nav when scrolling down, show when scrolling up
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
        desktopNav.classList.add('hidden');
        hamburgerNav.classList.add('hidden');
    } else {
        desktopNav.classList.remove('hidden');
        hamburgerNav.classList.remove('hidden');
    }

    lastScrollY = window.scrollY;
});


// ── Typewriter Effect ──

const roles = ["Frontend Engineer", "AI/ML Enthusiast", "Aviation Hobbyist"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriter");

function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex--);
    } else {
        typewriterEl.textContent = current.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === current.length + 1) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();