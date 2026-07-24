(() => {
  const root = document.documentElement;
  const THEME_KEY = "portfolio-theme";
  let onThemeChanged = () => {};

  // ---------- Theme toggle ----------
  const toggleBtn = document.getElementById("themeToggle");
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }

  function currentTheme() {
    const attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  toggleBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
    onThemeChanged();
  });

  // Keep the signal-strip colors in sync if the OS theme flips while no
  // manual override is stored.
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    if (!root.getAttribute("data-theme")) onThemeChanged();
  });

  // ---------- Scroll-spy nav ----------
  const navLinks = Array.from(document.querySelectorAll("#navlinks a"));
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navLinks.find((a) => a.dataset.section === entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  sections.forEach((section) => spy.observe(section));

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // ---------- Back to top ----------
  const toTop = document.getElementById("toTop");
  window.addEventListener(
    "scroll",
    () => {
      toTop.classList.toggle("visible", window.scrollY > 700);
    },
    { passive: true }
  );
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------- Footer year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = `최종 갱신 ${new Date().getFullYear()}`;

  // ---------- Signal strip: generative "token / waveform" canvas ----------
  // A strip of bars pulsing like an audio waveform crossed with a token
  // stream — a nod to both projects (TTS audio + LLM generation) rather
  // than a decorative flourish. Short bars read teal, tall ones read
  // ember, so color itself carries "signal strength."
  const canvas = document.getElementById("signal");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const BAR_COUNT = 72;
    const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({
      phase: (i / BAR_COUNT) * Math.PI * 2 + Math.random() * 1.2,
      speed: 0.9 + Math.random() * 0.6,
      base: 0.15 + Math.random() * 0.15,
    }));

    let colorTeal = "#4cc9b8";
    let colorEmber = "#f0a941";
    let width = 0;
    let height = 0;
    let rafId = null;

    function readColors() {
      const styles = getComputedStyle(root);
      colorTeal = styles.getPropertyValue("--teal").trim() || colorTeal;
      colorEmber = styles.getPropertyValue("--ember").trim() || colorEmber;
    }

    function mixColor(hexA, hexB, t) {
      const a = parseInt(hexA.replace("#", ""), 16);
      const b = parseInt(hexB.replace("#", ""), 16);
      const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
      const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
      const r = Math.round(ar + (br - ar) * t);
      const g = Math.round(ag + (bg - ag) * t);
      const bl = Math.round(ab + (bb - ab) * t);
      return `rgb(${r}, ${g}, ${bl})`;
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      const gap = width / BAR_COUNT;
      const barW = gap * 0.55;
      bars.forEach((bar, i) => {
        const wobble =
          Math.sin(bar.phase + t * 0.0012 * bar.speed) * 0.5 +
          Math.sin(bar.phase * 1.7 + t * 0.0007 * bar.speed) * 0.3;
        const amp = Math.max(0, bar.base + wobble * 0.42);
        const h = Math.min(1, amp) * height * 0.86;
        const x = i * gap + (gap - barW) / 2;
        const y = (height - h) / 2;
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = mixColor(colorTeal, colorEmber, Math.min(1, amp));
        ctx.fillRect(x, y, barW, Math.max(2, h));
      });
    }

    function loop(t) {
      draw(t);
      rafId = requestAnimationFrame(loop);
    }

    function start() {
      readColors();
      resize();
      if (reduceMotion) {
        draw(0);
      } else {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(loop);
      }
    }

    onThemeChanged = () => {
      readColors();
      if (reduceMotion) draw(0);
    };

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduceMotion) draw(0);
      }, 150);
    });

    start();
  }
})();
