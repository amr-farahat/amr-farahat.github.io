document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // Navbar scroll effect
    // ============================================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================================
    // Scroll Reveal Animation (Intersection Observer)
    // ============================================================
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Enable to stop observing once revealed
            } else {
                entry.target.classList.remove('active'); // Enable to re-animate on scroll up
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the bottom
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // ============================================================
    // Active Navigation Link Highlighting
    // ============================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ============================================================
    // Typing Animation for the name
    // ============================================================
    const typedNameEl = document.getElementById('typed-name');
    if (typedNameEl) {
        const fullText = typedNameEl.textContent;
        typedNameEl.textContent = '';
        let charIndex = 0;

        function typeChar() {
            if (charIndex < fullText.length) {
                typedNameEl.textContent += fullText.charAt(charIndex);
                charIndex++;
                // Variable speed: faster for spaces, slower for commas
                const char = fullText.charAt(charIndex - 1);
                let delay = 60;
                if (char === ' ') delay = 30;
                else if (char === ',' || char === '.') delay = 200;
                setTimeout(typeChar, delay);
            }
        }

        // Start typing after a brief delay for the page to settle
        setTimeout(typeChar, 800);
    }

    // ============================================================
    // Theme Toggle (Dark Terminal / Light Editor)
    // ============================================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            if (themeIcon) {
                themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-adjust';
            }

            // "Command executed" flash on the toggle button
            themeToggle.classList.add('cmd-executed');
            setTimeout(() => themeToggle.classList.remove('cmd-executed'), 500);
        });
    }

    // ============================================================
    // Mobile Hamburger Menu
    // ============================================================
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            // Animate hamburger to X
            const spans = hamburger.querySelectorAll('span');
            if (mobileMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // ============================================================
    // "Command Executed" micro-animation on clickable cards
    // ============================================================
    document.querySelectorAll('.glass-card, .project-links a, .social-links a').forEach(el => {
        el.addEventListener('click', (e) => {
            // Don't prevent default — links should still work
            el.classList.add('cmd-executed');
            setTimeout(() => el.classList.remove('cmd-executed'), 500);
        });
    });

    // ============================================================
    // Dynamic status bar — update line/col based on scroll
    // ============================================================
    const statusLn = document.querySelector('.status-bar-right span:first-child');
    if (statusLn) {
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            const fakeLine = Math.max(1, Math.round(scrollPercent * 4.65));
            statusLn.textContent = `Ln ${fakeLine}, Col 1`;
        });
    }
});
