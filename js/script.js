document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Typing Animation
    const typeWriter = document.getElementById('typewriter');
    const text = "init --portfolio --neuro-ai";
    let i = 0;

    function type() {
        if (i < text.length) {
            typeWriter.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            // Add a small delay then execute "command"
            setTimeout(showLoadedMessage, 500);
        }
    }

    function showLoadedMessage() {
        const terminalBody = document.querySelector('.terminal-body');
        const loadMsg = document.createElement('div');
        loadMsg.style.color = 'var(--comment)';
        loadMsg.style.marginTop = '10px';
        loadMsg.innerHTML = '> Accessing neural circuits... OK<br>> Optimizing deep learning models... OK<br>> Welcome back, Dr. Farahat.';
        terminalBody.appendChild(loadMsg);
    }

    type();

    // Scroll Reveal Animation (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Active Navigation Link Highlighting (Tabs)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
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

    // Prompt interaction
    const terminalWindow = document.querySelector('.terminal-window');
    terminalWindow.addEventListener('click', () => {
        console.log("Terminal ready for input...");
    });
});
