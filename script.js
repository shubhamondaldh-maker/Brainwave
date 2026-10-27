/**
 * BRAINWAVE TUTORIALS - INTERACTIVE BEHAVIORS & VALIDATION
 * "Understand it once. Score for life."
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initSmoothScrollAndSpy();
  initAnimatedCounters();
  initFaqAccordion();
  initCourseSelectButtons();
  initEnquiryFormValidation();
  initWhatsAppTooltip();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & SCROLL BEHAVIOR
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('navbar');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const toggleMenu = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close mobile menu when any nav link is tapped
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Close when tapping outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   3. ACTIVE NAV LINK SCROLLSPY (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initSmoothScrollAndSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   4. ANIMATED COUNTERS (JS INTERACTION)
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const statsContainer = document.getElementById('statsContainer');
  const counters = document.querySelectorAll('.counter');
  if (!statsContainer || !counters.length) return;

  let hasAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1600; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);

      el.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => animateCounter(counter));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(statsContainer);
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const btn = otherItem.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // If it wasn't active, activate it
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. COURSE CARD QUICK-SELECT BUTTONS
   -------------------------------------------------------------------------- */
function initCourseSelectButtons() {
  const selectBtns = document.querySelectorAll('.select-course-btn');
  const courseDropdown = document.getElementById('studentCourse');
  const nameInput = document.getElementById('studentName');

  if (!selectBtns.length || !courseDropdown) return;

  selectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetCourse = btn.getAttribute('data-target-course');
      if (targetCourse) {
        // Find matching option in dropdown
        for (let i = 0; i < courseDropdown.options.length; i++) {
          if (courseDropdown.options[i].value === targetCourse) {
            courseDropdown.selectedIndex = i;
            break;
          }
        }
      }

      // Smooth scroll to enquiry form
      const enquirySection = document.getElementById('enquiry');
      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (nameInput) nameInput.focus();
        }, 600);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. ENQUIRY FORM CLIENT-SIDE VALIDATION & MODAL FEEDBACK
   -------------------------------------------------------------------------- */
function initEnquiryFormValidation() {
  const form = document.getElementById('enquiryForm');
  const nameInput = document.getElementById('studentName');
  const phoneInput = document.getElementById('studentPhone');
  const classSelect = document.getElementById('studentClass');
  const courseSelect = document.getElementById('studentCourse');
  const remarksInput = document.getElementById('studentRemarks');

  // Modal elements
  const modal = document.getElementById('successModal');
  const modalName = document.getElementById('modalApplicantName');
  const modalClass = document.getElementById('modalApplicantClass');
  const modalPhone = document.getElementById('modalApplicantPhone');
  const modalCourse = document.getElementById('modalApplicantCourse');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppDirect');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!form || !nameInput || !phoneInput || !classSelect) return;

  // Validation regex:
  // Name: At least 3 chars, letters, spaces and dots allowed
  const nameRegex = /^[a-zA-Z\s.]{3,50}$/;
  // Phone: Indian 10 digits starting with 6, 7, 8, 9
  const phoneRegex = /^[6-9]\d{9}$/;

  const validateField = (input, condition) => {
    if (condition) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      return true;
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      return false;
    }
  };

  // Real-time validation clearers
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 3) {
      validateField(nameInput, nameRegex.test(nameInput.value.trim()));
    } else {
      nameInput.classList.remove('is-valid');
    }
  });

  // Phone input: auto filter non-digits
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    if (phoneInput.value.length === 10) {
      validateField(phoneInput, phoneRegex.test(phoneInput.value));
    } else {
      phoneInput.classList.remove('is-valid');
    }
  });

  classSelect.addEventListener('change', () => {
    validateField(classSelect, classSelect.value !== '');
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameRegex.test(nameInput.value.trim()));
    const isPhoneValid = validateField(phoneInput, phoneRegex.test(phoneInput.value.trim()));
    const isClassValid = validateField(classSelect, classSelect.value !== '');

    if (!isNameValid || !isPhoneValid || !isClassValid) {
      // Focus on first invalid field
      if (!isNameValid) nameInput.focus();
      else if (!isPhoneValid) phoneInput.focus();
      else if (!isClassValid) classSelect.focus();
      return;
    }

    // Success payload
    const applicantName = nameInput.value.trim();
    const applicantPhone = phoneInput.value.trim();
    const applicantClass = classSelect.value;
    const applicantCourse = courseSelect ? courseSelect.value : 'General Enquiry';
    const applicantRemarks = remarksInput ? remarksInput.value.trim() : '';

    // Populate Modal
    if (modalName) modalName.textContent = applicantName;
    if (modalClass) modalClass.textContent = applicantClass;
    if (modalPhone) modalPhone.textContent = `+91 ${applicantPhone}`;
    if (modalCourse) modalCourse.textContent = applicantCourse;

    // Generate prefilled WhatsApp URL for the user's convenience
    if (modalWhatsAppBtn) {
      let waMessage = `Hello Anirban Sir, I submitted an admission enquiry on the Brainwave Tutorials website:%0A%0A` +
        `👤 *Name:* ${encodeURIComponent(applicantName)}%0A` +
        `📱 *Phone:* +91 ${applicantPhone}%0A` +
        `🎓 *Class:* ${encodeURIComponent(applicantClass)}%0A` +
        `📚 *Course:* ${encodeURIComponent(applicantCourse)}`;

      if (applicantRemarks) {
        waMessage += `%0A📝 *Note:* ${encodeURIComponent(applicantRemarks)}`;
      }

      modalWhatsAppBtn.href = `https://wa.me/919000000000?text=${waMessage}`;
    }

    // Show Modal
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Reset Form
    form.reset();
    [nameInput, phoneInput, classSelect].forEach(el => {
      el.classList.remove('is-valid', 'is-invalid');
    });
  });

  // Close Modal handlers
  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. WHATSAPP FLOATING TOOLTIP
   -------------------------------------------------------------------------- */
function initWhatsAppTooltip() {
  const tooltip = document.getElementById('whatsappTooltip');
  const closeBtn = document.getElementById('closeTooltip');

  if (!tooltip || !closeBtn) return;

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    tooltip.style.display = 'none';
  });
}
