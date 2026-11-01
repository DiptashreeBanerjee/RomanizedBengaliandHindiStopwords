// Each word page names its data file in <body data-file="...">
const file = document.body.dataset.file;
const container = document.getElementById("words");
const countEl = document.getElementById("count");
const searchBox = document.getElementById("search");
let allWords = [];

function render(words) {
  container.innerHTML = "";
  words.forEach(word => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    container.appendChild(span);
  });
  countEl.textContent = words.length === allWords.length
    ? `${allWords.length} words`
    : `${words.length} of ${allWords.length} words match`;
}

fetch(file)
  .then(res => res.json())
  .then(data => { allWords = data; render(allWords); })
  .catch(err => {
    countEl.textContent = "Could not load the word list. Check the file path, and open the site through a local server or GitHub Pages.";
    console.error(err);
  });

searchBox.addEventListener("input", () => {
  const q = searchBox.value.trim().toLowerCase();
  render(allWords.filter(w => w.toLowerCase().includes(q)));
});
