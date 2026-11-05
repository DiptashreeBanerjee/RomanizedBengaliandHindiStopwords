// Each word page names its data file in <body data-file="...">
const file = document.body.dataset.file;
const container = document.getElementById("words");
const countEl = document.getElementById("count");
const searchBox = document.getElementById("search");
const sortBox = document.getElementById("sort");
let allWords = [];

function sortWords(words, mode) {
  const list = [...words];                      // copy, so the original order is kept
  if (mode === "az")  list.sort((a, b) => a.localeCompare(b));
  if (mode === "za")  list.sort((a, b) => b.localeCompare(a));
  if (mode === "short") list.sort((a, b) => a.length - b.length || a.localeCompare(b));
  if (mode === "long")  list.sort((a, b) => b.length - a.length || a.localeCompare(b));
  return list;
}

function update() {
  const q = searchBox.value.trim().toLowerCase();
  const matches = allWords.filter(w => w.toLowerCase().includes(q));
  const shown = sortWords(matches, sortBox.value);

  container.innerHTML = "";
  shown.forEach(word => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    container.appendChild(span);
  });
  countEl.textContent = shown.length === allWords.length
    ? `${allWords.length} words`
    : `${shown.length} of ${allWords.length} words match`;
}

fetch(file)
  .then(res => res.json())
  .then(data => { allWords = data; update(); })
  .catch(err => {
    countEl.textContent = "Could not load the word list. Check the file path.";
    console.error(err);
  });

searchBox.addEventListener("input", update);
sortBox.addEventListener("change", update);
