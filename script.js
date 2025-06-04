document.addEventListener('DOMContentLoaded', function() {
    // Nomor WhatsApp Anda (ganti dengan nomor Anda, format internasional tanpa + atau 00)
    const WHATSAPP_NUMBER = "6281234567890"; // Contoh: 6281234567890 untuk Indonesia

    // Responsive Navbar
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Ganti ikon hamburger menjadi X dan sebaliknya
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Tutup menu saat link di klik (untuk navigasi SPA)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Modal Email
    const emailModal = document.getElementById('emailModal');
    const emailButton = document.getElementById('emailButton');
    const closeButton = document.querySelector('.modal .close-button');

    if (emailButton && emailModal && closeButton) {
        emailButton.addEventListener('click', () => {
            emailModal.style.display = 'block';
        });

        closeButton.addEventListener('click', () => {
            emailModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == emailModal) {
                emailModal.style.display = 'none';
            }
        });
    }

    // Formspree Handling (opsional, untuk UX lebih baik)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);
            
            formStatus.textContent = 'Mengirim...';
            formStatus.style.color = 'var(--secondary-color)';

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Pesan berhasil terkirim! Kami akan segera menghubungi Anda.';
                    formStatus.style.color = 'green';
                    contactForm.reset();
                    setTimeout(() => {
                        if(emailModal) emailModal.style.display = 'none';
                        formStatus.textContent = ''; 
                    }, 4000);
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.textContent = 'Oops! Ada masalah saat mengirim pesan.';
                        }
                        formStatus.style.color = 'red';
                    })
                }
            } catch (error) {
                formStatus.textContent = 'Oops! Ada masalah saat mengirim pesan.';
                formStatus.style.color = 'red';
            }
        });
    }

    // Tombol WhatsApp
    const whatsappButton = document.getElementById('whatsappButton');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', () => {
            const message = encodeURIComponent("Halo, saya tertarik dengan jasa pembuatan website Anda. Bisakah kita diskusikan lebih lanjut?");
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
        });
    }

    // Update tahun di footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: unobserve setelah animasi pertama agar tidak berulang
                    // observer.unobserve(entry.target); 
                } else {
                    // Optional: remove class jika ingin animasi berulang saat scroll keluar-masuk viewport
                    // entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.1 }); // Trigger saat 10% elemen terlihat

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback untuk browser lama: langsung tampilkan elemen
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

});