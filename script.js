const menuToggle=document.getElementById("menuToggle");const nav=document.querySelector(".desktop-nav");menuToggle?.addEventListener("click",()=>{const isOpen=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(isOpen));menuToggle.innerHTML=isOpen?'<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>':'<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'});nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");if(menuToggle)menuToggle.innerHTML='<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'}));

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


// Reveal the About section gently as it enters the viewport
const aboutRevealItems=document.querySelectorAll(".about-reveal");
if("IntersectionObserver" in window){
  const aboutObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.16});
  aboutRevealItems.forEach((item)=>aboutObserver.observe(item));
}else{
  aboutRevealItems.forEach((item)=>item.classList.add("is-visible"));
}


// FAQ accordion: one answer open at a time with smooth close transitions
 document.querySelectorAll(".faq-trigger").forEach((trigger)=>{
  trigger.addEventListener("click",()=>{
    const item=trigger.closest(".faq-item");
    const panel=document.getElementById(trigger.getAttribute("aria-controls"));
    const shouldOpen=trigger.getAttribute("aria-expanded")!=="true";
    document.querySelectorAll(".faq-trigger").forEach((other)=>{
      const otherPanel=document.getElementById(other.getAttribute("aria-controls"));
      const otherItem=other.closest(".faq-item");
      other.setAttribute("aria-expanded","false");
      if(otherPanel && !otherPanel.hidden){
        otherItem.classList.remove("is-open");
        otherPanel.addEventListener("transitionend",(event)=>{
          if(event.propertyName==="grid-template-rows" && !otherItem.classList.contains("is-open")) otherPanel.hidden=true;
        },{once:true});
      }else otherItem.classList.remove("is-open");
    });
    if(shouldOpen){trigger.setAttribute("aria-expanded","true");panel.hidden=false;item.classList.add("is-open");}
  });
});


// Keep the navbar highlight in sync with the visible page section
const sectionNavLinks=[...document.querySelectorAll('.desktop-nav a[href^="#"]')];
const navSections=sectionNavLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if("IntersectionObserver" in window){
 const navObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){
    sectionNavLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
   }
  });
 },{rootMargin:"-28% 0px -58% 0px",threshold:0});
 navSections.forEach(section=>navObserver.observe(section));
}
