let counter = document.querySelector("#counter-num");
let title = document.querySelector("h1");

function increment() {
  counter.textContent = parseInt(counter.textContent) + 1;
}

function notOptimized() {
  increment();
}

let timeout;
function debounce() {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(increment, 100);
}

let throttling = false;
function throttle() {
  if (throttling) return;

  increment();
  throttling = true;
  setTimeout(() => (throttling = false), 2000);
}

const mode = [
  { name: "not optimized", handler: notOptimized },
  { name: "debounce", handler: debounce },
  { name: "throttle", handler: throttle },
];
function _switch() {
  if (timeout) clearTimeout(timeout);
  throttling = false;
  counter.textContent = 0;

  window.removeEventListener("scroll", mode[current].handler);
  current += 1;
  current %= mode.length;
  window.addEventListener("scroll", mode[current].handler);
  title.textContent = mode[current].name;
}

document.querySelector("button").addEventListener("click", _switch);

let current = 0;
window.addEventListener("scroll", notOptimized);
