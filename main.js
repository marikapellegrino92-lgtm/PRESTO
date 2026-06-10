let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logonavbar = document.querySelector('#logonavbar');
let spadayellow = document.querySelector('#spadayellow');
let collapse = document.querySelector('#collapse');
let check = false;

window.addEventListener('scroll', () => {
  let scrolled = window.scrollY;

  if (scrolled > 0) {
    navbar.classList.remove('bg-black');
    navbar.classList.add('bg-yellow');
    collapse.classList.remove('bg-black');
    collapse.classList.add('bg-yellow');
    navbar.style.height = '70px';

    links.forEach((link) => {
      link.style.color = 'var(--black)';
    });

    logonavbar.src = 'http://127.0.0.1:5500/mediap/black.png';
    spadayellow.src = 'http://127.0.0.1:5500/mediap/spadablack.png';
  } else {
    navbar.classList.add('bg-black');
    navbar.classList.remove('bg-yellow');
    collapse.classList.add('bg-black');
    collapse.classList.remove('bg-yellow');
    navbar.style.height = '140px';

    links.forEach((link) => {
      link.style.color = 'var(--yellow)';
    });

    logonavbar.src = 'http://127.0.0.1:5500/mediap/logoyellow.png';
    spadayellow.src = 'http://127.0.0.1:5500/mediap/spadayellow.png';
  }
});

spadayellow.addEventListener('click', () => {
  if (!check) {
    spadayellow.style.transform = 'rotate(-90deg)';
    check = true;
  } else {
    spadayellow.style.transform = 'rotate(0deg)';
    check = false;
  }
});

let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');
let confirm = true;

function createInterval(n, element, time) {
  let counter = 0;
  let interval = setInterval(() => {
    if (counter < n) {
      counter++;
      element.innerHTML = counter;
    } else {
      clearInterval(interval);
    }
  }, time);

  setTimeout(() => {
    confirm = true;
  }, 8000);
}

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && confirm) {
      createInterval(100, firstNumber, 100);
      createInterval(200, secondNumber, 50);
      createInterval(300, thirdNumber, 20);
      confirm = false;
    }
  });
});

// se per qualche motivo firstNumber non esiste, evitiamo errori
if (firstNumber) {
  observer.observe(firstNumber);
}

let reviuse = [
  { user: 'matteo', description: 'il piu bel sito di annuncio del mondo', rank: 5 },
  { user: 'alin', description: 'veramente non Sa di niente', rank: 1 },
  { user: 'michael', description: 'mi piace tranne per star trek', rank: 3 },
  { user: 'alina', description: 'star wars è meglio!', rank: 3 },
];

let swiperwapper = document.querySelector('.swiper-wrapper');

reviuse.forEach((recensione) => {

  let slide = document.createElement('div');
  slide.classList.add('swiper-slide');

  slide.innerHTML = `
    <div class="card-review d-flex flex-column justify-content-center align-items-center">
      <p class="lead text-center mb-4">${recensione.description}</p>
      <p class="h4 text-center">${recensione.user}</p>
      <div class="stars d-flex justify-content-center"></div>
    </div>
  `;

  swiperwapper.appendChild(slide);

  let starsBox = slide.querySelector('.stars');

  // ⭐ stelle piene
  for (let i = 1; i <= recensione.rank; i++) {
      let icon = document.createElement('i');
      icon.classList.add('fa-solid', 'fa-star');
      starsBox.appendChild(icon);
  }

  // ☆ stelle vuote
  for (let i = recensione.rank + 1; i <= 5; i++) {
      let icon = document.createElement('i');
      icon.classList.add('fa-regular', 'fa-star');
      starsBox.appendChild(icon);
  }

});

const swiper = new Swiper('.swiper', {
  effect: 'flip',
  grabCursor: true,
  direction: 'horizontal',
  loop: true,
  spaceBetween: 10,
  centeredSlides: true,

  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});
