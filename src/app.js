const App = () => {
  const cssRef = '.jigsaw-container > *';
  const nodes = document.querySelectorAll(cssRef);

  for (let i = 0; i < nodes.length; i += 1) {
    nodes[i].style.top = '0';
    nodes[i].setAttribute('data-speed', Math.floor(Math.random() * 10 + 2));
  }

  window.addEventListener('scroll', () => {
    for (let i = 0; i < nodes.length; i += 1) {
      const speed = window.scrollY / parseInt(nodes[i].getAttribute('data-speed'), 10);

      nodes[i].style.transform = `rotate(${speed}deg)`;
      nodes[i].style.top = `${speed}px`;
      nodes[i].style.opacity = 1 - speed / 100;

      if (i >= (nodes.length - 2) / 2) {
        nodes[i].style.left = `${speed}px`;
      } else {
        nodes[i].style.left = `-${speed}px`;
      }
    }
  });
};

export default App;
