
// scripts/api.js

const UNSPLASH_KEY = "emX3FI_33-2zynOup26fg46-kboHNJOTJF4pLVUvDao";
const RAPIDAPI_KEY = "1f48c0ce8dmshd739ba7f2046a11p198bd7jsnb0446713daa9";

const UNSPLASH_BASE = "https://api.unsplash.com";
const TRIPADVISOR_BASE = "https://tripadvisor1.p.rapidapi.com";


export const API = {
    // --- Unsplash: search photos ---
    async searchPhotos(query, perPage = 12) {
        try {
            const url = `${UNSPLASH_BASE}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&client_id=${UNSPLASH_KEY}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Unsplash request failed");
            const data = await res.json();
            return data.results || [];
        } catch (err) {
            console.error("Unsplash API error:", err);
            return [];
        }
    },

    // --- TripAdvisor: search places/attractions by location ---
    async searchAttractions(query) {
        try {
            // Example endpoint from RapidAPI — check exact path in your RapidAPI listing
            const url = `${TRIPADVISOR_BASE}/attractions/list?location=${encodeURIComponent(query)}&limit=10`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": RAPIDAPI_KEY,
                    "X-RapidAPI-Host": "tripadvisor1.p.rapidapi.com"
                }
            });
            if (!res.ok) throw new Error("TripAdvisor request failed");
            const data = await res.json();
            // Depending on endpoint, data structure may vary.
            // Example: data.data or data.results or direct array.
            // We'll try a few variants:
            const list = data.data || data.results || data;
            return Array.isArray(list) ? list : [];
        } catch (err) {
            console.error("TripAdvisor API error:", err);
            return [];
        }
    }
};

