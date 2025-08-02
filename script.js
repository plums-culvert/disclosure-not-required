document.addEventListener("DOMContentLoaded", () => {
  const scroller = scrollama();

  const chapterMeta = {
    "0": { number: "", title: "Disclosure Not Required" },
    "1": { number: "Sighting One", title: "A Close, Bright, Moving, Orange Orb" },
    "2": { number: "Sighting Two", title: "A Bright, Hovering, Dynamic Orb" },
    "3": { number: "Sighting Three", title: "A Flashing, Fast Moving Object" },
    "4": { number: "Sighting Four", title: "A Bright, Fast, and U-Turning Orb" },
    "5": { number: "Sighting Five", title: "A Small, Hovering, Dim Orb" }
  };

  const numberEl = document.querySelector("#graphic .chapter-number");
  const titleEl = document.querySelector("#graphic .chapter-title");

  // Setup scrollama and chain event
  scroller
    .setup({
      step: "#scrolly .step",
      offset: 0.6,
      debug: false
    })
    .onStepEnter(({ element }) => {
      const stepData = element.getAttribute("data-step");
      const meta = chapterMeta[stepData];
      if (meta) {
        numberEl.textContent = meta.number;
        titleEl.textContent = meta.title;
      }
    });

  // Scrollama responds to browser resize
  window.addEventListener("resize", () => {
    scroller.resize();
  });

  // Force resize after all images load
  const images = document.querySelectorAll("img");
  let loadedCount = 0;
  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === images.length) {
          scroller.resize();
        }
      });
    }
  });
  if (loadedCount === images.length) {
    scroller.resize();
  }

  // Restore default title at top
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      numberEl.innerHTML = "&nbsp;";
      titleEl.textContent = "Disclosure Not Required";
    }
  }, { threshold: 1.0 });

  observer.observe(document.getElementById("scroll-top-sentinel"));
});
