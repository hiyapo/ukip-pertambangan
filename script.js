/* =============================================
   UKIP Teknik Pertambangan - JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Preloader
    // =========================================
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.querySelector('.preloader-bar-inner');
    let progress = 0;

    const preloaderInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(preloaderInterval);
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.style.overflow = '';
            }, 400);
        }
        if (preloaderBar) {
            preloaderBar.style.width = progress + '%';
        }
    }, 150);

    // Fallback: remove preloader after 3s max
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
            document.body.style.overflow = '';
        }
    }, 3000);

    // =========================================
    // Header Scroll Effect
    // =========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // =========================================
    // Mobile Menu
    // =========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav-overlay');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // =========================================
    // Smooth Scrolling for anchor links
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Ignore empty hash links
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // Hero Particles
    // =========================================
    const particleContainer = document.querySelector('.hero-particles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particleContainer.appendChild(particle);
        }
    }

    // =========================================
    // Animated Counter
    // =========================================
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                countersAnimated = true;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000;
                const start = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(target * eased);

                    counter.textContent = current.toLocaleString('id-ID') + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString('id-ID') + suffix;
                    }
                }

                requestAnimationFrame(updateCounter);
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // =========================================
    // Scroll Reveal Animations
    // =========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .info-card, .stat-card, .competency-card, .career-card, .timeline-item, .pimpinan-card, .dokumen-card');

    function handleScrollReveal() {
        revealElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.88) {
                // Stagger animation based on sibling index
                const siblings = el.parentElement ? el.parentElement.children : [];
                let siblingIndex = 0;
                for (let i = 0; i < siblings.length; i++) {
                    if (siblings[i] === el) {
                        siblingIndex = i;
                        break;
                    }
                }
                setTimeout(() => {
                    el.classList.add('active');
                    el.classList.add('animate-in');
                }, siblingIndex * 100);
            }
        });
    }

    window.addEventListener('scroll', handleScrollReveal);
    // Initial check
    setTimeout(handleScrollReveal, 300);

    // =========================================
    // Video Play/Pause (Multiple Videos Support)
    // =========================================
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    videoWrappers.forEach(wrapper => {
        const videoOverlay = wrapper.querySelector('.video-play-overlay');
        const video = wrapper.querySelector('video');

        if (videoOverlay && video) {
            videoOverlay.addEventListener('click', () => {
                videoOverlay.classList.add('hidden');
                video.play();
                video.setAttribute('controls', 'true');
            });

            video.addEventListener('pause', () => {
                if (video.currentTime > 0 && !video.ended) {
                    videoOverlay.classList.remove('hidden');
                }
            });

            video.addEventListener('ended', () => {
                videoOverlay.classList.remove('hidden');
                video.removeAttribute('controls');
            });
        }
    });

    // =========================================
    // Active nav link highlighting
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');

    function highlightNav() {
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // =========================================
    // Tilt effect on cards (desktop only)
    // =========================================
    if (window.innerWidth > 768) {
        document.querySelectorAll('.stat-card, .competency-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // =========================================
    // Typing effect for hero subtitle
    // =========================================
    const typingElement = document.querySelector('.hero-typing');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        typingElement.textContent = '';
        let charIndex = 0;

        function typeChar() {
            if (charIndex < text.length) {
                typingElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 40);
            }
        }

        // Start typing after hero animations
        setTimeout(typeChar, 1500);
    }
});
