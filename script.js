const themeToggle = document.getElementById("themeToggle");
const fontSelector = document.getElementById("fontSelector");
const searchInput = document.getElementById("searchInput");
const resultContainer = document.getElementById("resultContainer");

if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });
}

fontSelector.addEventListener("change", () => {
  document.body.style.fontFamily = fontSelector.value;
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchWord();
  }
});

async function searchWord() {
  const word = searchInput.value.trim();

  if (!word) {
    resultContainer.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if (data.title === "No Definitions Found") {
      resultContainer.innerHTML = "<p>Word not found.</p>";
      return;
    }

    const entry = data[0];
    let html = `<h2>${entry.word}</h2><p><i>${entry.phonetic || ''}</i></p>`;
    entry.meanings.forEach((meaning) => {
      html += `<h3>${meaning.partOfSpeech}</h3><ul>`;
      meaning.definitions.forEach((def) => {
        html += `<li>${def.definition}</li>`;
      });
      html += `</ul>`;
    });

    resultContainer.innerHTML = html;
  } catch (error) {
    resultContainer.innerHTML = "<p>Error fetching definition. Try again later.</p>";
  }
}
