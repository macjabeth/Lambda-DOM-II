// mouseover - add hover events to links
document.querySelectorAll('.nav > .nav-link').forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.textDecoration = 'underline';
  });

  link.addEventListener('mouseout', event => {
    link.style.textDecoration = '';
  });
});

const images = document.getElementsByTagName('img');
const paragraphs = document.getElementsByTagName('p');

// keydown - rotate paragraphs
document.addEventListener('keydown', event => {
  if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;

  const num = event.key === 'ArrowRight' ? 10 : -10;
  const rotation = Number(paragraphs[0].style.transform.match(/-?\d+/));
  const newRotation = rotation + num;

  for (const paragraph of paragraphs) {
    paragraph.style.transform = `rotate(${newRotation}deg)`;
  }
});

// wheel - scale images
let scale = 1;

const zoom = el => event => {
  event.preventDefault();

  scale += event.deltaY * -0.01;

  // Restrict scale
  scale = Math.min(Math.max(.125, scale), 4);

  // Apply scale transform
  el.style.transform = `scale(${scale})`;
};

for (const image of images) {
  image.addEventListener('wheel', zoom(image));
}

// drag / drop
document.querySelectorAll('div').forEach(div => {
  div.classList.add('dropzone');
});

let dragged;

/* events fired on the draggable target */
document.addEventListener('drag', function (event) {

}, false);

document.addEventListener('dragstart', function (event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = .5;
}, false);

document.addEventListener('dragend', function (event) {
  // reset the transparency
  event.target.style.opacity = '';
}, false);

/* events fired on the drop targets */
document.addEventListener('dragover', function (event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener('dragenter', function (event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.classList.contains('dropzone')) {
    event.target.style.background = 'purple';
  }

}, false);

document.addEventListener('dragleave', function (event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.classList.contains('dropzone')) {
    event.target.style.background = '';
  }

}, false);

document.addEventListener('drop', function (event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged elem to the selected drop target
  if (event.target.classList.contains('dropzone')) {
    event.target.style.background = '';
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
}, false);