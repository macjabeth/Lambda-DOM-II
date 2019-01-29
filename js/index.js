// selectors
const navLinks = document.getElementsByClassName('nav-link');
const windowDivs = document.querySelectorAll('div');
const [ contactForm ] = document.getElementsByClassName('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const footerText = document.querySelector('footer p');
const arrowTop = document.getElementById('arrowTop');
const buttons = document.querySelectorAll('.btn');

// nav hover decoration
Array.from(navLinks).forEach(nav => {
  nav.addEventListener('click', (event) => event.preventDefault());
  nav.addEventListener('mouseover', ({ target }) => {
    target.style.textDecoration = 'underline';
  });
  nav.addEventListener('mouseout', ({ target }) => {
    target.style.textDecoration = 'none';
  });
});

// arrow key rotation
(() => {
  let x = 0;
  let y = 0;
  document.addEventListener('keydown', (event) => {
    let fired;

    switch (event.code) {
      case 'ArrowUp':
        x += 7;
        fired = true;
        break;
      case 'ArrowDown':
        x -= 7;
        fired = true;
        break;
      case 'ArrowLeft':
        y -= 7;
        fired = true;
        break;
      case 'ArrowRight':
        y += 7;
        fired = true;
        break;
      default:
        fired = false;
        break;
    }

    if (fired) {
      windowDivs.forEach(node => {
        node.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
        event.preventDefault();
      });
    }
  });
})();

// draggable elements
(() => {
  let element;
  /* events fired on the draggable target */
  document.addEventListener('drag', function (event) {
  });

  document.addEventListener('dragstart', function (event) {
    // store a ref. on the dragged elem
    element = event.target;
    // make it half transparent
    event.target.style.opacity = 0.5;
  });

  document.addEventListener('dragend', function (event) {
    // reset the transparency
    event.target.style.opacity = '';
  });

  /* events fired on the drop targets */
  document.addEventListener('dragover', function (event) {
    // prevent default to allow drop
    event.preventDefault();
  });

  document.addEventListener('dragenter', function (event) {
    // highlight potential drop target when the draggable element enters it
    event.target.style.background = 'purple';
  });

  document.addEventListener('dragleave', function (event) {
    // reset background of potential drop target when the draggable element leaves it
    event.target.style.background = '';
  });

  document.addEventListener('drop', function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    event.target.style.background = '';
    element.parentNode.removeChild(element);
    event.target.appendChild(element);
  });
})();

// for the lulz
window.addEventListener('load', () => {
  console.log('Keylogger injected.');
});

// focus borders
window.addEventListener('focus', (event) => { document.body.style.opacity = '1'; });
window.addEventListener('blur', (event) => { document.body.style.opacity = '0.5'; });

// random colour on dblclick
window.addEventListener('dblclick', (event) => {
  if (event.target !== nameInput && event.target !== emailInput) {
    let rgb = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    document.body.style.background = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }
});

// echo form input
contactForm.addEventListener('submit', (event) => {
  const name = nameInput.value;
  const email = emailInput.value;

  footerText.textContent = `Thanks ${name}! We'll be sure to send ${email} lots of emails. ;)`;

  event.preventDefault();
});

// selecting input text
function logSelection (event) {
  const selection = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);
  footerText.textContent = `You selected: ${selection}`;
}

// handle scroll-to-top
arrowTop.addEventListener('click', () => {
  window.scrollTo(pageXOffset, 0);
  // after scrollTo, there will be a "scroll" event, so the arrow will hide automatically
});

window.addEventListener('scroll', () => {
  arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
});

// prevent wheel scrolling
window.addEventListener('wheel', (event) => event.preventDefault());

nameInput.addEventListener('select', logSelection);
emailInput.addEventListener('select', logSelection);

// stop btn propogation
buttons.forEach(btn => {
  btn.addEventListener('dblclick', (event) => {
    event.target.style.transform = 'scale(1.1)';
    event.stopPropagation();
  });
});

// animations

// fade in
TweenLite.to(document.body, 1, { opacity: 1 });
