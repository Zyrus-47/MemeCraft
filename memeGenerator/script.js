const btn = document.querySelector(".generate-btn");
const memeImage = document.querySelector(".meme-image");
const memeTitle = document.querySelector(".meme-title");
const memeAuthor = document.querySelector(".meme-author");

async function generateMeme() {
  try {
    btn.disabled = true;
    memeTitle.textContent = "Loading...";
    memeAuthor.textContent = "";
    memeImage.classList.add("loading");

    const response = await fetch("https://meme-api.com/gimme");
    if (!response.ok) throw new Error("Network error");

    const data = await response.json();

    memeImage.src = data.url;
    memeImage.alt = data.title || "Meme Image";
    memeTitle.textContent = data.title || "Untitled Meme";
    memeAuthor.textContent = data.author ? `Meme by: ${data.author}` : "";

    memeImage.classList.remove("loading");
  } catch (error) {
    memeTitle.textContent = "Oops! Failed to load meme.";
    memeAuthor.textContent = "";
    memeImage.src = "";
    memeImage.alt = "";
    memeImage.classList.remove("loading");
  } finally {
    btn.disabled = false;
  }
}

btn.addEventListener("click", generateMeme);
