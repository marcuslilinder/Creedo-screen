const countDownDate = new Date("Feb 09, 2026 18:00:00").getTime();

const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerHTML = days < 10 ? "0" + days : days;
    if (hoursEl) hoursEl.innerHTML = hours < 10 ? "0" + hours : hours;
    if (minutesEl) minutesEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    if (secondsEl) secondsEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(x);
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "DRAW STARTED";
    }
}, 1000);

function initParticles() {
    const particlesContainer = document.getElementById("particles-js");
    if (!particlesContainer || typeof particlesJS !== "function") return;

    const config = {
        "particles": {
            "number": {
                "value": 80,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": "#ffffff" },
            "shape": {
                "type": "circle",
                "stroke": { "width": 0, "color": "#000000" },
                "polygon": { "nb_sides": 5 }
            },
            "opacity": { "value": 0.7, "random": true, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 4, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
                "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                "repulse": { "distance": 200 },
                "push": { "particles_nb": 4 },
                "remove": { "particles_nb": 2 }
            }
        },
        "retina_detect": true
    };

    particlesJS("particles-js", config);
}

initParticles();
// Initialize VANTA fog effect
let vantaEffect;
function initVantaFog() {
    const el = document.getElementById("vanta-bg");
    if (!el || typeof VANTA === "undefined" || !VANTA.FOG) return;
    vantaEffect = VANTA.FOG({
        // VANTA fog effect settings
        el: "#vanta-bg", // Target element ID
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0xb6b6b6,
        midtoneColor: 0x637df5,
        lowlightColor: 0xed75cd,
        baseColor: 0xe6e6e6,
        blurFactor: 0.80,
        zoom: 0.40
    });
}
initVantaFog();

function setupCreedoFormValidation() {
    const form = document.querySelector('form[data-validate="creedo"]');
    if (!form) return;

    const inputs = Array.from(form.querySelectorAll(".form-control-input"));

    function getFormGroup(input) {
        return input.closest(".form-group");
    }

    function getErrorEl(input) {
        const describedBy = input.getAttribute("aria-describedby");
        if (describedBy) {
            const el = document.getElementById(describedBy);
            if (el) return el;
        }
        const group = getFormGroup(input);
        return group ? group.querySelector(".err-text") : null;
    }

    function getErrorMessage(input) {
        if (input.validity.valueMissing) return "This field is required";
        if (input.validity.patternMismatch) {
            if (input.id === "telegram") {
                return "Username must be from 5 to 32 letters, digits or underscores; “@” optional";
            }
            return "Invalid format";
        }
        return "Invalid value";
    }

    function setFieldState(input, isValid) {
        const group = getFormGroup(input);
        const errorEl = getErrorEl(input);

        input.setAttribute("aria-invalid", String(!isValid));
        if (group) group.classList.toggle("error", !isValid);

        if (!errorEl) return;
        if (isValid) {
            errorEl.textContent = "";
            errorEl.hidden = true;
        } else {
            errorEl.textContent = getErrorMessage(input);
            errorEl.hidden = false;
        }
    }

    function validateField(input) {
        const isValid = input.checkValidity();
        setFieldState(input, isValid);
        return isValid;
    }

    for (const input of inputs) {
        input.addEventListener("blur", () => validateField(input));
        input.addEventListener("input", () => {
            const group = getFormGroup(input);
            if (group && group.classList.contains("error")) validateField(input);
        });
    }

    form.addEventListener("submit", (e) => {
        let firstInvalid = null;
        for (const input of inputs) {
            const isValid = validateField(input);
            if (!isValid && !firstInvalid) firstInvalid = input;
        }

        if (firstInvalid) {
            e.preventDefault();
            firstInvalid.focus();
        }
    });
}

setupCreedoFormValidation();
