let tl= gsap.timeline();
tl.from(".nav-left i",{
    x:-50,
    opacity:0,
    duration:0.5,
    delay:0.3
},"sync")
tl.from(".nav-right i, .nav-right button",{
    x:50,
    opacity:0,
    duration:0.5,
    stagger:0.4,
    delay:0.3
},"sync")
tl.from("#sec1 h1, #sec1 p", {
    y:20,
    opacity:0,
    duration:0.5,
    delay:0.3
}, "sync")
tl.from("#smallbox",{
    x:2000,
    duration:2,
    repeat:-1,
    ease:"power2.out"
},"sync2")
tl.from("#suggestions ul", {
    y:100,
    duration:1,
    stagger:0.1,
    opacity:0,
    ease: "back.out"
}, "sync2")
tl.from (".btn2", {
    opacity:0,
    duration:0.3
},"sync2");
let boxes = document.querySelectorAll(".suggestion-box");

boxes.forEach((box) => {
  box.addEventListener("mouseenter", () => {
    gsap.to(box, {
      scale: 1.1,
      duration: 0.3
    });
  });

  box.addEventListener("mouseleave", () => {
    gsap.to(box, {
      scale: 1,
      duration: 0.3
    });
  });
});

