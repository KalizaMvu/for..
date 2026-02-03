// Apple-style: hero fades + moves out, next sections reveal later (no peeking)

const hero = document.querySelector(".hero");
const hint = document.querySelector(".scrollHint");

// Tune these if you want the hero to fade slower/faster
const FADE_POINT = 180; // bigger = slower fade
const MAX_SHIFT_PX = 70; // how far hero drifts as you scroll

function onScroll() {
    const y = window.scrollY || 0;

    // HERO: fade out + drift so it feels like it leaves the scene
    if (hero) {
        const opacity = Math.max(0, 1 - y / FADE_POINT);
        hero.style.opacity = String(opacity);

        const shift = Math.min(y / 2.8, MAX_SHIFT_PX);
        hero.style.transform = `translateY(${shift}px)`;

        // prevent accidental taps on invisible hero on mobile
        hero.style.pointerEvents = opacity <= 0.02 ? "none" : "auto";
    }

    // SCROLL HINT: fade quickly
    if (hint) {
        hint.style.transition = "opacity 250ms ease, transform 250ms ease";
        hint.style.opacity = y > 40 ? "0" : "1";
        hint.style.transform = y > 40 ? "translateY(-6px)" : "translateY(0)";
    }
}

// Run once on load (important for mobile refresh/restore)
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// REVEALS: delay until section is clearly on screen
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target); // animate once
            }
        });
    },
    {
        threshold: 0.35,
        rootMargin: "0px 0px -40% 0px", // pushes reveal later so it doesn't show early
    }
);

// IMPORTANT: start observing (this line was missing in yours)
reveals.forEach((el) => observer.observe(el));
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const responseText = document.getElementById("responseText");

if (yesBtn && noBtn && responseText) {
    yesBtn.addEventListener("click", () => {
        responseText.textContent = "Okay… you just made me really happy 🩷";
    });

    noBtn.addEventListener("click", () => {
        responseText.textContent = "That’s okay. I’m still really glad it’s you.";
    });
}

