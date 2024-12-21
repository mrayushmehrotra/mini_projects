var iniPath = `M 10 100 Q 500 100 990 100`

var finPath = `M 10 100 Q 500 100 990 100`

var str = document.querySelector("#string") 

str.addEventListener('mousemove', (dets)=>{
    path = `M 10 100 Q  ${dets.x} ${dets.y - 100} 990 100`
    gsap.to("svg path", {
        // for changing an attribute in gsap the attr is used 
        // attr is for targeting attribute and d is the attribute and here path is the my variable from which i'm swapping the d 
        attr:{d:path},
        duration: 0.8,
        ease:'power3.out'
    })
})

str.addEventListener('mouseleave', ()=>{
    gsap.to('svg path', {
        attr:{d:finPath},
        duration:0.8,
        ease:'elastic.out(1,0.2)'
    })
})