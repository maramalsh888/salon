/* =====================================================
   LUMÉ STUDIO — JAVASCRIPT
===================================================== */


/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("loaded");

    }, 700);

});



/* =====================================================
   HEADER
===================================================== */

const header =
    document.querySelector(".site-header");


function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();



/* =====================================================
   MOBILE MENU
===================================================== */

const mobileButton =
    document.querySelector(
        ".mobile-menu-button"
    );

const mobileNav =
    document.querySelector(
        ".mobile-nav"
    );

const mobileLinks =
    document.querySelectorAll(
        ".mobile-nav a"
    );


if (mobileButton && mobileNav) {

    mobileButton.addEventListener(
        "click",
        () => {

            mobileNav.classList.toggle(
                "open"
            );

            document.body.classList.toggle(
                "menu-open"
            );

        }
    );

}


mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mobileNav.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }
    );

});



/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(
            element
        );

    });

} else {

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

}



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


if (
    "IntersectionObserver" in window &&
    sections.length
) {

    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.getAttribute(
                                "id"
                            );


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) === `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    }

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        navObserver.observe(
            section
        );

    });

}



/* =====================================================
   GALLERY FILTER
===================================================== */

const galleryFilters =
    document.querySelectorAll(
        ".gallery-filter"
    );

const galleryItems =
    Array.from(
        document.querySelectorAll(
            ".gallery-item"
        )
    );


galleryFilters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            const selected =
                filter.dataset.filter;


            /* Active filter */

            galleryFilters.forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            filter.classList.add(
                "active"
            );


            /* Filter gallery */

            galleryItems.forEach(item => {

                const category =
                    item.dataset.category;


                if (
                    selected === "all" ||
                    category === selected
                ) {

                    item.classList.remove(
                        "hidden"
                    );

                } else {

                    item.classList.add(
                        "hidden"
                    );

                }

            });

        }
    );

});



/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxCategory =
    document.getElementById(
        "lightboxCategory"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxClose =
    document.querySelector(
        ".lightbox-close"
    );


let savedScrollPosition = 0;



galleryItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            if (
                item.classList.contains(
                    "hidden"
                )
            ) {

                return;

            }


            const image =
                item.querySelector(
                    "img"
                );


            const category =
                item.querySelector(
                    ".gallery-overlay span"
                );


            const title =
                item.querySelector(
                    ".gallery-overlay strong"
                );


            if (!image) return;


            lightboxImage.src =
                image.currentSrc ||
                image.src;


            lightboxImage.alt =
                image.alt;


            lightboxCategory.textContent =
                category
                    ? category.textContent
                    : "";


            lightboxTitle.textContent =
                title
                    ? title.textContent
                    : "";


            /*
               Save the current scroll position
               so the page returns to exactly
               where the visitor was.
            */

            savedScrollPosition =
                window.scrollY;


            /*
               Completely lock the page behind
               the lightbox.
            */

            document.body.style.position =
                "fixed";

            document.body.style.top =
                `-${savedScrollPosition}px`;

            document.body.style.left =
                "0";

            document.body.style.right =
                "0";

            document.body.style.width =
                "100%";

            document.body.style.overflow =
                "hidden";


            lightbox.classList.add(
                "open"
            );

        }
    );

});



/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );


    document.body.style.position =
        "";

    document.body.style.top =
        "";

    document.body.style.left =
        "";

    document.body.style.right =
        "";

    document.body.style.width =
        "";

    document.body.style.overflow =
        "";


    window.scrollTo(
        0,
        savedScrollPosition
    );

}



if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /*
       Prevent scrolling while the
       lightbox is open.
    */

    lightbox.addEventListener(
        "wheel",
        event => {

            event.preventDefault();

        },
        {
            passive: false
        }
    );


    lightbox.addEventListener(
        "touchmove",
        event => {

            event.preventDefault();

        },
        {
            passive: false
        }
    );

}



/* Escape key */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains(
                "open"
            )
        ) {

            closeLightbox();

        }

    }
);



/* =====================================================
   BOOKING FORM — WHATSAPP
===================================================== */


/*
   Lumé Studio WhatsApp number.

   IMPORTANT:
   International format only.
   No + sign.
   No spaces.
   No leading 0.
*/

const whatsappNumber =
    "967770086747";


const bookingForm =
    document.getElementById(
        "bookingForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /* =========================================
               GET FORM VALUES
            ========================================= */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const service =
                document
                    .getElementById("service")
                    .value;


            const date =
                document
                    .getElementById("date")
                    .value;


            const time =
                document
                    .getElementById("time")
                    .value;


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();



            /* =========================================
               VALIDATE
            ========================================= */

            if (
                !name ||
                !phone ||
                !service ||
                !date ||
                !time
            ) {

                formMessage.textContent =
                    "Please complete all required fields.";

                return;

            }



            /* =========================================
               FORMAT DATE
            ========================================= */

            const dateObject =
                new Date(
                    date + "T00:00:00"
                );


            const formattedDate =
                dateObject.toLocaleDateString(
                    "en-US",
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                );



            /* =========================================
               CREATE WHATSAPP MESSAGE
            ========================================= */

            const whatsappMessage =
`Hello Lumé Studio! ✨

I'd like to request an appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred date: ${formattedDate}
Preferred time: ${time}

${message
    ? `Additional details: ${message}`
    : "No additional details."}

Thank you!`;



            /* =========================================
               ENCODE MESSAGE
            ========================================= */

            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );



            /* =========================================
               CREATE WHATSAPP URL
            ========================================= */

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;



            /* =========================================
               WEBSITE MESSAGE
            ========================================= */

            formMessage.textContent =
                "Opening WhatsApp...";



            /* =========================================
               OPEN WHATSAPP
            ========================================= */

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}



/* =====================================================
   DATE — PREVENT PAST DATES
===================================================== */

const dateInput =
    document.getElementById(
        "date"
    );


if (dateInput) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    dateInput.min =
        today;

}



/* =====================================================
   PHONE INPUT
===================================================== */

const phoneInput =
    document.getElementById(
        "phone"
    );


if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        () => {

            phoneInput.value =
                phoneInput.value.replace(
                    /[^0-9+ ]/g,
                    ""
                );

        }
    );

}



/* =====================================================
   IMAGE FALLBACK
=====================================================

   If an external image fails to load,
   use a neutral salon image instead.
===================================================== */

document.addEventListener(
    "error",
    event => {

        const image =
            event.target;


        if (
            image.tagName !== "IMG" ||
            image.dataset.fallback === "true"
        ) {

            return;

        }


        image.dataset.fallback =
            "true";


        image.classList.add(
            "image-error"
        );


        image.src =
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80";

    },
    true
);



/* =====================================================
   SCROLL PROGRESS
===================================================== */

const progress =
    document.querySelector(
        ".scroll-progress"
    );


function updateProgress() {

    if (!progress) return;


    const scrollTop =
        window.scrollY;


    const scrollHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    const percentage =
        scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;


    progress.style.width =
        `${percentage}%`;

}


window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
);


updateProgress();



/* =====================================================
   SMOOTH ANCHOR OFFSET
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute(
                    "href"
                );


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect()
                    .top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});