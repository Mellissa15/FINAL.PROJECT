import { Storage } from "./storage.js";

export function renderItinerary() {
  const app = document.getElementById("app");
  const events = Storage.load("itinerary");

  app.innerHTML = `
    <section class="fade-in">
      <h2>Itinerary</h2>

      <input id="eventInput" placeholder="Add a plan..." />
      <button id="addBtn">Add</button>

      <ul id="eventList">
        ${events.map(e => `<li class="card">${e}</li>`).join("")}
      </ul>
    </section>
  `;

  document.getElementById("addBtn").addEventListener("click", () => {
    const value = document.getElementById("eventInput").value.trim();
    if (!value) return;

    events.push(value);
    Storage.save("itinerary", events);
    renderItinerary();
  });
}

