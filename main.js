let navbar = document.querySelector('.navbar');
let links = document.querySelectorAll('.nav-link');
let logonavbar = document.querySelector('logoyellow');

console.log(logoyellow);


window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;

   

    if (scrolled > 0) {
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        navbar.style.height = '70px';
        links.forEach((link) => {
         link.style.color = 'var(--black)';   
        });
       logoyellow.src = 'http://127.0.0.1:5500/mediap/black.png'
    }else{
        navbar.classList.add('bg-black');
        navbar.classList.remove('bg-yellow');
        navbar.style.height = '140px';
         links.forEach((link) => {
         link.style.color = 'var(--yellow)';   
        });
        logoyellow.src = 'http://127.0.0.1:5500/mediap/logoyellow.png'
    }
});


  



