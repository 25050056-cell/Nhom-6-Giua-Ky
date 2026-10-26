const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Mở menu điều hướng" : "Đóng menu điều hướng",
  );
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Mở menu điều hướng");
    siteNav.classList.remove("is-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Mở menu điều hướng");
    siteNav.classList.remove("is-open");
    menuToggle.focus();
  }
});

const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
  const isDark = document.body.dataset.theme !== "dark";
  document.body.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối",
  );
  themeToggle.querySelector("span").textContent = isDark ? "☀" : "☾";
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterEmpty = document.querySelector(".filter-empty");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleProjects = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const shouldShow =
        selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.hidden = !shouldShow;
      if (shouldShow) visibleProjects += 1;
    });

    filterEmpty.hidden = visibleProjects > 0;
  });
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const fields = {
  name: {
    input: document.querySelector("#contact-name"),
    error: document.querySelector("#name-error"),
    validate: (value) =>
      value.trim().length >= 2 ? "" : "Vui lòng nhập tên có ít nhất 2 ký tự.",
  },
  email: {
    input: document.querySelector("#contact-email"),
    error: document.querySelector("#email-error"),
    validate: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? ""
        : "Vui lòng nhập địa chỉ email hợp lệ.",
  },
  message: {
    input: document.querySelector("#contact-message"),
    error: document.querySelector("#message-error"),
    validate: (value) =>
      value.trim().length >= 20
        ? ""
        : "Lời nhắn cần có ít nhất 20 ký tự.",
  },
};

function validateField(field) {
  const message = field.validate(field.input.value);
  field.error.textContent = message;
  field.input.setAttribute("aria-invalid", String(Boolean(message)));
  return !message;
}

Object.values(fields).forEach((field) => {
  field.input.addEventListener("input", () => {
    validateField(field);
    formStatus.replaceChildren();
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.replaceChildren();

  const invalidFields = Object.values(fields).filter(
    (field) => !validateField(field),
  );

  if (invalidFields.length > 0) {
    invalidFields[0].input.focus();
    return;
  }

  const subject = `Lời nhắn từ ${fields.name.input.value.trim()}`;
  const body = [
    `Họ và tên: ${fields.name.input.value.trim()}`,
    `Email: ${fields.email.input.value.trim()}`,
    "",
    fields.message.input.value.trim(),
  ].join("\n");
  const mailLink = document.createElement("a");
  mailLink.href = `mailto:25050058@student.bdu.edu.vn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  mailLink.textContent = "Mở ứng dụng email để gửi lời nhắn.";
  formStatus.append("Thông tin hợp lệ. ", mailLink);
});
