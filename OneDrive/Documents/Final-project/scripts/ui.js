import { API } from "./api.js";

export function renderHome() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <section class="fade-in">
      <h2>Search Destination</h2>
      <input id="searchInput" placeholder="Enter a city..." />
      <button id="searchBtn">Search</button>

      <div id="results"></div>
    </section>
  `;

    document.getElementById("searchBtn").addEventListener("click", async () => {
        const city = document.getElementById("searchInput").value.trim();
        const resultsDiv = document.getElementById("results");

        if (!city) return;

        resultsDiv.innerHTML = `<p>Searching attractions for <b>${city}</b>...</p>`;

        const data = await API.getPlaces(city);

        if (!data || !data.data) {
            resultsDiv.innerHTML = `<p>No results found.</p>`;
            return;
        }

        resultsDiv.innerHTML = data.data
            .map(item => `
        <div class="card">
          <h3>${item.result_object?.name || "Unknown"}</h3>
          <p>${item.result_object?.address || "No address available"}</p>
        </div>
      `)
            .join("");
    });
}

