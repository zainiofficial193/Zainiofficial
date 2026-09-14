document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector("[data-scroll-web_page]");
  const navbar = document.querySelector(".header");
  const isMobile = window.innerWidth <= 1024;

  gsap.registerPlugin(ScrollTrigger);

  let scroller = null;

  // --- 1. Locomotive Initialization (Desktop Only) ---
  if (!isMobile && scrollContainer) {
    scroller = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      multiplier: 1.1,
      lerp: 0.09,
      getDirection: true,
      getSpeed: true,
    });

    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollContainer, {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollContainer.style.transform ? "transform" : "fixed",
    });

    new ResizeObserver(() => scroller.update()).observe(scrollContainer);
  }

  // --- 2. Navbar Hide/Show Logic ---
  let lastScrollTop = 0;

  if (!isMobile && scroller) {
    scroller.on("scroll", (args) => {
      let scrollTop = args.scroll.y;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar?.classList.add("scrollUp");
      } else {
        navbar?.classList.remove("scrollUp");
      }
      lastScrollTop = scrollTop;
    });
  } else {
    window.addEventListener(
      "scroll",
      () => {
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
          navbar?.classList.add("scrollUp");
        } else {
          navbar?.classList.remove("scrollUp");
        }

        if (scrollTop <= 10) {
          navbar?.classList.remove("scrollUp");
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      },
      {passive: true},
    );
  }

  // --- 4. Fixed Smooth Anchor Links ---
  const navLinks = document.querySelectorAll("[data-scroll-to]");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        if (!isMobile && scroller) {
          // Corrected Locomotive scrollTo syntax
          scroller.scrollTo(targetEl, -50, 800);
        } else {
          // Mobile Fallback
          targetEl.scrollIntoView({behavior: "smooth"});
        }
      }
    });
  });

  // --- 5. Utility & Menu Logic ---
  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      navMenu?.classList.toggle("active");
      menuBtn?.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("active");
      menuBtn?.classList.remove("active");
    });
  });

  // Visibility Play/Pause Logic
  const hidden =
    typeof document.hidden !== "undefined"
      ? "hidden"
      : typeof document.msHidden !== "undefined"
        ? "msHidden"
        : "webkitHidden";

  const visibilityChange =
    typeof document.hidden !== "undefined"
      ? "visibilitychange"
      : typeof document.msHidden !== "undefined"
        ? "msvisibilitychange"
        : "webkitvisibilitychange";

  const animElements = [
    document.querySelector(".titlebg"),
    document.querySelector(".svglogo"),
  ];

  function togglePlayState(isHidden) {
    animElements.forEach((el) => {
      if (el) el.classList.toggle("noplay", isHidden);
    });
  }

  if (visibilityChange) {
    document.addEventListener(
      visibilityChange,
      () => togglePlayState(document[hidden]),
      false,
    );
  }

  animElements[0]?.classList.add("titleanim");

  // --- 6. Refresh & Maintenance ---
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
    if (!isMobile && scroller) scroller.update();
  });

  ScrollTrigger.addEventListener("refresh", () => scroller?.update());

  function refreshScrollers() {
    ScrollTrigger.refresh();
    if (scroller) scroller.update();
  }

  const allImages = Array.from(document.images);
  const pendingImages = allImages.filter((img) => !img.complete);

  if (pendingImages.length === 0) {
    refreshScrollers();
  } else {
    let remaining = pendingImages.length;
    pendingImages.forEach((img) => {
      const onDone = () => {
        remaining -= 1;
        refreshScrollers();
        if (remaining === 0) {
          img.removeEventListener("load", onDone);
          img.removeEventListener("error", onDone);
        }
      };
      img.addEventListener("load", onDone, {once: true});
      img.addEventListener("error", onDone, {once: true});
    });
  }

  window.addEventListener("load", refreshScrollers);
  setTimeout(refreshScrollers, 1500);
});
