'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const scroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const h1 = document.querySelector('h1');
const navLink = document.querySelectorAll('.nav__link');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const signUp = document.querySelector('.section--sign-up');
const signUpButton = document.querySelector('#logo');
const nav = document.querySelector('.nav');
const section = document.querySelectorAll('.section ');
const img = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide ');
const slider = document.querySelector('.slider ');
const btnRyt = document.querySelector('.slider__btn--right ');
const btnLft = document.querySelector('.slider__btn--left ');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  e.preventDefault();
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// scroll feature

scroll.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// scroll on click on nav
navLink.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// tab feature implementation

tabContainer.addEventListener('click', function (el) {
  const clicked = el.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(function (el) {
    el.classList.remove('operations__tab--active');
  });

  clicked.classList.add('operations__tab--active');

  tabContent.forEach(function (el) {
    el.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// sticky behavior

window.addEventListener('scroll', function () {
  const windowPos = window.scrollY;
  // console.log(windowPos);
  const section1Cords = section1.getBoundingClientRect();
  // console.log(section1Cords);
  if (windowPos > section1Cords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

// reveal sections on scroll

const revealSection = function (enteries, observer) {
  const [entry] = enteries;

  entry.target.classList.remove('section--hidden');
  if (!entry.IsIntersecting) return;
  observer.unobserve(entry.target);
};
const opt = { root: null, threshold: 0.15 };
const sectionObserver = new IntersectionObserver(revealSection, opt);
section.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading images
const revealImg = function (enteries, observer) {
  const [entry] = enteries;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const opt2 = {
  root: null,
  threshold: 0.7,
};
const imgObserver = new IntersectionObserver(revealImg, opt2);
img.forEach(function (img) {
  imgObserver.observe(img);
});

// slider
let curSlide = 0;
const maxSlide = slides.length;
slides.forEach(function (s, i) {
  s.style.transform = `translateX(${100 * i}%)`;
});

btnRyt.addEventListener('click', function () {
  curSlide++;
  if (curSlide === maxSlide) {
    curSlide = 0;
  }
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
});

btnLft.addEventListener('click', function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  }
  curSlide--;
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
});

// through keyboard
window.addEventListener('keydown', function (e) {
  if (e.key == 'ArrowLeft') {
    if (curSlide === 0) {
      curSlide = maxSlide;
    }
    curSlide--;
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
  }
});

window.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    curSlide++;
    if (curSlide === maxSlide) {
      curSlide = 0;
    }
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
  }
});

// practice section
// const stickyNav = function (enteries) {
//   const [entry] = enteries;
//   console.log(entry);

//   if (!entry.IsIntersecting) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// };
// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: '-90px',
// });
// headerObserver.observe(header);

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'hello there!';
// message.innerHTML =
//   'We use cookies for better fuctionality and enhanced experience<button class="btn btn--close-cookie">got it</button>';
// header.append(message);
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     console.log('clicked');
//     message.remove();
//   });

// message.style.backgroundColor = '#37383d';
// message.style.width = '105%';
// message.style.height = '80px';
// // Number.parseFloat(getComputedStyle('message').height, 10) + 140 + 'px';
// document.documentElement.style.setProperty('--color-primary', 'orange');
// const link = document.querySelector('.nav__link');
// console.log(link.href);
// console.log(link.getAttribute('href'));
// console.log('click');
// const s1cords = section1.getBoundingClientRect();
// console.log(section1.getBoundingClientRect());
// window.scrollTo({
//   left: s1cords.left + window.pageXOffset,
//   top: s1cords.top + window.pageYOffset,
//   behavior: 'smooth',
// });
// const x = function () {
//   alert(`HELLO THERE!`);
// };
// h1.addEventListener('mouseenter', x);
// setTimeout(function () {
//   h1.removeEventListener('mouseenter', x);
// }, 3000);
// signUpButton.addEventListener('click', function (e) {
//   e.preventDefault();
//   signUp.scrollIntoView({ behavior: 'smooth' });
// });
// let y = 0;
// header.addEventListener('click', function (e) {
//   console.log(y++);
// });
