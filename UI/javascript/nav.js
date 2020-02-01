const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const Links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', ()=>{
    navLinks.classList.toggle("open");
    Links.forEach(link =>{
        link.classList.toggle("fade");
    })
});
