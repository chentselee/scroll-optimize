let counter = document.querySelector("#counter-num");
let title = document.querySelector("h1");

function notOptimized() {
  counter.textContent = parseInt(counter.textContent) + 1;
}

let timeout;
function optimized() {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(
    () => (counter.textContent = parseInt(counter.textContent) + 1),
    100
  );
}

function _switch() {
  if (timeout) clearTimeout(timeout);
  counter.textContent = 0;

  if (current === "not optimized") {
    window.removeEventListener("scroll", notOptimized);
    window.addEventListener("scroll", optimized);
    title.textContent = current = "optimized";
  } else {
    window.removeEventListener("scroll", optimized);
    window.addEventListener("scroll", notOptimized);
    title.textContent = current = "not optimized";
  }
}

document.querySelector("button").addEventListener("click", _switch);

let current = "not optimized";
window.addEventListener("scroll", notOptimized);
