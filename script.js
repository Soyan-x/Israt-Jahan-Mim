/* =========================================================
   ❤️ LOVE REVEAL WEBSITE
========================================================= */


/* =========================================================
   💗 CHANGE NAME HERE ONLY
========================================================= */

const LOVE_NAME = "Israt Jahan Mim";


/* =========================================================
   NAME SYSTEM
========================================================= */

const startName =
    document.getElementById("startName");

const mainName =
    document.getElementById("mainName");

const finalName =
    document.getElementById("finalName");

const pageTitle =
    document.getElementById("pageTitle");

const metaDescription =
    document.getElementById("metaDescription");


/* Put name everywhere */

if (startName) {
    startName.textContent = LOVE_NAME;
}

if (mainName) {
    mainName.textContent = LOVE_NAME;
}

if (finalName) {
    finalName.textContent = LOVE_NAME;
}


/* Browser tab */

if (pageTitle) {

    pageTitle.textContent =
        `For ${LOVE_NAME} ❤️`;

}


/* Meta description */

if (metaDescription) {

    metaDescription.setAttribute(
        "content",
        `A special message from my heart to ${LOVE_NAME} ❤️`
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const startScreen =
    document.getElementById("startScreen");

const startBtn =
    document.getElementById("startBtn");

const mainWebsite =
    document.getElementById("mainWebsite");

const revealBtn =
    document.getElementById("revealBtn");

const message =
    document.getElementById("message");

const finalReveal =
    document.getElementById("finalReveal");

const scrollHint =
    document.getElementById("scrollHint");

const bgMusic =
    document.getElementById("bgMusic");

const canvas =
    document.getElementById("heartCanvas");

const ctx =
    canvas
        ? canvas.getContext("2d")
        : null;


/* =========================================================
   VARIABLES
========================================================= */

let websiteStarted = false;

let revealed = false;

let particles = [];

let touchStartY = 0;


/* =========================================================
   START WEBSITE
========================================================= */

async function startWebsite() {

    if (websiteStarted) {
        return;
    }

    websiteStarted = true;


    /* -----------------------------------------
       MUSIC
    ----------------------------------------- */

    if (bgMusic) {

        try {

            bgMusic.volume = 0.65;

            await bgMusic.play();

            console.log(
                "🎵 Music started successfully"
            );

        }

        catch (error) {

            console.log(
                "Music could not start:",
                error
            );

        }

    }


    /* -----------------------------------------
       HIDE START SCREEN
    ----------------------------------------- */

    if (startScreen) {

        startScreen.style.opacity = "0";

        startScreen.style.visibility = "hidden";

        startScreen.style.pointerEvents = "none";

    }


    /* -----------------------------------------
       SHOW MAIN WEBSITE
    ----------------------------------------- */

    setTimeout(
        () => {

            if (startScreen) {

                startScreen.classList.add(
                    "hidden"
                );

            }


            if (mainWebsite) {

                mainWebsite.classList.remove(
                    "hidden"
                );

            }


            /* Start typing */

            startTypingMessage();

        },
        900
    );

}


/* =========================================================
   START BUTTON
========================================================= */

if (startBtn) {

    startBtn.addEventListener(
        "click",
        startWebsite
    );

}


/* =========================================================
   TYPING MESSAGE
========================================================= */

function startTypingMessage() {

    if (!message) {
        return;
    }


    const text =
        "There’s something I’ve been wanting to tell you for a while… " +
        "Maybe I never found the perfect words, " +
        "but today I don't want to hide it anymore. ❤️";


    let index = 0;


    message.innerHTML = "";


    function type() {

        if (index < text.length) {

            message.innerHTML =
                text.substring(
                    0,
                    index + 1
                ) +
                '<span class="typing-cursor"></span>';


            index++;


            setTimeout(
                type,
                30
            );

        }

        else {

            message.textContent = text;

        }

    }


    type();

}


/* =========================================================
   CANVAS RESIZE
========================================================= */

function resizeCanvas() {

    if (!canvas || !ctx) {
        return;
    }


    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        window.innerWidth * dpr;

    canvas.height =
        window.innerHeight * dpr;


    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


/* =========================================================
   CREATE HEART PARTICLE
========================================================= */

function createParticle(
    fromBottom = false
) {

    return {

        x:
            Math.random() *
            window.innerWidth,


        y:

            fromBottom

                ? window.innerHeight +
                  Math.random() * 120

                : Math.random() *
                  window.innerHeight,


        size:
            Math.random() * 7 + 3,


        speed:
            Math.random() * 0.7 + 0.2,


        drift:
            (Math.random() - 0.5) * 0.5,


        opacity:
            Math.random() * 0.55 + 0.2,


        hue:
            Math.random() * 360,


        rotation:
            Math.random() *
            Math.PI,


        rotationSpeed:
            (Math.random() - 0.5) *
            0.015,


        pulse:
            Math.random() *
            Math.PI *
            2

    };

}


/* =========================================================
   DRAW HEART
========================================================= */

function drawHeart(p) {

    if (!ctx) {
        return;
    }


    ctx.save();


    ctx.translate(
        p.x,
        p.y
    );


    ctx.rotate(
        p.rotation
    );


    const size =
        p.size;


    ctx.beginPath();


    ctx.moveTo(
        0,
        size * 0.4
    );


    ctx.bezierCurveTo(

        -size,

        -size * 0.2,

        -size * 0.6,

        -size,

        0,

        -size * 0.35

    );


    ctx.bezierCurveTo(

        size * 0.6,

        -size,

        size,

        -size * 0.2,

        0,

        size * 0.4

    );


    ctx.closePath();


    const hue =

        (
            p.hue +
            performance.now() *
            0.025
        ) % 360;


    const color =
        `hsl(${hue}, 100%, 70%)`;


    ctx.fillStyle =
        color;


    ctx.shadowColor =
        color;


    ctx.shadowBlur =
        18;


    ctx.fill();


    ctx.restore();

}


/* =========================================================
   PARTICLE ANIMATION
========================================================= */

function animateParticles() {

    if (!ctx) {
        return;
    }


    ctx.clearRect(

        0,
        0,
        window.innerWidth,
        window.innerHeight

    );


    particles.forEach(
        (p) => {

            p.y -=
                p.speed;


            p.x +=
                p.drift;


            p.rotation +=
                p.rotationSpeed;


            p.pulse +=
                0.035;


            if (
                p.y <
                -30
            ) {

                Object.assign(
                    p,
                    createParticle(true)
                );

            }


            const pulse =

                0.65 +

                Math.sin(
                    p.pulse
                ) * 0.35;


            ctx.save();


            ctx.globalAlpha =

                p.opacity *
                pulse;


            drawHeart(p);


            ctx.restore();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


/* =========================================================
   BACKGROUND HEARTS
========================================================= */

particles =

    Array.from(
        {
            length: 90
        },
        () =>
            createParticle()
    );


animateParticles();


/* =========================================================
   OPEN MY HEART
========================================================= */

async function revealLove() {

    if (revealed) {
        return;
    }


    revealed = true;


    /* -----------------------------------------
       DISABLE BUTTON
    ----------------------------------------- */

    if (revealBtn) {

        revealBtn.disabled = true;

        revealBtn.style.pointerEvents =
            "none";

        revealBtn.style.opacity =
            "0";

        revealBtn.style.transform =
            "scale(0.8)";

    }


    /* -----------------------------------------
       HIDE SCROLL HINT
    ----------------------------------------- */

    if (scrollHint) {

        scrollHint.style.opacity =
            "0";

        scrollHint.style.pointerEvents =
            "none";

    }


    /* -----------------------------------------
       MUSIC
    ----------------------------------------- */

    if (bgMusic) {

        try {

            await bgMusic.play();

        }

        catch (error) {

            console.log(
                "Music error:",
                error
            );

        }

    }


    /* -----------------------------------------
       DRAMATIC PAUSE
    ----------------------------------------- */

    await wait(700);


    /* -----------------------------------------
       HIDE INTRO
    ----------------------------------------- */

    const intro =
        document.getElementById("intro");


    if (intro) {

        intro.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        intro.style.opacity =
            "0";

        intro.style.transform =
            "scale(0.95)";

    }


    await wait(800);


    /* -----------------------------------------
       SHOW FINAL
    ----------------------------------------- */

    if (finalReveal) {

        finalReveal.classList.remove(
            "hidden"
        );

    }


    /* -----------------------------------------
       HEART EXPLOSION
    ----------------------------------------- */

    createHeartBurst();


    /* -----------------------------------------
       SCROLL TO FINAL
    ----------------------------------------- */

    setTimeout(
        () => {

            if (finalReveal) {

                finalReveal.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });

            }

        },
        250
    );

}


/* =========================================================
   REVEAL BUTTON
========================================================= */

if (revealBtn) {

    revealBtn.addEventListener(
        "click",
        revealLove
    );

}


/* =========================================================
   MOBILE SWIPE UP
========================================================= */

document.addEventListener(
    "touchstart",
    function (event) {

        if (
            !event.touches ||
            !event.touches.length
        ) {

            return;

        }


        touchStartY =
            event.touches[0].clientY;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function (event) {

        if (
            !event.changedTouches ||
            !event.changedTouches.length
        ) {

            return;

        }


        const touchEndY =
            event.changedTouches[0].clientY;


        const difference =
            touchStartY -
            touchEndY;


        if (
            difference > 80 &&
            websiteStarted &&
            !revealed
        ) {

            revealLove();

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   HEART BURST
========================================================= */

function createHeartBurst() {

    if (!canvas) {
        return;
    }


    for (
        let i = 0;
        i < 55;
        i++
    ) {

        const p =
            createParticle();


        p.x =
            window.innerWidth / 2 +
            (Math.random() - 0.5) * 260;


        p.y =
            window.innerHeight / 2 +
            (Math.random() - 0.5) * 180;


        p.speed =
            Math.random() * 2.5 + 1;


        p.opacity =
            0.9;


        particles.push(p);

    }

}


/* =========================================================
   WAIT FUNCTION
========================================================= */

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "❤️ Love Reveal Website Ready"
);

console.log(
    "🎵 Start Screen Music System Ready"
);

console.log(
    "💗 Neon Heart System Ready"
);

console.log(
    "👆 Swipe Reveal Ready"
);

console.log(
    `💌 Prepared for: ${LOVE_NAME}`
);
