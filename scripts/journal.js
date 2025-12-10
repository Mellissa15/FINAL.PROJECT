import { Storage } from "./storage.js";

export function renderJournal() {
    const app = document.getElementById("app");
    const notes = Storage.load("journal");

    app.innerHTML = `
    <section class="fade-in">
      <h2>Travel Journal</h2>

      <textarea id="noteArea" placeholder="Write your memory..."></textarea>
      <button id="saveNote">Save</button>

      <div id="entries">
        ${notes.map(n => `<p class="card">${n}</p>`).join("")}
      </div>
    </section>
  `;

    document.getElementById("saveNote").addEventListener("click", () => {
        const text = document.getElementById("noteArea").value.trim();
        if (!text) return;

        notes.push(text);
        Storage.save("journal", notes);
        renderJournal();
    });
}

