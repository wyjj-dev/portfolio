// ── Hamburger Menu ──
function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}


// ── Theme (Dark / Light Mode) ──
const themeIcons = document.querySelectorAll('.icon');

if (localStorage.getItem('theme') === 'dark') {
    setDarkMode();
}

document.getElementById('modeToggle').addEventListener('click', toggleTheme);
document.getElementById('modeToggle2').addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.getAttribute('theme') === 'dark' ? setLightMode() : setDarkMode();
}

function setDarkMode() {
    document.body.setAttribute('theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeIcons.forEach(icon => icon.src = icon.getAttribute('src-dark'));
}

function setLightMode() {
    document.body.removeAttribute('theme');
    localStorage.setItem('theme', 'light');
    themeIcons.forEach(icon => icon.src = icon.getAttribute('src-light'));
}


// ── Scroll Listener (Nav hide + Snap Scroll) ──
let lastScrollY = window.scrollY;
let hasSnapped = false;
let navClicked = false;

const desktopNav = document.getElementById('desktop-nav');
const hamburgerNav = document.getElementById('hamburger-nav');
const profile = document.getElementById('profile');

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        navClicked = true;
        setTimeout(() => navClicked = false, 1000);
    });
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');

    // Close hamburger on scroll
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        icon.classList.remove('open');
    }

    // Hide nav scrolling down, show scrolling up
    if (scrollY > lastScrollY && scrollY > 80 && !navClicked) {
        desktopNav.classList.add('hidden');
        hamburgerNav.classList.add('hidden');
    } else {
        desktopNav.classList.remove('hidden');
        hamburgerNav.classList.remove('hidden');
    }

    lastScrollY = scrollY;

    // Snap scroll: profile → about
    const profileBottom = profile.offsetTop + profile.offsetHeight;

    if (scrollY < 50) hasSnapped = false;

    if (!hasSnapped && !navClicked && scrollY > profile.offsetHeight * 0.05 && scrollY < profileBottom) {
        hasSnapped = true;
        window.scrollTo({ top: document.getElementById('about').offsetTop, behavior: 'smooth' });
    }
});


// ── Typewriter Effect ──
const roles = ['Frontend Engineer', 'AI/ML Enthusiast', 'Aviation Hobbyist'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function type() {
    const current = roles[roleIndex];

    typewriterEl.textContent = current.substring(0, isDeleting ? charIndex-- : charIndex++);

    if (!isDeleting && charIndex === current.length + 1) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();


// ── Project Filter ──
const filterTags = document.querySelectorAll('.filter-tag');
const projectCards = document.querySelectorAll('#projects .details-container[data-tags]');

filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        filterProjects(tag.getAttribute('data-tag'));
    });
});

function filterProjects(selectedTag) {
    projectCards.forEach(card => {
        const cardTags = card.getAttribute('data-tags').split(',').map(t => t.trim());
        card.classList.toggle('hidden', selectedTag !== 'all' && !cardTags.includes(selectedTag));
    });
}