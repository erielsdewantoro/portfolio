// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const debounce = (func, wait = 20) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit = 100) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ==========================================
// MOBILE NAVIGATION MENU
// ==========================================

const initMobileMenu = () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (!hamburger || !navMenu) {
    console.warn("Mobile menu elements not found");
    return;
  }

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    hamburger.setAttribute(
      "aria-expanded",
      hamburger.classList.contains("active"),
    );

    document.body.style.overflow = hamburger.classList.contains("active")
      ? "hidden"
      : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !hamburger.contains(e.target) &&
      !navMenu.contains(e.target) &&
      navMenu.classList.contains("active")
    ) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
};

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const initScrollReveal = () => {
  const revealElements = document.querySelectorAll(
    ".section, .project, .edu-card, .cert-card, .experience-item",
  );

  if (revealElements.length === 0) {
    console.warn("No reveal elements found");
    return;
  }

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
};

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const initNavbarScrollEffect = () => {
  const nav = document.querySelector("nav");

  if (!nav) {
    console.warn("Navbar element not found");
    return;
  }

  const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
      nav.style.boxShadow = "0 0 25px #00f5ff";
      nav.style.background = "rgba(10, 10, 20, 0.95)";
    } else {
      nav.style.boxShadow = "none";
      nav.style.background = "rgba(10, 10, 20, 0.8)";
    }
  }, 100);

  window.addEventListener("scroll", handleScroll, { passive: true });
};

// ==========================================
// SMOOTH SCROLL
// ==========================================

const initSmoothScroll = () => {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        console.warn(`Target section ${targetId} not found`);
        return;
      }

      const navbarHeight = document.querySelector("nav").offsetHeight;
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
};

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

const initScrollToTop = () => {
  const scrollTopBtn = document.getElementById("scrollTop");

  if (!scrollTopBtn) {
    return;
  }

  const handleScroll = throttle(() => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }, 100);

  window.addEventListener("scroll", handleScroll, { passive: true });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// ==========================================
// ACTIVE NAV LINK HIGHLIGHT
// ==========================================

const initActiveNavLink = () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  if (sections.length === 0 || navLinks.length === 0) {
    return;
  }

  const handleScroll = throttle(() => {
    let current = "";
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, 100);

  window.addEventListener("scroll", handleScroll, { passive: true });
};

// ==========================================
// IMAGE ERROR HANDLING
// ==========================================

const initImageErrorHandling = () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.warn(`Failed to load image: ${this.src}`);
    });
  });
};

// ==========================================
// INITIALIZE ALL
// ==========================================

const init = () => {
  console.log(
    "%c✨ Portfolio Website Initialized",
    "color: #00f5ff; font-weight: bold; font-size: 16px",
  );
  console.log(
    "%c🚀 Performance Optimized - No Flickering!",
    "color: #00f5ff; font-size: 14px",
  );

  initMobileMenu();
  initScrollReveal();
  initNavbarScrollEffect();
  initSmoothScroll();
  initScrollToTop();
  initActiveNavLink();
  initImageErrorHandling();
};

// ==========================================
// EVENT LISTENERS
// ==========================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("Page hidden");
  } else {
    console.log("Page visible");
  }
});

window.addEventListener(
  "resize",
  debounce(() => {
    if (window.innerWidth > 768) {
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".nav-menu");

      if (hamburger && navMenu) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    }
  }, 250),
);
