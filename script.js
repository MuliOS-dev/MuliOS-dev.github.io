(() => {
  const html=document.documentElement;
  const themeButton=document.getElementById("themeToggle");
  const saved=localStorage.getItem("mulios-theme");
  html.dataset.theme=saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark":"light");
  function themeLabel(){ if(themeButton) themeButton.textContent=html.dataset.theme==="dark"?"Light":"Dark"; }
  themeLabel();
  themeButton?.addEventListener("click",()=>{html.dataset.theme=html.dataset.theme==="dark"?"light":"dark";localStorage.setItem("mulios-theme",html.dataset.theme);themeLabel();});

  const supported=["en","fr-FR","nb-NB","ru-RU","sv-SE","vi-VN"];
  const labels={en:"English","fr-FR:"Français", "nb-NB":"Norsk","ru-RU":"Русский","sv-SE":"Svenska","vi-VN":"Tiếng Việt"};
  const current=location.pathname.split("/").filter(Boolean).find(x=>supported.includes(x)) || "en";
  const switcher=document.querySelector(".language-switcher"), toggle=document.querySelector(".lang-toggle"), menu=document.querySelector(".lang-menu"), currentLabel=document.querySelector(".lang-current");
  if(currentLabel) currentLabel.textContent=labels[current]||"English";
  document.querySelectorAll(".lang-option").forEach(b=>{b.classList.toggle("active",b.dataset.locale===current);b.addEventListener("click",()=>{location.href=b.dataset.locale==="en"?(current==="en"?"index.html":"../index.html"):(current==="en"?b.dataset.locale+"/index.html":"../"+b.dataset.locale+"/index.html")})});
  toggle?.addEventListener("click",e=>{e.stopPropagation();switcher?.classList.toggle("open")});
  document.addEventListener("click",()=>switcher?.classList.remove("open"));

  const nav=document.querySelector("header"); window.addEventListener("scroll",()=>nav?.classList.toggle("scrolled",scrollY>8),{passive:true});
  const links=[...document.querySelectorAll(".nav-links a")], sections=[...document.querySelectorAll("section[id]")];
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-35% 0px -55%"});
  sections.forEach(s=>io.observe(s));
})();