// Basic i18n switch + simple accessibility behaviors
(function(){
  const defaultLang = "ja";
  let current = localStorage.getItem("lang") || defaultLang;

  function translateTo(lang){
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[defaultLang];
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if(dict[key]) el.textContent = dict[key];
    });
    // title special
    if(dict["title"]) document.title = dict["title"];
    localStorage.setItem("lang", lang);
    current = lang;
  }

  // wire buttons
  document.querySelectorAll(".lang-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> {
      translateTo(btn.getAttribute("data-lang"));
    });
  });

  // initial translate
  translateTo(current);

  // Small enhancement: smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", function(e){
      const target = document.querySelector(this.getAttribute("href"));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
      }
    });
  });
})();
