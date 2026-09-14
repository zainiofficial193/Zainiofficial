document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined") {
    console.warn("GSAP library is not loaded.");
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
  // Fixes Tablet 769px - 1024px Range
  const scrollerEl = document.querySelector("[data-scroll-web_page]");
  const getScroller = () => {
    return window.innerWidth > 1024 && scrollerEl ? scrollerEl : window;
  };

  // --- 1. Hero / Banner Animations ---
  const heroTl = gsap.timeline({
    defaults: {
      overwrite: "auto",
      ease: "power3.out",
    },
  });

  heroTl;

  heroTl
    .from(".header", {
      y: -20,
      opacity: 0,
      duration: 0.45,
      stagger: 0.05,
      delay: 1.5,
    })
    .from(
      ".right-svg",
      {
        scale: 0.6,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=1",
    )
    .from(
      ".profile-main",
      {
        x: -100,
        scale: 1.25,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "<+=0.3",
    )

    .from(
      [
        ".hi-btn",
        ".main-txt",
        ".banner-container h2",
        ".dev-vector",
        ".dev-description",
        ".work-btn-container .bab-button",
      ],
      {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
      },
      "<+=0.1",
    );

  // --- 2. About Section Animations ---

  if (document.querySelector("#about")) {
    gsap.from(".about-left img", {
      scrollTrigger: {
        trigger: "#about",
        scroller: getScroller(),
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -90,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    gsap.from(".about-right > *", {
      scrollTrigger: {
        trigger: "#about",
        scroller: getScroller(),
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power2.out",
    });

    gsap.from(".expertse-box", {
      scrollTrigger: {
        trigger: ".about-grid-wrapper",
        scroller: getScroller(),
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      scale: 0.85,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.5)",
    });
  }

  // --- 3. Skills Section Animations ---
  if (document.querySelector("#skill")) {
    gsap.from(".skill-wrapper .inner-heading, .skill-wrapper > p", {
      scrollTrigger: {
        trigger: "#skill",
        scroller: getScroller(),
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.3,
    });

    gsap.from(".skills-container .skill", {
      scrollTrigger: {
        trigger: ".skills-container",
        scroller: getScroller(),
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      stagger: {
        each: 0.1,
        from: "start",
        grid: "auto",
      },
      duration: 0.5,
      ease: "power2.out",
      clearProps: "all",
    });
  }

  // --- 4. Featured Work Section Animations ---
  if (document.querySelector("#work")) {
    gsap.from(".work-section h2, .work-section > p", {
      scrollTrigger: {
        trigger: "#work",
        scroller: getScroller(),
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
    });

    gsap.from(".work-grid .work-item", {
      scrollTrigger: {
        trigger: ".work-grid",
        scroller: getScroller(),
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power2.out",
    });
  }

  // --- 5. Company / Spark Digitus Section ---
  if (document.querySelector("#company")) {
    gsap.from(".company-right > *", {
      scrollTrigger: {
        trigger: "#company",
        scroller: getScroller(),
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -80,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
    });

    gsap.from(".creative-box", {
      scrollTrigger: {
        trigger: ".creative-container",
        scroller: getScroller(),
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
    });

    gsap.from(".company-left", {
      scrollTrigger: {
        trigger: "#company",
        scroller: getScroller(),
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }

  // --- 6. Hobbies & Growth Section ---
  if (document.querySelector("#hobbies")) {
    gsap.from(".hobbies-wrapper h2, .hobbies-wrapper > p", {
      scrollTrigger: {
        trigger: "#hobbies",
        scroller: getScroller(),
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
    });

    gsap.from(".hoby-left", {
      scrollTrigger: {
        trigger: ".hobbies",
        scroller: getScroller(),
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -50,
      opacity: 0,
      duration: 1,
    });

    gsap.from(".hoby-items", {
      scrollTrigger: {
        trigger: ".hoby-right",
        scroller: getScroller(),
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.9,
      ease: "power2.out",
    });

    gsap.from(".fueling-growth .opening-project", {
      scrollTrigger: {
        trigger: ".fueling-growth",
        scroller: getScroller(),
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
    });
  }

  // --- 7. Footer Animation ---
  if (document.querySelector(".footer")) {
    gsap.from(".footer-flex-container > div", {
      scrollTrigger: {
        trigger: ".footer",
        scroller: getScroller(),
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
    });
  }
});
