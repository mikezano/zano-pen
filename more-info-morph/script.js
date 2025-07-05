document.getElementById("grid").addEventListener('click',async(el)=>{
  const transition = document.startViewTransition(()=>{
      if(el){
        const color = getComputedStyle(el.target).backgroundColor;
        const zoomEl = document.getElementById("zoom");
        zoomEl.style.backgroundColor = color;
        zoomEl.style.display = "block";
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

