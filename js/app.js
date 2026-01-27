// ------------------------------------------------
// Project Name: Braxton - Personal Portfolio & Resume HTML Template
// Project Description: Show yourself brightly with Braxton - unique and creative portfolio and resume template!
// Tags: mix_design, resume, portfolio, personal page, cv, template, one page, responsive, html5, css3, creative, clean
// Version: 1.0.0
// Build Date: March 2024
// Last Update: March 2024
// This product is available exclusively on Themeforest
// Author: mix_design
// Author URI: https://themeforest.net/user/mix_design
// File name: app.js
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  01. Loader & Loading Animation
//  02. Bootstrap Scroll Spy Plugin Settings
//  03. Lenis Scroll Plugin
//  04. Parallax
//  05. Scroll Animations
//  06. Smooth Scrolling
//  07. Swiper Slider
//  08. Contact Form
//  09. Modernizr SVG Fallback
//  10. Chrome Smooth Scroll
//  11. Images Moving Ban
//  12. Detecting Mobile/Desktop
//  13. PhotoSwipe Gallery Images Replace
//  14. Color Switch
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  // --------------------------------------------- //
  // Loader & Loading Animation Start
  // --------------------------------------------- //
  const content = document.querySelector("body");
  const imgLoad = imagesLoaded(content);

  imgLoad.on("done", (instance) => {
    document.getElementById("loaderContent").classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("loader").classList.add("loaded");
    }, 300);

    gsap.set(".animate-headline", { y: 50, opacity: 0 });
    ScrollTrigger.batch(".animate-headline", {
      interval: 0.1,
      batchMax: 4,
      duration: 6,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          ease: "sine",
          stagger: { each: 0.15, grid: [1, 4] },
          overwrite: true,
        }),
      onLeave: (batch) =>
        gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
      onEnterBack: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
      onLeaveBack: (batch) =>
        gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
    });
  });
  // --------------------------------------------- //
  // Loader & Loading Animation End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Bootstrap Scroll Spy Plugin Settings Start
  // --------------------------------------------- //
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: "#menu",
    smoothScroll: true,
    rootMargin: "0px 0px -40%",
  });
  // --------------------------------------------- //
  // Bootstrap Scroll Spy Plugin Settings End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Lenis Scroll Plugin Start
  // --------------------------------------------- //
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  // --------------------------------------------- //
  // Lenis Scroll Plugin End
  // --------------------------------------------- //

  // ------------------------------------------------------------------------------ //
  // Parallax (apply parallax effect to any element with a data-speed attribute) Start
  // ------------------------------------------------------------------------------ //
  gsap.to("[data-speed]", {
    y: (i, el) =>
      (1 - parseFloat(el.getAttribute("data-speed"))) *
      ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0,
    },
  });
  // --------------------------------------------- //
  // Parallax End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Scroll Animations Start
  // --------------------------------------------- //
  // Animation In Up
  const animateInUp = document.querySelectorAll(".animate-in-up");
  animateInUp.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
        ease: "sine",
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // Animation Rotation
  const animateRotation = document.querySelectorAll(".animate-rotation");
  animateRotation.forEach((section) => {
    var value = $(section).data("value");
    gsap.fromTo(
      section,
      {
        ease: "sine",
        rotate: 0,
      },
      {
        rotate: value,
        scrollTrigger: {
          trigger: section,
          scrub: true,
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // Animation Cards Stack
  // Grid 2x
  gsap.set(".animate-card-2", { y: 100, opacity: 0 });
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 2] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) =>
      gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
  });

  // Grid 3x
  gsap.set(".animate-card-3", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-3", {
    interval: 0.1,
    batchMax: 3,
    duration: 3,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 3] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) =>
      gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
  });

  // Grid 5x
  gsap.set(".animate-card-5", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-5", {
    interval: 0.1,
    batchMax: 5,
    delay: 1000,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 5] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) =>
      gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
  });

  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-2", { y: 0, opacity: 1 }),
  );
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-3", { y: 0, opacity: 1 }),
  );
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-5", { y: 0, opacity: 1 }),
  );
  // --------------------------------------------- //
  // Scroll Animations End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scrolling Start
  // --------------------------------------------- //
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr("tabindex", "-1");
                $target.focus();
              }
            },
          );
        }
      }
    });
  // --------------------------------------------- //
  // Smooth Scrolling End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Swiper Slider Start
  // --------------------------------------------- //
  const toolsSlider = document.querySelector("tools-slider");
  const testimonialsSlider = document.querySelector("testimonials-slider");

  if (!toolsSlider) {
    const swiper = new Swiper(".swiper-tools", {
      spaceBetween: 20,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      loop: true,
      grabCursor: true,
      loopFillGroupWithBlank: true,
      breakpoints: {
        1600: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        },
        576: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 2,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  if (!testimonialsSlider) {
    const swiper = new Swiper(".swiper-testimonials", {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: true,
      speed: 1000,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  // --------------------------------------------- //
  // Swiper Slider Start
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Contact Form Start
  // --------------------------------------------- //
  // Replace with your actual keys
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyYW5ldHZsZ2h0cXZ1dWtybnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MzE0MDgsImV4cCI6MjA4NTAwNzQwOH0.jefNTR-3P2WaoR4-1FQiixoUOQdJUcRX27nqJy2cxyE";
  const RECAPTCHA_SITE_KEY = "6Lcfs1csAAAAALnh7gLTMQ_z1NxfVzfKtGMeTwIv"; // From Google reCAPTCHA console
  const FUNCTION_URL =
    "https://kranetvlghtqvuukrnpy.supabase.co/functions/v1/submit-contact-form";

  // TEST MODE - Function to preview success animation
  window.testSuccessAnimation = function() {
    const form = document.querySelector(".contact .form");
    const reply = document.querySelector(".contact .form__reply");
    
    if (!form || !reply) {
      console.error("Form elements not found");
      return;
    }
    
    // Trigger the success animation
    showSuccessAnimation(form, reply, () => {
      console.log("Test animation complete");
    });
  };

  // Developer-style success animation function
  function showSuccessAnimation(form, reply, onComplete) {
    const replyIcon = reply.querySelector(".reply__icon");
    const replyTitle = reply.querySelector(".reply__title");
    const replyText = reply.querySelector(".reply__text");
    const container = form.parentElement;

    // Measure form height before hiding
    const formHeight = form.offsetHeight;
    
    // Set container to exact form height to prevent shifting
    container.style.height = formHeight + "px";
    container.style.overflow = "hidden";

    // Create glitch clone elements
    const formClone1 = form.cloneNode(true);
    const formClone2 = form.cloneNode(true);
    formClone1.style.position = "absolute";
    formClone2.style.position = "absolute";
    formClone1.style.top = "0";
    formClone2.style.top = "0";
    formClone1.style.left = "0";
    formClone2.style.left = "0";
    formClone1.style.width = "100%";
    formClone2.style.width = "100%";
    formClone1.style.pointerEvents = "none";
    formClone2.style.pointerEvents = "none";
    formClone1.style.zIndex = "100";
    formClone2.style.zIndex = "99";
    formClone1.classList.add("glitch-clone");
    formClone2.classList.add("glitch-clone");
    
    container.appendChild(formClone1);
    container.appendChild(formClone2);

    // Master timeline
    const masterTl = gsap.timeline({
      onComplete: () => {
        // Auto-hide after 5 seconds
        setTimeout(() => {
          const reverseTl = gsap.timeline({
            onComplete: () => {
              reply.classList.remove("is-visible");
              form.classList.remove("is-hidden");
              
              // Reset for next time
              gsap.set([form, reply, replyIcon, replyTitle, replyText], {
                clearProps: "all",
              });
              
              if (onComplete) onComplete();
            },
          });

          // Reverse animation
          reverseTl
            .to(replyText, {
              opacity: 0,
              y: 20,
              duration: 0.3,
            })
            .to(replyTitle, {
              opacity: 0,
              scale: 0.5,
              duration: 0.3,
            }, "-=0.2")
            .to(replyIcon, {
              scale: 0,
              rotation: -180,
              duration: 0.4,
            }, "-=0.2")
            .to(reply, {
              opacity: 0,
              duration: 0.3,
            })
            .to(form, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              onComplete: () => {
                // Reset container styles
                container.style.height = "";
                container.style.overflow = "";
              }
            });
        }, 5000);
      },
    });

    // GLITCH OUT EFFECT - Form disappears with RGB split
    masterTl
      // Initial glitch flashes
      .to(formClone1, {
        opacity: 1,
        x: -5,
        filter: "hue-rotate(90deg)",
        duration: 0.05,
      })
      .to(formClone2, {
        opacity: 1,
        x: 5,
        filter: "hue-rotate(-90deg)",
        duration: 0.05,
      }, "<")
      .to([formClone1, formClone2], {
        opacity: 0,
        duration: 0.05,
      })
      // Second glitch
      .to(formClone1, {
        opacity: 0.8,
        x: 8,
        duration: 0.05,
      })
      .to(formClone2, {
        opacity: 0.8,
        x: -8,
        duration: 0.05,
      }, "<")
      .to([formClone1, formClone2], {
        opacity: 0,
        duration: 0.05,
      })
      // Final big glitch with form destruction
      .to(form, {
        opacity: 0.5,
        scaleY: 0.95,
        scaleX: 1.02,
        duration: 0.1,
      })
      .to(formClone1, {
        opacity: 1,
        x: -15,
        scaleX: 0.98,
        filter: "hue-rotate(180deg) brightness(1.5)",
        duration: 0.1,
      })
      .to(formClone2, {
        opacity: 1,
        x: 15,
        scaleX: 1.02,
        filter: "hue-rotate(-180deg) brightness(1.5)",
        duration: 0.1,
      }, "<")
      // Shatter effect
      .to([form, formClone1, formClone2], {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        duration: 0.2,
        onComplete: () => {
          formClone1.remove();
          formClone2.remove();
          form.classList.add("is-hidden");
        },
      })
      // Brief pause
      .to({}, { duration: 0.2 })
      // Show reply container
      .call(() => {
        reply.classList.add("is-visible");
      })
      // Digital scan reveal
      .fromTo(
        reply,
        {
          opacity: 0,
          clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
        },
        {
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.6,
          ease: "power2.inOut",
        }
      )
      // Icon explosion with particles effect
      .fromTo(
        replyIcon,
        {
          scale: 0,
          rotation: -360,
          opacity: 0,
          filter: "blur(20px) brightness(2)",
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.3"
      )
      // Icon glow pulse
      .to(
        replyIcon,
        {
          filter: "drop-shadow(0 0 20px currentColor) brightness(1.5)",
          scale: 1.15,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        },
        "-=0.3"
      )
      // Title with RGB glitch effect
      .fromTo(
        replyTitle,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        "-=0.4"
      )
      // RGB split glitch on title
      .to(replyTitle, {
        textShadow: "-3px 0 red, 3px 0 cyan",
        x: 2,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        onComplete: () => {
          gsap.set(replyTitle, { textShadow: "0 0 20px rgba(255,255,255,0.3)" });
        },
      })
      // Text reveal with typewriter effect
      .fromTo(
        replyText,
        {
          opacity: 0,
          y: 30,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // Final emphasis
      .to([replyIcon, replyTitle], {
        scale: 1.05,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
      });
  }

  async function submitContactForm(event) {
    event.preventDefault();

    // Get submit button and store original content
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const btnCaption = submitBtn.querySelector(".btn-caption");
    const btnIcon = submitBtn.querySelector("i");
    const originalCaption = btnCaption.textContent;
    const originalIconClass = btnIcon.className;

    // Get form data
    const formData = {
      name: document.getElementById("name").value.trim(),
      company: document.getElementById("company").value.trim() || undefined,
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim() || undefined,
      message: document.getElementById("message").value.trim(),
    };

    // Basic validation (same as before)
    if (!formData.name || !formData.email || !formData.message) {
      alert("Name, email, and message are required.");
      return;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email format.");
      return;
    }

    // Get the button container and disable animations
    const btnContainer = submitBtn.closest(".form__item");

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";
    submitBtn.style.cursor = "not-allowed";
    btnCaption.textContent = "Sending...";
    btnIcon.className = "ph-bold ph-circle-notch btn-loading-icon";
    btnIcon.style.display = "inline-block";

    // Lock the container position to prevent scroll animation interference
    if (btnContainer) {
      btnContainer.style.transform = "none";
      btnContainer.style.opacity = "1";
    }

    try {
      // Generate reCAPTCHA token
      const recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "submit",
      });

      // Add token to form data
      formData.recaptcha_token = recaptchaToken;

      // Make the request
      const response = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success - Show developer-style animation
        const form = document.querySelector(".contact .form");
        const reply = document.querySelector(".contact .form__reply");
        
        showSuccessAnimation(form, reply, () => {
          // Reset form after animation completes
          event.target.reset();
          
          // Re-enable button and restore original state
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.style.cursor = "pointer";
          btnCaption.textContent = originalCaption;
          btnIcon.className = originalIconClass;
          btnIcon.style.display = "";
        });
      } else {
        // Error - restore button state
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
        btnCaption.textContent = originalCaption;
        btnIcon.className = originalIconClass;
        btnIcon.style.display = "";
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      // Error - restore button state
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
      btnCaption.textContent = originalCaption;
      btnIcon.className = originalIconClass;
      btnIcon.style.display = "";
      console.error("Request failed:", error);
      alert("An error occurred. Please try again.");
    }
  }

  // Attach to form
  document
    .getElementById("contact-form")
    .addEventListener("submit", submitContactForm);
  // --------------------------------------------- //
  // Contact Form End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Modernizr SVG Fallback Start
  // --------------------------------------------- //
  if (!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function () {
      return $(this).attr("src").replace(".svg", ".png");
    });
  }
  // --------------------------------------------- //
  // Modernizr SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {}
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function (event) {
    event.preventDefault();
  });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Detecting Mobile/Desktop Start
  // --------------------------------------------- //
  var isMobile = false;
  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    $("html").addClass("touch");
    isMobile = true;
  } else {
    $("html").addClass("no-touch");
    isMobile = false;
  }
  //IE, Edge
  var isIE =
    /MSIE 9/i.test(navigator.userAgent) ||
    /rv:11.0/i.test(navigator.userAgent) ||
    /MSIE 10/i.test(navigator.userAgent) ||
    /Edge\/\d+/.test(navigator.userAgent);
  // --------------------------------------------- //
  // Detecting Mobile/Desktop End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace Start
  // --------------------------------------------- //
  $(".gallery__link").each(function () {
    $(this)
      .append('<div class="picture"></div>')
      .children(".picture")
      .css({ "background-image": "url(" + $(this).attr("data-image") + ")" });
  });
  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace End
  // --------------------------------------------- //
});

// --------------------------------------------- //
// Color Switch Start
// --------------------------------------------- //
const themeBtn = document.querySelector(".color-switcher");

function getCurrentTheme() {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  localStorage.getItem("template.theme")
    ? (theme = localStorage.getItem("template.theme"))
    : null;
  return theme;
}

function loadTheme(theme) {
  const root = document.querySelector(":root");
  if (theme === "light") {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-moon-stars"></i>`;
  } else {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-sun"></i>`;
  }
  root.setAttribute("color-scheme", `${theme}`);
}

themeBtn.addEventListener("click", () => {
  let theme = getCurrentTheme();
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  localStorage.setItem("template.theme", `${theme}`);
  loadTheme(theme);
});

window.addEventListener("DOMContentLoaded", () => {
  loadTheme(getCurrentTheme());
});
// --------------------------------------------- //
// Color Switch End
// --------------------------------------------- //
