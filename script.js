document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Sticky Navbar ---
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-opacity-95', 'shadow-lg', 'py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('bg-opacity-95', 'shadow-lg', 'py-2');
            navbar.classList.add('py-4');
        }
    });

    // --- Cart Functionality ---
    let cartCount = parseInt(localStorage.getItem('hw_cart_count')) || 0;
    updateCartUI();

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            localStorage.setItem('hw_cart_count', cartCount);
            updateCartUI();
            
            // Animation feedback
            const originalText = this.innerText;
            this.innerText = 'Added!';
            this.classList.add('bg-green-600', 'text-white');
            setTimeout(() => {
                this.innerText = originalText;
                this.classList.remove('bg-green-600', 'text-white');
            }, 1500);
        });
    });

    function updateCartUI() {
        const counter = document.getElementById('cart-count');
        const mobileCounter = document.getElementById('mobile-cart-count');
        if (counter) counter.innerText = cartCount;
        if (mobileCounter) mobileCounter.innerText = cartCount;
    }

    // --- Product Filtering (Off-Road Page) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterButtons.forEach(b => b.classList.remove('bg-orange-600', 'text-white'));
                filterButtons.forEach(b => b.classList.add('bg-gray-800', 'text-gray-300'));
                
                // Add active class to clicked
                btn.classList.remove('bg-gray-800', 'text-gray-300');
                btn.classList.add('bg-orange-600', 'text-white');

                const filterValue = btn.getAttribute('data-filter');

                productItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.classList.add('animate-fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('animate-fade-in');
                    }
                });
            });
        });
    }

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                // Success
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-20 right-5 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl animate-fade-in z-50';
                successMsg.innerText = 'Message sent successfully! Vroom vroom!';
                document.body.appendChild(successMsg);
                
                contactForm.reset();

                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('animate-fade-in');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
});
