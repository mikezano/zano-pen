document.getElementById("grid").addEventListener('click',async(el)=>{
  const transition = document.startViewTransition(()=>{

      //const el = document.getElementById("blue");
      //el.style.display = "block";
      if(el){
        const color = getComputedStyle(el.target).backgroundColor;
        const zoomEl = document.getElementById("zoom");
        zoomEl.style.backgroundColor = color;
        zoomEl.style.display = "block";
        console.log(`color: ${color}, zoomEl: ${zoomEl}`);
        console.log(zoomEl);
        console.log(el.target.getBoundingClientRect());
      }
  })
  await transition.ready;
})

document.getElementById("zoom").addEventListener('click', async(e)=>{
  const transition = document.startViewTransition(()=>{
    e.target.style.display = "none";
  });
  await transition.ready;
});

