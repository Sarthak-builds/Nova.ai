let tl2= gsap.timeline();
let form= document.querySelector(".prompt-form");
let animationPlayed = false;
form.addEventListener("submit",()=>{
     if (animationPlayed) {
        return;}
  animationPlayed = true;
    tl2.to("body2",{
        overflow:"hidden"
    })
tl2.to("#sec1 h1", {
  y:-100,
  scale:0.8,
  duration:0.5
}, "sync10")
tl2.to(".chats-container", {
  y:-80
  
}, "sync10")
tl2.to("#sec1 p", {
  y:-100,
  scale:0.8,
  duration:0.5
}, "sync10")
tl2.to(".bot2",{
    y:-310,
    duration:2,
    delay:2,
    ease:"back.out",
    yoyo:true,
    repeat:-1,
    repeatDelay:1
})

});