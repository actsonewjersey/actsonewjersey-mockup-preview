const CONTACT_EMAIL = "admin@actsonewjersey.org";

const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open", !isOpen);
  });
}

const currentPage = document.body.dataset.page;
document.querySelectorAll("[data-nav-link]").forEach((link) => {
  if (link.dataset.navLink === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll("[data-category-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.categoryFilter;
    document.querySelectorAll("[data-category-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    document.querySelectorAll("[data-category-group]").forEach((section) => {
      section.hidden = group !== "all" && section.dataset.categoryGroup !== group;
    });
  });
});

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const firstName = data.get("first-name")?.toString().trim() || "";
    const lastName = data.get("last-name")?.toString().trim() || "";
    const email = data.get("email")?.toString().trim() || "";
    const message = data.get("message")?.toString().trim() || "";
    const subject = encodeURIComponent(`ACT-SO website message from ${firstName} ${lastName}`.trim());
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    const status = contactForm.querySelector("[data-form-status]");
    if (status) {
      status.textContent = "Your email app should open with the message ready to send.";
    }
  });
}
