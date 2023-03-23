//toggle icon navbar

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

//scroll sections active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    };
  });

  //sticky navbar
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  //remove toggle icon and navbar when click navbar Link (scroll)

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
  
};

//scroll reveal
ScrollReveal({
  //reset: true,
  distance: '60px',
  duration: 2000,
  delay: 100
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .home-content p, .about-content, .about-img', { origin: 'left' });


//typed js

const typed = new Typed('.multiple-text', {
  strings: ['Frontend Developer', 'an Energy Engineer', 'a Jack of all Trades'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,

})

//send message
let sendMessage = document.querySelector('.sendMessage');
let thankMessages = document.querySelector('.thankMessages');
let formInput = document.querySelectorAll('.formInput');

function validateForm(message) {

  document.querySelectorAll('.errorValidInput').forEach((err) => {
    err.remove();
  });

  formInput.forEach((input) => {
    const inputName = input.firstElementChild;
    if(inputName.value === '') {
      const p = document.createElement('p');
      p.classList.add('errorValidInput')
      p.innerHTML = `Enter field ${inputName.name}`;
      input.appendChild(p);
    }
  })

  if(message.name !== '' && message.email !== '' && message.mobileNumber !== '' && message.EmailSubject !== '' && message.message !== '') {

    sendMessage.style.display='none';
    thankMessages.classList.toggle('active');
    sendMessage.reset();
    
   setTimeout(function(){
    thankMessages.classList.toggle('active');
    sendMessage.style.display='block';
   }, 5000);
   return true;
  }

}


const token = '5980873383:AAE0b33PQPpMvpD39fmD1Rw6A2IcOKKAMmA';
const chatId = '-940990599';


sendMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = Object.fromEntries(new FormData(e.target));
  if(validateForm(message)) {
    let text = '';
    for(const [key, values] of Object.entries(message)) {
      text += `${key}: ${values}, \n`;
    }
    text = encodeURI(text);
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${text}`)
  }
});