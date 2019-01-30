const blocks = document.querySelectorAll('.block');

let addX = (x) => x + 1;
let subX = (x) => x - 1;

blocks.forEach(block => {
  let x = 0;
  let blockID;
  let handleX;

  block.addEventListener('mouseover', (event) => {
    handleX = addX;
    if (!blockID) {
      blockID = setInterval(() => {
        x = handleX(x);
        event.target.style.transform = `translateX(${x}px)`;
        if (x === 0) {
          clearInterval(blockID);
          blockID = null;
        }
      }, 10);
    }
  });

  block.addEventListener('mouseout', (event) => { handleX = subX; });
});
