import { API } from "./api.js";

const root = document.getElementById("app");

export function renderGallery() {
    root.innerHTML = `
    <section class="gallery-page">
      <h2>Destination Photos</h2>
      <div class="gallery-search">
        <input id="galleryInput" type="text" placeholder="Search a destination...">
        <button id="galleryBtn">Search</button>
      </div>
      <div id="galleryResults" class="gallery-grid"></div>
    </section>
  `;

    document.getElementById("galleryBtn").addEventListener("click", loadGallery);

    // Optional: trigger search when pressing Enter
    document.getElementById("galleryInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") loadGallery();
    });
}

async function loadGallery() {
    const query = document.getElementById("galleryInput").value.trim();
    const container = document.getElementById("galleryResults");

    if (!query) {
        container.innerHTML = `<p class="msg">Please enter a destination.</p>`;
        return;
    }

    container.innerHTML = `<p class="msg">Loading photos...</p>`;

    const photos = await API.searchPhotos(query);

    console.log("Unsplash results:", photos); // Debug log

    if (!photos.length) {
        container.innerHTML = `<p class="msg">No photos found.</p>`;
        return;
    }

    container.innerHTML = photos
        .map(photo => `
      <div class="gallery-card">
        <img src="${photo.urls.small}" alt="${photo.alt_description || "photo"}">
      </div>
    `)
        .join("");
}



