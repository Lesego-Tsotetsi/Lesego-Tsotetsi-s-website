// LES EGO TSOTETSI PORTFOLIO INTERACTIONS
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");

function closeMenu() {
  navbar.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open navigation");
  menuBtn.innerHTML = '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
}

menuBtn.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
});

navLinks.forEach(link => link.addEventListener("click", () => {
  closeMenu();
  navLinks.forEach(item => item.classList.remove("active"));
  link.classList.add("active");
}));

document.addEventListener("click", event => {
  if (!navbar.contains(event.target) && !menuBtn.contains(event.target)) closeMenu();
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 450);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const current = `#${entry.target.id}`;
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === current);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));

// Render Lucide icons after the page is ready.
if (window.lucide) lucide.createIcons();
