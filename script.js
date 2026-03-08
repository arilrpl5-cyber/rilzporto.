/* ============================================
   SMOOTH SCROLL & ACTIVE NAV
   ============================================ */
(function() {
    'use strict';

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Intersection Observer for active nav link
    const observerOptions = {
        root: null,
        rootMargin: '-70px 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    /* ============================================
       SCROLL REVEAL ANIMATIONS
       ============================================ */
    const animateElements = document.querySelectorAll('.animate-left, .animate-right, .animate-up, .animate-stagger');

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => animateObserver.observe(el));

    /* ============================================
       TYPING EFFECT
       ============================================ */
    const typingElement = document.getElementById('typingText');
    const jobs = [
        'Programmer / Software Developer',
        'Web Developer',
        'Mobile App Developer',
        'Game Developer',
        'Database Administrator',
    ];
    let jobIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentJob = jobs[jobIndex];

        if (isDeleting) {
            typingElement.textContent = currentJob.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentJob.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentJob.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            jobIndex = (jobIndex + 1) % jobs.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();

    /* ============================================
       PROGRAMMING PILLS TOGGLE
       ============================================ */
    const pills = document.querySelectorAll('.pill');

    pills.forEach(pill => {
        pill.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    /* ============================================
       TAB SWITCHING
       ============================================ */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    /* ============================================
       PROJECT DETAIL MODAL
       ============================================ */
    const modal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const btnBack = document.getElementById('btnBack');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    const projectData = {
        1: {
            title: 'E-Commerce Website',
            image: 'ecom.png',
            description: 'A full-featured e-commerce platform built with modern web technologies. Includes shopping cart, payment gateway integration, user authentication, product catalog with filtering and search, order management system, and responsive design for mobile and desktop. Technologies used: HTML5, CSS3, JavaScript, and various APIs for payment processing.'
        },
        2: {
            title: 'University Project',
            image: 'univ.png',
            description: 'This project was created as part of my academic coursework to demonstrate practical skills in software development'
        },
        3: {
            title: 'Dashboard Admin',
            image: '8.png',
            description: 'A web-based dashboard that visualizes GitHub account statistics such as repositories, commit activity, and contribution data in a clean and responsive interface.'
        }
    };

    const detailButtons = document.querySelectorAll('.btn-detail');

    detailButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                modalImage.src = project.image;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modal.classList.add('active');
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    btnBack.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    /* ============================================
       CERTIFICATE LIGHTBOX
       ============================================ */
    const lightbox = document.getElementById('lightbox');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImage = document.getElementById('lightboxImage');
    const certificateItems = document.querySelectorAll('.certificate-item');

    certificateItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                lightboxImage.src = img.src;
                lightbox.classList.add('active');
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeLightbox();
        }
    });

    /* ============================================
       CONTACT FORM
       ============================================ */
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        const mailtoLink = `mailto:jogi@example.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;

        window.location.href = mailtoLink;

        const contactData = { name, email, message, timestamp: new Date().toISOString() };
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts.push(contactData);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        this.reset();
        alert('Terima kasih! Pesan Anda telah dikirim.');
    });

    /* ============================================
       RATING STARS
       ============================================ */
    const ratingStars = document.querySelectorAll('#ratingStars i');
    const ratingValue = document.getElementById('ratingValue');
    let selectedRating = 0;

    ratingStars.forEach((star, index) => {
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            ratingValue.value = selectedRating;

            ratingStars.forEach((s, i) => {
                if (i < selectedRating) {
                    s.classList.remove('fa-regular');
                    s.classList.add('fa-solid', 'active');
                } else {
                    s.classList.remove('fa-solid', 'active');
                    s.classList.add('fa-regular');
                }
            });
        });

        star.addEventListener('mouseenter', function() {
            ratingStars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    document.getElementById('ratingStars').addEventListener('mouseleave', function() {
        ratingStars.forEach((s, i) => {
            if (i < selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });

    /* ============================================
       COMMENT SYSTEM
       ============================================ */
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        renderComments(comments);
    }

    function renderComments(comments) {
        commentsList.innerHTML = '';

        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Belum ada komentar.</p>';
            return;
        }

        comments.forEach((comment, index) => {
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';

            const stars = '★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating);

            commentItem.innerHTML = `
                <div class="comment-header">
                    <span class="comment-name">${escapeHtml(comment.name)}</span>
                    <span class="comment-rating">${stars}</span>
                </div>
                <p class="comment-text">${escapeHtml(comment.message)}</p>
                <button class="btn-delete" data-index="${index}">Hapus</button>
            `;

            commentsList.appendChild(commentItem);
        });

        const deleteButtons = commentsList.querySelectorAll('.btn-delete');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                deleteComment(index);
            });
        });
    }

    function deleteComment(index) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments(comments);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const rating = parseInt(formData.get('rating'));
        const message = formData.get('message');

        if (rating === 0) {
            alert('Silakan pilih rating bintang.');
            return;
        }

        const comment = {
            name,
            rating,
            message,
            timestamp: new Date().toISOString()
        };

        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.unshift(comment);
        localStorage.setItem('comments', JSON.stringify(comments));

        renderComments(comments);

        this.reset();
        selectedRating = 0;
        ratingValue.value = 0;
        ratingStars.forEach(s => {
            s.classList.remove('fa-solid', 'active');
            s.classList.add('fa-regular');
        });
    });

    loadComments();

    /* ============================================
       FALLBACK FOR MISSING IMAGES
       ============================================ */
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, rgba(0,245,194,0.1), rgba(0,245,194,0.3))';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Image placeholder';
        });
    });

})();
