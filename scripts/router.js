import { renderHome } from "./ui.js";
import { renderItinerary } from "./itinerary.js";
import { renderJournal } from "./journal.js";
import { renderGallery } from "./gallery.js";

export const Router = {
    routes: {
        "/": renderHome,
        "/itinerary": renderItinerary,
        "/journal": renderJournal,
        "/gallery": renderGallery
    },

    init() {
        window.addEventListener("hashchange", () => this.load());
        this.load();
    },

    load() {
        const path = location.hash.slice(1) || "/";
        const screen = this.routes[path];
        screen ? screen() : renderHome();
    }
};

