const themeToggle=document.getElementById("themeToggle");const menuToggle=document.getElementById("menuToggle");const nav=document.querySelector(".desktop-nav");themeToggle?.addEventListener("click",()=>{document.body.classList.toggle("dark");themeToggle.textContent=document.body.classList.contains("dark")?"☀":"☾"});menuToggle?.addEventListener("click",()=>{const isOpen=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(isOpen));menuToggle.textContent=isOpen?"×":"☰"});nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");if(menuToggle)menuToggle.textContent="☰"}));

// Smooth, single-open services accordion
document.querySelectorAll(".service-trigger").forEach((trigger)=>{
  trigger.addEventListener("click",()=>{
    const item=trigger.closest(".service-item");
    const panel=document.getElementById(trigger.getAttribute("aria-controls"));
    const shouldOpen=trigger.getAttribute("aria-expanded")!=="true";
    document.querySelectorAll(".service-trigger").forEach((other)=>{
      const otherPanel=document.getElementById(other.getAttribute("aria-controls"));
      const otherItem=other.closest(".service-item");
      other.setAttribute("aria-expanded","false");
      otherItem.classList.remove("is-open");
      if(otherPanel) otherPanel.hidden=true;
    });
    if(shouldOpen){
      trigger.setAttribute("aria-expanded","true");
      item.classList.add("is-open");
      panel.hidden=false;
    }
  });
});
