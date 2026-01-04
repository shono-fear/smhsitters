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

document.getElementById("year")?.textContent = new Date().getFullYear();


// ─────────────────────────────────────────────
// Clean landing transition (logo → top-left, calendar appears)
// Requires: #enterBtn (logo button) and #main (main content wrapper)
// ─────────────────────────────────────────────
const enterBtn = document.getElementById("enterBtn");
const main = document.getElementById("main");

function enterSite() {
  if (!enterBtn || !main) return;
  if (document.body.classList.contains("entered")) return;

  document.body.classList.add("entered");
  main.setAttribute("aria-hidden", "false");
  enterBtn.setAttribute("aria-disabled", "true");

  // after animation completes (matches your CSS transition time)
  setTimeout(() => document.body.classList.add("settled"), 750);

  // optional: remember for this tab so refresh skips intro
  // sessionStorage.setItem("entered", "1");
}

enterBtn?.addEventListener("click", enterSite);

// optional auto-enter if remembered
// if (sessionStorage.getItem("entered") === "1") enterSite();
