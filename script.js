const html = document.documentElement;
const themeButton = document.getElementById("themeToggle");

/* 
   Theme
*/

const savedTheme = localStorage.getItem("mulios-theme");

if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
} else {

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    html.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
    );

}

updateThemeIcon();

themeButton.addEventListener("click", () => {

    const current = html.getAttribute("data-theme");

    const next = current === "dark"
        ? "light"
        : "dark";

    html.setAttribute("data-theme", next);

    localStorage.setItem("mulios-theme", next);

    updateThemeIcon();

});

function updateThemeIcon(){

    if(html.getAttribute("data-theme")==="dark"){

        themeButton.textContent="☀";

    }else{

        themeButton.textContent="🌙";

    }

}




/* 
   Scroll (tsais le fade là)
*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0px)";

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(
".about-card,.feature-card,.timeline-item,.community-box"
).forEach(element=>{

    element.style.opacity="0";

    element.style.transform="translateY(40px)";

    element.style.transition=".8s ease";

    observer.observe(element);

});

/* 
   Navbar 
*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 20){

        navbar.style.transform="translateY(-2px)";

        navbar.style.boxShadow="0 15px 45px rgba(0,0,0,.15)";

    }

    else{

        navbar.style.transform="translateY(0px)";

        navbar.style.boxShadow="";

    }

});

/* 
   Navigation
*/

const sections = document.querySelectorAll("section");

const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const top = section.offsetTop - 140;

        if(window.scrollY >= top){

            current = section.getAttribute("id");

        }

    });

    links.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});

/* Scroll */
   
 

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* = */

const glow = document.createElement("div");

glow.style.position="fixed";

glow.style.width="350px";

glow.style.height="350px";

glow.style.borderRadius="50%";

glow.style.pointerEvents="none";

glow.style.zIndex="-1";

glow.style.background="radial-gradient(circle, rgba(134,188,65,.12), transparent 70%)";

glow.style.transform="translate(-50%,-50%)";

glow.style.transition="left .15s linear, top .15s linear";

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});

/* = */

const stats = document.querySelectorAll(".hero-stats h2");

stats.forEach(stat=>{

    stat.addEventListener("mouseenter",()=>{

        stat.style.transform="scale(1.08)";

    });

    stat.addEventListener("mouseleave",()=>{

        stat.style.transform="scale(1)";

    });

});



console.log("%cWelcome to MuliOS",
"color:#86bc41;font-size:24px;font-weight:bold;");

console.log(
"Multi Usage Linux Interface"
);

console.log(
"Currently under active development."
);

console.log(
"%cMade by @nevsky-dev on GitHub, for MuliOS",
"color:#3B82F6;font-size:10px;"
);

console.log(
"%cCredits to MuliOS developpers, the GNU/Linux community, and everyone who supports and believes in us !",
"color:#3B82F6;font-size:10px;"
);

console.log(
"%cV1, V2 coming soon with implemented translation.",
"color:#3B82F6;font-size:10px;"
);

const supportedLocales = ["en", "fr-FR", "nb-NB", "ru-RU", "sv-SE", "vi-VN"];
const localeLabels = {
    en: "🌐 English",
    "fr-FR": "🌐 Français",
    "nb-NB": "🌐 Norsk",
    "ru-RU": "🌐 Русский",
    "sv-SE": "🌐 Svenska",
    "vi-VN": "🌐 Tiếng Việt"
};

const langToggle = document.querySelector(".lang-toggle");
const langMenu = document.querySelector(".lang-menu");
const langOptions = document.querySelectorAll(".lang-option");
const langCurrent = document.querySelector(".lang-current");

function getCurrentLocale() {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const localeFromPath = segments.find(segment => supportedLocales.includes(segment));
    if (localeFromPath) {
        return localeFromPath;
    }
    if (window.location.pathname.includes("/fr-FR/")) return "fr-FR";
    if (window.location.pathname.includes("/nb-NB/")) return "nb-NB";
    if (window.location.pathname.includes("/ru-RU/")) return "ru-RU";
    if (window.location.pathname.includes("/sv-SE/")) return "sv-SE";
    if (window.location.pathname.includes("/vi-VN/")) return "vi-VN";
    return "en";
}

function getTargetPath(locale) {
    const currentPath = window.location.pathname;
    const hasLocaleFolder = supportedLocales.some(localeName => currentPath.includes(`/${localeName}/`));

    if (locale === "en") {
        return hasLocaleFolder ? "../index.html" : "./index.html";
    }

    return hasLocaleFolder ? `../${locale}/index.html` : `./${locale}/index.html`;
}

function setActiveLanguage() {
    const currentLocale = getCurrentLocale();
    if (langCurrent) {
        langCurrent.textContent = localeLabels[currentLocale] || localeLabels.en;
    }
    langOptions.forEach(option => {
        option.classList.toggle("active", option.dataset.locale === currentLocale);
    });
}

if (langToggle && langMenu) {
    langToggle.addEventListener("click", () => {
        document.querySelector(".language-switcher")?.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".language-switcher")) {
            document.querySelector(".language-switcher")?.classList.remove("open");
        }
    });

    langOptions.forEach(option => {
        option.addEventListener("click", () => {
            window.location.assign(getTargetPath(option.dataset.locale));
        });
    });
}

setActiveLanguage();
