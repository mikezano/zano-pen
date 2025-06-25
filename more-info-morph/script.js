document.getElementById("red").addEventListener('click',async()=>{
  const transition = document.startViewTransition(()=>{
      console.log("red")
      const el = document.getElementById("blue");
      el.style.display = "block";
  })
  await transition.ready;
})

document.getElementById("blue").addEventListener('click', async(e)=>{
  const transition = document.startViewTransition(()=>{
    e.target.style.display = "none";
  });
  await transition.ready;
});