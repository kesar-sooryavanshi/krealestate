document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    const toggleMenu = () => {
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    };

    mobileBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // Fade-in Animation on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Mortgage Calculator
    const calcInputs = ['propPrice', 'downPayment', 'intRate', 'tenure'];
    const emiDisplay = document.getElementById('emiDisplay');

    const calculateEMI = () => {
        const p = parseFloat(document.getElementById('propPrice').value);
        const down = parseFloat(document.getElementById('downPayment').value);
        const r = parseFloat(document.getElementById('intRate').value) / 12 / 100;
        const n = parseFloat(document.getElementById('tenure').value) * 12;
        
        const principal = p - (p * (down / 100));
        
        if (principal > 0 && r > 0 && n > 0) {
            const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            emiDisplay.textContent = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(emi);
        } else {
            emiDisplay.textContent = '$0';
        }
    };

    calcInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculateEMI);
    });

    // Initial calculation
    calculateEMI();

    // Appointment Form
    const visitForm = document.getElementById('visitForm');
    visitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = visitForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Scheduling...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Your appointment has been successfully scheduled! Our representative will contact you shortly.');
            btn.textContent = originalText;
            btn.disabled = false;
            visitForm.reset();
        }, 1500);
    });

    // Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
