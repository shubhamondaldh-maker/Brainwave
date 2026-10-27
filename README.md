# Brainwave Tutorials Landing Page

> *"Understand it once. Score for life."*

A modern, responsive, high-converting landing page built for **Brainwave Tutorials**, a premier Physics and Mathematics coaching centre in Salt Lake, Kolkata, mentored by **Anirban Dutta** (M.Sc. Physics, 14 years teaching experience).

---

## 🚀 Live Demo & Quick Start

### 1. View Locally
Simply double-click [`index.html`](index.html) in any web browser, or run a local web server:

```bash
# Using Python
python -m http.server 3000

# Or using Node
npx serve .
```
Then open `http://localhost:3000`.

### 2. Instant Deploy to Netlify / GitHub Pages
- **Netlify**: Drag and drop the generated [`brainwave-tutorials-landing-page.zip`](brainwave-tutorials-landing-page.zip) or the project folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **GitHub Pages**: Push this initialized Git repository to your GitHub account and turn on GitHub Pages under **Settings > Pages > Deploy from branch (main/master)**.

---

## ✨ Features & Must-Haves Checklist

| Requirement | Implementation | Status |
| :--- | :--- | :---: |
| **1. Hero Section** | Bold headline with tagline, value propositions (12-student batch limit, 14 yrs experience), CTA buttons ("Book a Free Demo Class", "View Batch Schedules"), and Kolkata classroom visual. | ✅ Complete |
| **2. Core Sections** | **About Teacher** (credentials, portrait, 4 core pillars), **Courses** (Class 9-10, Class 11-12, JEE Main Maths), **Results** (120+ taught, 38 scored 90%+ in boards), **Testimonials** (Mrs. Sen & Riya), **Contact** (Salt Lake address, phone, email, visiting hours). | ✅ Complete |
| **3. Sticky Navbar** | Glassmorphic sticky header with backdrop blur, brand logo, mobile hamburger drawer, and smooth-scrolling scrollspy that highlights active links. | ✅ Complete |
| **4. Responsive Design** | Mobile-first CSS with media queries tested across phone screens (320px–480px), tablets, and desktops. | ✅ Complete |
| **5. Enquiry Form with JS Validation** | Client-side validation for student name (3+ chars), phone number (10-digit Indian mobile `[6-9]\d{9}`), and class selection with interactive confirmation modal and instant WhatsApp link generator. | ✅ Complete |
| **6. Floating WhatsApp Button** | Fixed floating action button with pulsing animation and one-tap direct chat to `+91 90000 00000` with pre-filled inquiry text. | ✅ Complete |
| **7. Interactive JS Features** | Smooth numerical counter animations via `IntersectionObserver`, interactive FAQ accordion, course quick-select integration that pre-fills the form. | ✅ Complete |

---

## 📂 Project Architecture

```
brainwave/
├── index.html                           # Semantic HTML5 landing page
├── styles.css                           # Modular vanilla CSS design system
├── script.js                            # Interactive logic (validation, counters, accordion, modal)
├── images/
│   ├── anirban_dutta.jpg                # Portrait of Anirban Sir in Kolkata classroom
│   └── classroom.jpg                    # Small-batch classroom session visual
├── brainwave-tutorials-landing-page.zip # Ready-to-deploy zip bundle
└── README.md                            # Documentation and deployment instructions
```

---

## 🛠 Tech Stack
- **HTML5**: Semantic markup, meta tags for SEO and WhatsApp OpenGraph preview.
- **Vanilla CSS3**: CSS Custom Properties (variables), Flexbox, CSS Grid, glassmorphism, responsive breakpoints. No bulky frameworks.
- **Vanilla JavaScript (ES6+)**: `IntersectionObserver` for performant scroll-triggered counters and active nav tracking, DOM manipulation, form regex validation.
