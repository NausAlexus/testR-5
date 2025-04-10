
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('.header');
    let mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // Clone the navigation and download button for mobile menu
    const navList = document.querySelector('.main-nav .nav-list').cloneNode(true);
    const downloadBtn = document.querySelector('.download-btn-wrapper').cloneNode(true);
    
    mobileNav.appendChild(navList);
    mobileNav.appendChild(downloadBtn);
    document.body.appendChild(mobileNav);
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        header.classList.toggle('mobile-menu-active');
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            header.classList.remove('mobile-menu-active');
        });
    });

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');
        const prevButton = document.querySelector('.testimonial-prev');
        const nextButton = document.querySelector('.testimonial-next');
        
        if (testimonialCards.length > 0) {
            let currentIndex = 0;
            const cardWidth = testimonialCards[0].offsetWidth + parseInt(window.getComputedStyle(testimonialCards[0]).marginRight);
            
            function updateSliderPosition() {
                testimonialSlider.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
            }
            
            if (prevButton && nextButton) {
                prevButton.addEventListener('click', function() {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateSliderPosition();
                    }
                });
                
                nextButton.addEventListener('click', function() {
                    if (currentIndex < testimonialCards.length - 1) {
                        currentIndex++;
                        updateSliderPosition();
                    }
                });
            }
        }
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            item.classList.toggle('active');
            
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // FAQ Category Filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    if (categoryButtons.length > 0 && faqCategories.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Reset active class on all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show all categories if 'all' is selected
                if (category === 'all') {
                    faqCategories.forEach(cat => cat.style.display = 'block');
                } else {
                    // Show only selected category
                    faqCategories.forEach(cat => {
                        if (cat.id === category) {
                            cat.style.display = 'block';
                        } else {
                            cat.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // FAQ Search Functionality
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const allFaqItems = document.querySelectorAll('.faq-item');
            
            allFaqItems.forEach(item => {
                const questionText = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    item.style.display = 'block';
                    
                    // Make sure the category is visible
                    const parentCategory = item.closest('.faq-category');
                    if (parentCategory) {
                        parentCategory.style.display = 'block';
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show "No results found" message if all items in a category are hidden
            faqCategories.forEach(category => {
                const visibleItems = category.querySelectorAll('.faq-item[style="display: block;"]');
                if (visibleItems.length === 0) {
                    category.style.display = 'none';
                }
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formElements = contactForm.elements;
            
            // Basic validation
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value.trim()) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // Show success message (in a real site, this would submit the form data)
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Scroll to download section when download buttons are clicked
    const downloadButtons = document.querySelectorAll('a[href="#download"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const downloadSection = document.getElementById('download');
            if (downloadSection) {
                window.scrollTo({
                    top: downloadSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video play buttons
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real implementation, this would play the video
            alert('Video would play here in the actual implementation.');
        });
    });

    // Sticky TOC for legal pages
    const toc = document.querySelector('.legal-toc');
    if (toc) {
        window.addEventListener('scroll', function() {
            if (window.innerWidth > 992) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const scrollPosition = window.scrollY;
                
                if (scrollPosition > 100) {
                    toc.style.top = `${headerHeight + 20}px`;
                } else {
                    toc.style.top = '100px';
                }
            }
        });
    }

    // Smooth scrolling for TOC links
    const tocLinks = document.querySelectorAll('.toc-list a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current page nav link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});
