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
// Clean landing + "peek tab" logo
// Requires: #enterBtn (logo button) and #main (main content wrapper)
// Classes used: entered, settled, logo-peek
// ─────────────────────────────────────────────
const enterBtn = document.getElementById("enterBtn");
const main = document.getElementById("main");

const canHover = typeof window !== "undefined"
  && window.matchMedia
  && window.matchMedia("(hover: hover)").matches;

function enterSite() {
  if (!enterBtn || !main) return;
  if (document.body.classList.contains("entered")) return;

  document.body.classList.add("entered");
  main.setAttribute("aria-hidden", "false");

  // after animation completes (matches your CSS transition time)
  setTimeout(() => document.body.classList.add("settled"), 750);
}

function setPeek(open) {
  // only allow peek after the site is entered
  if (!document.body.classList.contains("entered")) return;
  if (typeof open === "boolean") {
    document.body.classList.toggle("logo-peek", open);
  } else {
    document.body.classList.toggle("logo-peek");
  }
}

// Click: first click enters, later clicks toggle peek
enterBtn?.addEventListener("click", (e) => {
  if (!document.body.classList.contains("entered")) {
    enterSite();
    return;
  }
  // only toggle once we're settled (optional but feels cleaner)
  if (document.body.classList.contains("settled")) setPeek();
});

// Desktop: hover opens peek, leaving closes (only after settled)
if (canHover) {
  enterBtn?.addEventListener("pointerenter", () => {
    if (document.body.classList.contains("settled")) setPeek(true);
  });
  enterBtn?.addEventListener("pointerleave", () => {
    if (document.body.classList.contains("settled")) setPeek(false);
  });
}

// Click anywhere else closes the peek
document.addEventListener("click", (e) => {
  if (!document.body.classList.contains("logo-peek")) return;
  if (enterBtn && enterBtn.contains(e.target)) return;
  setPeek(false);
});

// Esc closes peek
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setPeek(false);
});
