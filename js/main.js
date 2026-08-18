const PROFILE = {
  name: "김민석",
  role: "AI Engineer & LLM Engineer",
  emailLabel: "km7529@naver.com",
  email: "mailto:km7529@naver.com",
  phone: "010-6787-7529",
  address: "군산시 미장동",
  education: "대구대학교 AI학과 졸업",
  githubLabel: "github.com/minkim7529",
  github: "https://github.com/minkim7529",
  blogLabel: "",
  blog: "",
};

const SKILLS = [
  { name: "Python", icon: "devicon-python-plain" },
  { name: "PyTorch", icon: "devicon-pytorch-original" },
  { name: "FastAPI", icon: "devicon-fastapi-plain" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "TypeScript", icon: "devicon-typescript-plain" },
];

const NAV_GROUPS = [
  {
    label: "PROJECTS",
    items: [
      { slug: "knowledge-assistant", title: "멀티모달 지식 어시스턴트 (RAG)", repo: "knowledge-assistant" },
      { slug: "vtuber-companion", title: "로컬 LLM 보이스 컴패니언", repo: "vtuber-ollama-gemini-experiments" },
      { slug: "legal-consultation-ai", title: "법률상담 AI", repo: "legal-consultation-ai", award: true },
      { slug: "hackathon-seolstudy", title: "설스터디 (해커톤)", repo: "hackathon-seolstudy", award: true },
      { slug: "goods-shop", title: "Goods Shop 웹 프로젝트", repo: "goods-shop" },
      { slug: "drowsy-reading-stand", title: "졸음방지 독서대", repo: "drowsy-reading-stand" },
      { slug: "skin-disease-classifier", title: "피부질환 분류 알고리즘", repo: "skin-disease-classifier" },
    ],
  },
];

(() => {
  const root = document.documentElement;
  const THEME_KEY = "portfolio-theme";

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

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // ---------- Sidebar (profile + project nav) ----------
  const mount = document.getElementById("sidebarMount");
  if (mount) {
    const base = mount.dataset.base || "./";
    const active = mount.dataset.active || "";

    const infoRow = (label, value, href) => {
      const val = href
        ? `<a class="v" href="${href}" target="_blank" rel="noopener">${value}</a>`
        : value
        ? `<span class="v">${value}</span>`
        : `<span class="v blank"></span>`;
      return `<div class="info-row"><span class="k">${label}</span>${val}</div>`;
    };

    const profile = document.createElement("div");
    profile.className = "sidebar-profile";
    profile.innerHTML = `
      <div class="sidebar-photo" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/></svg>
      </div>
      <a class="sidebar-name" href="${base}index.html">${PROFILE.name}</a>
      <div class="sidebar-role">${PROFILE.role}</div>

      <div class="sidebar-info">
        ${infoRow("Email", PROFILE.emailLabel, PROFILE.email)}
        ${infoRow("Phone", PROFILE.phone)}
        ${infoRow("Address", PROFILE.address)}
        ${infoRow("Education", PROFILE.education)}
        ${infoRow("GitHub", PROFILE.githubLabel, PROFILE.github)}
        ${infoRow("Blog", PROFILE.blogLabel, PROFILE.blog)}
      </div>

      <p class="sidebar-label">SKILLS</p>
      <div class="sidebar-skills">
        ${SKILLS.map(
          (s) => `<span class="skill" title="${s.name}"><i class="${s.icon} colored"></i></span>`
        ).join("")}
      </div>
    `;
    mount.appendChild(profile);

    NAV_GROUPS.forEach((group) => {
      const label = document.createElement("p");
      label.className = "sidebar-label";
      label.textContent = group.label;
      mount.appendChild(label);

      const nav = document.createElement("nav");
      nav.className = "sidebar-nav";
      group.items.forEach((p) => {
        const a = document.createElement("a");
        a.href = `${base}projects/${p.slug}.html`;
        if (p.slug === active) a.classList.add("active");
        const titleText = p.award ? `${p.title} 🏆` : p.title;
        a.innerHTML = p.repo ? `${titleText}<span class="repo">${p.repo}</span>` : titleText;
        nav.appendChild(a);
      });
      mount.appendChild(nav);
    });
  }

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
})();
