export function loadMap(lat, lng) {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 13
    });

    return map;
}

export function addMarker(map, lat, lng, title) {
    new google.maps.Marker({
        position: { lat, lng },
        map,
        title
    });
}
