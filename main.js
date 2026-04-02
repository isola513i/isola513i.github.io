// ===== Mobile nav toggle (fullscreen overlay) =====
const btn = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

const closeMenu = () => {
  btn?.classList.remove("active");
  links?.classList.remove("open");
  document.body.classList.remove("menu-open");
};

btn?.addEventListener("click", () => {
  const isOpen = links?.classList.toggle("open");
  btn?.classList.toggle("active");
  document.body.classList.toggle("menu-open", isOpen);
});

// Close menu when a nav link is clicked
links?.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", closeMenu);
});

// ===== Active state on click/hash change =====
const setActiveByHash = () => {
  document.querySelectorAll('#navbar a[href^="#"]').forEach((a) => {
    a.removeAttribute("aria-current");
    if (a.getAttribute("href") === location.hash)
      a.setAttribute("aria-current", "page");
  });
};
window.addEventListener("hashchange", setActiveByHash);

// ===== Scroll Spy with IntersectionObserver =====
const sections = [
  ...document.querySelectorAll("main section, header#welcome-section"),
];
const navMap = new Map(
  [...document.querySelectorAll('#navbar a[href^="#"]')].map((a) => [
    a.getAttribute("href").slice(1),
    a,
  ]),
);

const NAV_HEIGHT = 84;
const io = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const id = visible.target.id;
    navMap.forEach((a) => a.removeAttribute("aria-current"));
    if (navMap.has(id))
      navMap.get(id).setAttribute("aria-current", "page");
  },
  {
    root: null,
    threshold: [0.25, 0.6, 0.9],
    rootMargin: `-${NAV_HEIGHT}px 0px -40% 0px`,
  },
);

sections.forEach((sec) => io.observe(sec));

// ===== Scroll Effects (throttled via rAF) =====
const nav = document.getElementById("navbar");

// ===== Projects Toggle =====
const projectsSection = document.getElementById("projects");
const toggleBtn = document.getElementById("projects-toggle");
toggleBtn?.addEventListener("click", () => {
  projectsSection?.classList.toggle("show-all");
  const expanded = projectsSection?.classList.contains("show-all");
  const lang = document.documentElement.lang || "en";
  if (toggleBtn) toggleBtn.textContent =
    translations[lang][
      expanded ? "projects.toggle.hide" : "projects.toggle.show"
    ];
  const grid = projectsSection?.querySelector(".grid");
  if (grid) grid.scrollLeft = 0;
});

// ===== i18n =====
const translations = {
  en: {
    "nav.about": "About Me",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.certifications": "Certifications",
    "nav.skills": "Skills",
    "nav.contact": "Contact Me",
    "nav.resume": 'Resume <span aria-hidden="true">↧</span>',
    "hero.title": "Hi, I'm Ice — Full-Stack Developer",
    "hero.lead":
      "From pixel to production — building web apps that work.",
    "hero.cta": "See my work",
    "about.title": "About",
    "about.text":
      "Third-year IT student @KMUTT (SIT). Focused on web back-to-front workflows, REST, database design, and product UX. Aspiring and passionate Full-Stack Developer seeking a Developer Internship to apply and strengthen acquired skills in web development. Eager to contribute to innovative projects, gain hands-on experience in cutting-edge technologies, and build robust solutions with a focus on user experience.",
    "projects.title": "Featured Projects",
    "projects.toggle.show": "View all projects",
    "projects.toggle.hide": "Show featured only",
    "project.1.desc":
      "Full-stack e-commerce platform serving multiple user roles with 50+ REST API endpoints, JWT authentication, and role-based access control.",
    "project.2.desc":
      "Community recipe platform with full CRUD, server-side pagination, and a review system. Handles recipe management with image uploads and category filtering.",
    "project.3.desc":
      "Mobile-first room booking app with real-time availability conflict checking, interactive calendar UI, and optimistic refresh for a seamless experience.",
    "project.4.desc":
      "Interactive word chain game with dictionary-backed validation, complex state management, and turn-based logic using Vue 3 Composition API.",
    "project.5.desc":
      "Play Tic Tac Toe against a rule-based AI. Includes player choice (X/O).",
    "project.6.desc":
      "Simon game clone with sound, strict mode, and 20-step win condition.",
    "project.7.desc":
      "Cafe landing + menu systems, bilingual content, and promo assets (LINE OA, posters).",
    "project.8.desc":
      "FCC Frontend Libraries — React 17. Random quotes + Tweet intent.",
    "project.9.desc":
      "FCC Frontend Libraries — React 17. Session/Break timer, sound, reset, test-ready.",
    "project.10.desc":
      "FCC Frontend Libraries — React 17. Calculator with decimal & operator precedence.",
    "project.11.desc":
      "FCC Project: Shows local weather via Geolocation API. Toggle C°/F°.",
    "project.12.desc":
      "FCC Project: Checks if Twitch streamers are online, using FCC's proxy API.",
    "project.13.desc":
      "FCC Project: Search Wikipedia with a click-to-open UI and view random articles.",
    "project.14.desc":
      "Streetwear e-commerce landing page with bold visuals, brand filtering, category browsing, and a street culture showcase.",
    "project.15.desc":
      "IT product e-commerce app with flash sales, product categories, cart system, and a modern mobile-first UI.",
    "project.16.desc":
      "Multi-step survey form for AIYA's AI Empire event with progress tracking, step navigation, and a clean mobile-first design.",
    "project.17.desc":
      "Event registration and payment form for AIYA's \"Master the AI Empire\" webinar with attendee info collection and a mobile-first layout.",
    "project.18.desc":
      "Full-featured Human Resource Management system with HR dashboard, leave requests, attendance tracking, onboarding, analytics, and org chart. Built at AIYA (private repo).",
    "btn.viewRepo": "View Repo",
    "btn.liveDemo": "Live Demo",
    "btn.gallery": "Gallery",
    "btn.location": "Location",
    "exp.title": "Experience & Education",
    "exp.work.title": "Work Experience",
    "exp.work.role": "QA Intern",
    "exp.work.bullet1":
      "Tested banking account creation and system validation workflows from a user perspective.",
    "exp.work.bullet2":
      "Collaborated with developers to ensure feature accuracy and quality of front-end functionalities.",
    "exp.work2.role": "Full-Stack Developer",
    "exp.work2.period": "Oct 2025 - Present",
    "exp.work2.bullet1":
      "Developed and maintained HARI, a Human Resource Management (HRM) system as a Full-Stack Developer.",
    "exp.work2.bullet2":
      "Built features covering employee management, attendance, leave requests, and organizational workflows.",
    "exp.edu.title": "Education",
    "exp.edu.degree": "Bachelor of Science in Information Technology",
    "exp.edu.coursework.label": "Relevant Coursework:",
    "exp.edu.coursework.1": "Programming Fundamentals",
    "exp.edu.coursework.2": "Web & Software Development (Vue.js, Spring Boot)",
    "exp.edu.coursework.3": "Database Systems & DevOps",
    "exp.edu.coursework.4": "Integrated IT Project (Team-based Fullstack Development)",
    "exp.edu.activities.label": "Activities:",
    "exp.edu.activities.1":
      "Hello World SIT Camp — Team-based software development camp with roles in Frontend, Design, and DevOps.",
    "exp.edu.activities.2":
      "Developer for the 3K Sports Day website (Three King Mongkut's Universities).",
    "exp.edu.activities.3":
      "Basketball player for IT Bangmod in the 3K Sports Day.",
    "cert.title": "Certifications",
    "skills.title": "Skills",
    "contact.title": "Contact",
    "contact.text":
      "I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    "footer.text":
      '© <span id="year"></span> Personal Portfolio by Nattapat Lamnui. All rights reserved.',
  },
  th: {
    "nav.about": "เกี่ยวกับ",
    "nav.projects": "ผลงาน",
    "nav.experience": "ประสบการณ์",
    "nav.certifications": "ใบรับรอง",
    "nav.skills": "ทักษะ",
    "nav.contact": "ติดต่อ",
    "nav.resume": 'เรซูเม่ <span aria-hidden="true">↧</span>',
    "hero.title": "สวัสดี ผมไอซ์ — Full-Stack Developer",
    "hero.lead":
      "จากพิกเซลสู่โปรดักชัน — สร้างเว็บแอปที่ใช้งานได้จริง",
    "hero.cta": "ดูผลงาน",
    "about.title": "เกี่ยวกับ",
    "about.text":
      "นักศึกษา IT ชั้นปี 3 @KMUTT (SIT) สนใจงาน Web ตั้งแต่ Front-end ถึง Back-end, REST API, การออกแบบฐานข้อมูล และ UX ผมเป็น Full-Stack Developer ที่มุ่งมั่นและกำลังมองหาตำแหน่ง Developer Intern เพื่อนำทักษะด้านการพัฒนาเว็บมาใช้งานจริง พร้อมเรียนรู้เทคโนโลยีใหม่ๆ และสร้างผลงานที่เน้นประสบการณ์ผู้ใช้",
    "projects.title": "ผลงานเด่น",
    "projects.toggle.show": "ดูโปรเจคทั้งหมด",
    "projects.toggle.hide": "แสดงเฉพาะผลงานเด่น",
    "project.1.desc":
      "แพลตฟอร์ม E-commerce แบบ Full-stack รองรับหลายบทบาทผู้ใช้ พร้อม REST API กว่า 50 endpoint, ระบบยืนยันตัวตน JWT และการควบคุมสิทธิ์ตามบทบาท",
    "project.2.desc":
      "แพลตฟอร์มแบ่งปันสูตรอาหาร มี CRUD เต็มรูปแบบ, การแบ่งหน้าฝั่ง Server และระบบรีวิว รองรับการอัปโหลดรูปภาพและกรองตามหมวดหมู่",
    "project.3.desc":
      "แอปจองห้องแบบ Mobile-first ตรวจสอบเวลาว่างแบบ Real-time, ปฏิทินแบบ Interactive และ Optimistic Refresh เพื่อประสบการณ์ที่ลื่นไหล",
    "project.4.desc":
      "เกมต่อคำศัพท์แบบ Interactive ตรวจสอบคำด้วย Dictionary, จัดการ State ที่ซับซ้อน และระบบผลัดเล่นด้วย Vue 3 Composition API",
    "project.5.desc":
      "เล่น Tic Tac Toe กับ AI แบบ Rule-based เลือกเล่นเป็น X หรือ O ได้",
    "project.6.desc":
      "เกม Simon จำลอง มีเสียง, โหมด Strict และเงื่อนไขชนะ 20 ขั้นตอน",
    "project.7.desc":
      "ระบบเว็บร้านกาแฟ + เมนู, เนื้อหา 2 ภาษา และสื่อโปรโมท (LINE OA, โปสเตอร์)",
    "project.8.desc":
      "FCC Frontend Libraries — React 17 สุ่มคำคมและแชร์ผ่าน Tweet",
    "project.9.desc":
      "FCC Frontend Libraries — React 17 จับเวลา Session/Break, เสียง, รีเซ็ต",
    "project.10.desc":
      "FCC Frontend Libraries — React 17 เครื่องคิดเลขรองรับทศนิยมและลำดับตัวดำเนินการ",
    "project.11.desc":
      "FCC Project: แสดงสภาพอากาศท้องถิ่นผ่าน Geolocation API สลับ C°/F° ได้",
    "project.12.desc":
      "FCC Project: ตรวจสอบสถานะสตรีมเมอร์ Twitch ผ่าน Proxy API ของ FCC",
    "project.13.desc":
      "FCC Project: ค้นหา Wikipedia พร้อม UI คลิกเปิดและดูบทความสุ่ม",
    "project.14.desc":
      "หน้า Landing Page ร้านค้า Streetwear ดีไซน์โดดเด่น กรองแบรนด์ เลือกหมวดหมู่ และโชว์คัลเจอร์ Street",
    "project.15.desc":
      "แอป E-commerce สินค้าไอที มี Flash Sale, หมวดหมู่สินค้า, ระบบตะกร้า และ UI แบบ Mobile-first",
    "project.16.desc":
      "แบบสอบถามหลายขั้นตอนสำหรับอีเวนต์ AI Empire ของ AIYA มี Progress Bar, การนำทางแต่ละ Step และดีไซน์ Mobile-first",
    "project.17.desc":
      "ฟอร์มลงทะเบียนและชำระเงินสำหรับ Webinar \"Master the AI Empire\" ของ AIYA เก็บข้อมูลผร้อม Layout แบบ Mobile-first",
    "project.18.desc":
      "ระบบบริหารทรัพยากรบุคคล (HRM) ครบวงจร มี Dashboard HR, ระบบลา, ลงเวลา, Onboarding, Analytics และ Org Chart พัฒนาที่ AIYA (private repo)",
    "btn.viewRepo": "ดู Repo",
    "btn.liveDemo": "ดูเว็บ",
    "btn.gallery": "แกลเลอรี",
    "btn.location": "สถานที่",
    "exp.title": "ประสบการณ์และการศึกษา",
    "exp.work.title": "ประสบการณ์ทำงาน",
    "exp.work.role": "QA Intern",
    "exp.work.bullet1":
      "ทดสอบการสร้างบัญชีธนาคารและ Workflow การตรวจสอบระบบจากมุมมองผู้ใช้",
    "exp.work.bullet2":
      "ทำงานร่วมกับนักพัฒนาเพื่อให้ฟีเจอร์ถูกต้องและมีคุณภาพในส่วน Front-end",
    "exp.work2.role": "Full-Stack Developer",
    "exp.work2.period": "ต.ค. 2025 - ปัจจุบัน",
    "exp.work2.bullet1":
      "พัฒนาและดูแลระบบ HARI ซึ่งเป็นระบบบริหารทรัพยากรบุคคล (HRM) ในตำแหน่ง Full-Stack Developer",
    "exp.work2.bullet2":
      "สร้างฟีเจอร์ครอบคลุมการจัดการพนักงาน, ระบบลงเวลา, การลา และ Workflow ขององค์กร",
    "exp.edu.title": "การศึกษา",
    "exp.edu.degree": "วิทยาศาสตรบัณฑิต สาขาเทคโนโลยีสารสนเทศ",
    "exp.edu.coursework.label": "วิชาที่เกี่ยวข้อง:",
    "exp.edu.coursework.1": "พื้นฐานการเขียนโปรแกรม",
    "exp.edu.coursework.2": "การพัฒนาเว็บและซอฟต์แวร์ (Vue.js, Spring Boot)",
    "exp.edu.coursework.3": "ระบบฐานข้อมูลและ DevOps",
    "exp.edu.coursework.4": "โปรเจค IT แบบบูรณาการ (พัฒนา Fullstack เป็นทีม)",
    "exp.edu.activities.label": "กิจกรรม:",
    "exp.edu.activities.1":
      "ค่าย Hello World SIT — ค่ายฝึกพัฒนาซอฟต์แวร์เป็นทีม แบ่งตำแหน่ง Frontend, Design และ DevOps",
    "exp.edu.activities.2":
      "Developer พัฒนาเว็บไซต์กีฬาสี 3 พระจอม (3K Sports Day)",
    "exp.edu.activities.3":
      "นักบาสเกตบอล IT Bangmod ในกีฬาสี 3K",
    "cert.title": "ใบรับรอง",
    "skills.title": "ทักษะ",
    "contact.title": "ติดต่อ",
    "contact.text":
      "ผมกำลังมองหาโอกาสใหม่ๆ กล่องข้อความเปิดรับเสมอ ไม่ว่าจะมีคำถามหรือแค่อยากทักทาย ผมยินดีตอบกลับครับ!",
    "footer.text":
      '© <span id="year"></span> พอร์ตโฟลิโอโดย ณัฐภัทร ลำนุ่ย สงวนลิขสิทธิ์',
  },
};

function applyLang(lang, animate = false) {
  const doApply = () => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);

    // text-only elements
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) el.textContent = translations[lang][key];
    });

    // HTML elements
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });

    // re-populate year after footer innerHTML replacement
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // update toggle buttons
    const desktopToggle = document.getElementById("lang-toggle");
    const mobileToggle = document.getElementById("lang-toggle-mobile");
    if (desktopToggle)
      desktopToggle.textContent = lang === "en" ? "TH" : "EN";
    if (mobileToggle)
      mobileToggle.textContent = lang === "en" ? "ภาษาไทย" : "English";

    // update projects toggle (dynamic text)
    if (toggleBtn && projectsSection) {
      const expanded = projectsSection.classList.contains("show-all");
      toggleBtn.textContent =
        translations[lang][
          expanded ? "projects.toggle.hide" : "projects.toggle.show"
        ];
    }
  };

  if (!animate) { doApply(); return; }

  // fade out → apply → fade in
  const main = document.querySelector("main");
  if (!main) { doApply(); return; }
  main.style.transition = "opacity 0.15s ease";
  main.style.opacity = "0";
  setTimeout(() => {
    doApply();
    main.style.opacity = "1";
  }, 150);
}

// init
const savedLang = localStorage.getItem("lang") || "en";
applyLang(savedLang);

// listeners
document.getElementById("lang-toggle")?.addEventListener("click", () => {
  applyLang(document.documentElement.lang === "en" ? "th" : "en", true);
});
document
  .getElementById("lang-toggle-mobile")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    applyLang(document.documentElement.lang === "en" ? "th" : "en", true);
  });

window.addEventListener("DOMContentLoaded", setActiveByHash);

// ===== Scroll handler (navbar + back-to-top, throttled) =====
const backToTop = document.getElementById("back-to-top");
let scrollTicking = false;
const onScroll = () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    if (y > 24) nav?.classList.add("is-scrolled");
    else nav?.classList.remove("is-scrolled");
    if (y > 400) backToTop?.classList.add("visible");
    else backToTop?.classList.remove("visible");
    scrollTicking = false;
  });
};
window.addEventListener("scroll", onScroll);
onScroll();
