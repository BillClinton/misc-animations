let started = false;
let scale, timing, leafSize;

document.addEventListener('DOMContentLoaded', (event) => {
  const style = getComputedStyle(document.body);
  scale = parseInt(style.getPropertyValue('--scale'), 10);
  timing = parseInt(style.getPropertyValue('--timing'), 10);
  leafSize = parseInt(style.getPropertyValue('--leaf-size'), 10);
});

const potClick = () => {
  if (!started) {
    started = true;
    growMe();
  }
};

const growMe = () => {
  const trunk = document.getElementById('trunk');
  trunk.classList.add('trunk-animation');

  const branches = document.querySelectorAll('.branch');
  const interval = 0.2;
  let delay = 0;

  branches.forEach((branch) => {
    delay = delay + interval;
    if (branch.classList.contains('branch-left')) {
      branch.style.animation = `grow-branch-right ${timing}s ${delay}s both`;
    } else {
      branch.style.animation = `grow-branch-left ${timing}s ${delay}s both`;
    }
    sprout(branch, delay);
  });
};

const sprout = (branch, delay) => {
  const branchHeight = branch.offsetHeight;
  const spacing = (leafSize * scale) / 2;

  let top = scale * leafSize * -1.5;
  let rightSide = true;

  delay = delay + timing;

  while (top < branchHeight - leafSize * scale * 2) {
    const clone = document.getElementById('leaf01').cloneNode(true);
    const id = 'leaf-' + Math.random().toString(36).substr(2, 7);

    clone.id = id;
    branch.appendChild(clone);
    top = top + spacing;
    delay = delay - 0.1;
    if (rightSide) {
      clone.classList.add('leaf-right');
      clone.style.left = '0px';
      clone.style.animation = 'none';
      clone.style.animation = `grow-leaf ${timing}s ${delay}s both`;
      rightSide = false;
    } else {
      clone.classList.add('leaf-left');
      clone.style.right = '0px';
      clone.style.animation = 'none';

      clone.style.animation = `grow-leaf ${timing}s ${delay}s both`;
      rightSide = true;
    }
    clone.style.display = 'block';
    clone.style.top = top + 'px';
    clone.addEventListener('mouseover', () => {
      clone.style.animation = `wiggle-leaf 3s 0s infinite ease`;
      clone.style.animationPlayState = 'running';
    });
    clone.addEventListener('mouseleave', () => {
      setTimeout(() => {
        clone.style.animation = 'none';
      }, 2000);
      // clone.style.animationPlayState = 'paused';
    });
  }
};
