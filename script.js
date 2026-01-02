const navBtn = document.getElementById("navBtn");
const nav = document.getElementById("nav");

navBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

nav?.querySelectorAll("a")?.forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    navBtn?.setAttribute("aria-expanded", "false");
  });
});

// EDIT THIS EMAIL:
const email = "yourname@email.com";

const mailtoBtn = document.getElementById("mailtoBtn");
const emailText = document.getElementById("emailText");
if (emailText) emailText.textContent = email;

if (mailtoBtn) {
  const subject = encodeURIComponent("House sitting request");
  const body = encodeURIComponent(
`Hi! We'd love to request a house sit.

Dates:
Location:
Pets (type/breed):
Routine / meds:
Any notes (plants, bins, etc.):

Thanks!`
  );
  mailtoBtn.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

document.getElementById("copyEmail")?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    alert("Email copied!");
  } catch {
    alert("Copy failed — you can select and copy it manually.");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
