// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll with offset for fixed navbar
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Reviews Carousel
let currentReviewIndex = 0;
const reviewCards = document.querySelectorAll('.review-card');
const reviewDots = document.querySelectorAll('.reviews-section .dot');
const reviewPrevBtn = document.querySelector('.reviews-carousel .prev');
const reviewNextBtn = document.querySelector('.reviews-carousel .next');

function showReview(index) {
    reviewCards.forEach(card => card.classList.remove('active'));
    reviewDots.forEach(dot => dot.classList.remove('active'));
    
    reviewCards[index].classList.add('active');
    reviewDots[index].classList.add('active');
}

function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % reviewCards.length;
    showReview(currentReviewIndex);
}

function prevReview() {
    currentReviewIndex = (currentReviewIndex - 1 + reviewCards.length) % reviewCards.length;
    showReview(currentReviewIndex);
}

reviewNextBtn.addEventListener('click', nextReview);
reviewPrevBtn.addEventListener('click', prevReview);

reviewDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentReviewIndex = index;
        showReview(currentReviewIndex);
    });
});

// // Auto-rotate reviews
// setInterval(nextReview, 5000);

// // Gallery Carousel
// let currentGalleryIndex = 0;
// const gallerySlides = document.querySelectorAll('.gallery-slide');
// const galleryDots = document.querySelectorAll('.gallery-section .dot');
// const galleryPrevBtn = document.querySelector('.gallery-carousel .prev');
// const galleryNextBtn = document.querySelector('.gallery-carousel .next');

// function showGallerySlide(index) {
//     gallerySlides.forEach(slide => slide.classList.remove('active'));
//     galleryDots.forEach(dot => dot.classList.remove('active'));
    
//     gallerySlides[index].classList.add('active');
//     galleryDots[index].classList.add('active');
// }

// function nextGallerySlide() {
//     currentGalleryIndex = (currentGalleryIndex + 1) % gallerySlides.length;
//     showGallerySlide(currentGalleryIndex);
// }

// function prevGallerySlide() {
//     currentGalleryIndex = (currentGalleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
//     showGallerySlide(currentGalleryIndex);
// }

// galleryNextBtn.addEventListener('click', nextGallerySlide);
// galleryPrevBtn.addEventListener('click', prevGallerySlide);

// galleryDots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//         currentGalleryIndex = index;
//         showGallerySlide(currentGalleryIndex);
//     });
// });

// // Auto-rotate gallery
// setInterval(nextGallerySlide, 4000);


setInterval(nextReview, 5000);

// Gallery - 3 per view sliding carousel
const galleryTrack = document.querySelector('.gallery-track');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryPrevBtn = document.querySelector('.gallery-nav.prev');
const galleryNextBtn = document.querySelector('.gallery-nav.next');
let galleryPage = 0;

function getVisibleCount() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 968) return 2;
    return 3;
}

function getMaxPage() {
    return Math.max(0, galleryItems.length - getVisibleCount());
}

function updateGallery() {
    const visibleCount = getVisibleCount();
    const wrapper = document.querySelector('.gallery-track-wrapper');
    const wrapperWidth = wrapper.offsetWidth;
    const gap = 24;
    const itemWidth = (wrapperWidth - gap * (visibleCount - 1)) / visibleCount;
    
    // Set item widths explicitly
    galleryItems.forEach(item => {
        item.style.minWidth = itemWidth + 'px';
        item.style.maxWidth = itemWidth + 'px';
        item.style.flex = '0 0 ' + itemWidth + 'px';
    });
    
    const offset = galleryPage * (itemWidth + gap);
    galleryTrack.style.transform = `translateX(-${offset}px)`;
}

if (galleryNextBtn) {
    galleryNextBtn.addEventListener('click', () => {
        if (galleryPage < getMaxPage()) {
            galleryPage++;
        } else {
            galleryPage = 0;
        }
        updateGallery();
    });
}

if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener('click', () => {
        if (galleryPage > 0) {
            galleryPage--;
        } else {
            galleryPage = getMaxPage();
        }
        updateGallery();
    });
}

window.addEventListener('resize', () => {
    galleryPage = Math.min(galleryPage, getMaxPage());
    updateGallery();
});

// Run after full page load to get correct dimensions
window.addEventListener('load', () => {
    updateGallery();
});

// Also run immediately as fallback
setTimeout(updateGallery, 100);
setTimeout(updateGallery, 500);

// Auto-slide gallery
setInterval(() => {
    if (galleryPage < getMaxPage()) {
        galleryPage++;
    } else {
        galleryPage = 0;
    }
    updateGallery();
}, 4000);

// Form Submission
const enquiryForm = document.querySelector('.enquiry-form');

enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Since this is a static site, we'll just show an alert
    alert(`Thank you, ${name}! Your enquiry has been received. We will contact you at ${email} soon.`);
    
    // Reset form
    enquiryForm.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumb");

thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
        // Swap images
        let temp = mainImage.src;
        mainImage.src = thumb.src;
        thumb.src = temp;
    });
});

