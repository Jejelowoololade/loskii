const themeToggle=document.getElementById("themeToggle");const menuToggle=document.getElementById("menuToggle");const nav=document.querySelector(".desktop-nav");themeToggle?.addEventListener("click",()=>{document.body.classList.toggle("dark");themeToggle.innerHTML=document.body.classList.contains("dark")?'<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>':'<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.6 8.6 0 0 1 8.6 3.8 8.8 8.8 0 1 0 20.2 15.4Z"/></svg>'});menuToggle?.addEventListener("click",()=>{const isOpen=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(isOpen));menuToggle.innerHTML=isOpen?'<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>':'<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'});nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");if(menuToggle)menuToggle.innerHTML='<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'}));

// Smooth, single-open services accordion with animated open and close
document.querySelectorAll(".service-trigger").forEach((trigger)=>{
  trigger.addEventListener("click",()=>{
    const item=trigger.closest(".service-item");
    const panel=document.getElementById(trigger.getAttribute("aria-controls"));
    const shouldOpen=trigger.getAttribute("aria-expanded")!=="true";
    document.querySelectorAll(".service-trigger").forEach((other)=>{
      const otherPanel=document.getElementById(other.getAttribute("aria-controls"));
      const otherItem=other.closest(".service-item");
      other.setAttribute("aria-expanded","false");
      if(otherPanel && !otherPanel.hidden){
        otherPanel.hidden=false;
        otherItem.classList.remove("is-open");
        otherPanel.addEventListener("transitionend",(event)=>{
          if(event.propertyName==="grid-template-rows" && !otherItem.classList.contains("is-open")) otherPanel.hidden=true;
        },{once:true});
      }else{
        otherItem.classList.remove("is-open");
      }
    });
    if(shouldOpen){
      trigger.setAttribute("aria-expanded","true");
      panel.hidden=false;
      item.classList.add("is-open");
    }
  });
});
