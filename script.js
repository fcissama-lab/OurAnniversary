const startBtn = document.getElementById("startBtn");
if (startBtn) startBtn.addEventListener("click", () => {
    const music = document.getElementById("bgMusic");
    if (music) {
        music.currentTime = 15;
        sessionStorage.setItem("musicStarted", "yes");
        sessionStorage.setItem("musicTime", "15");
        music.play().catch(() => {});
        music.addEventListener("timeupdate", () => {
            sessionStorage.setItem("musicTime", String(music.currentTime));
        });
    }
    goToPage("memories.html");
});

const enterBtn = document.getElementById("enterBtn");
const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("errorMessage");
if (enterBtn && passwordInput) {
    function checkPassword() {
        if (passwordInput.value === "1010") {
            goToPage("home.html");
        } else {
            errorMessage.textContent = "hmm... I don't think that's it ♡";
            passwordInput.value = "";
            passwordInput.focus();
        }
    }
    enterBtn.addEventListener("click", checkPassword);
    passwordInput.addEventListener("keydown", e => { if (e.key === "Enter") checkPassword(); });
}

function toggleMemory(card) { card.classList.toggle("open"); }

function goToPage(page) {
    const music = document.getElementById("bgMusic") || document.getElementById("siteMusic");
    if (music && !music.paused) {
        sessionStorage.setItem("musicTime", String(music.currentTime));
    }
    document.body.style.opacity = "0";
    setTimeout(() => window.location.href = page, 600);
}

function openLetter() {
    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("finalLetter");
    if (!envelope || !letter) return;
    envelope.classList.toggle("open");
    letter.classList.toggle("open");
    if (letter.classList.contains("open")) {
        setTimeout(() => letter.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
    }
}


const siteMusic = document.getElementById("siteMusic");
if (siteMusic && sessionStorage.getItem("musicStarted") === "yes") {
    const savedTime = parseFloat(sessionStorage.getItem("musicTime") || "15");
    siteMusic.currentTime = Number.isFinite(savedTime) ? savedTime : 15;
    siteMusic.play().catch(() => {});
    siteMusic.addEventListener("timeupdate", () => {
        sessionStorage.setItem("musicTime", String(siteMusic.currentTime));
    });
}

function showFinalPhoto() {
    const button = document.getElementById("finalRevealBtn");
    const photo = document.getElementById("finalPhoto");
    const hint = document.getElementById("envelopeHint");
    const envelope = document.getElementById("envelope");
    if (!button || !photo || !hint || !envelope) return;
    button.classList.add("revealed");
    button.disabled = true;
    photo.classList.remove("hidden-final-photo");
    hint.classList.remove("hidden-final-photo");
    envelope.classList.remove("hidden-final-photo");
    setTimeout(() => photo.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
}

const envelopeEl = document.getElementById("envelope");
if (envelopeEl) {
    envelopeEl.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLetter();
        }
    });
}
