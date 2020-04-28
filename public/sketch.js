//Adding a map to the page
const mymap = L.map('mapid').setView([0, 0], 2);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//Marker image
const myicon = L.icon({
  iconSize: [35, 35],
  iconUrl: './pug.png',
  iconAnchor: [17, 17]
});
const button = document.getElementById('geolocate');
//Working with actual geolocation data of the client
button.addEventListener("click", () => {
if('geolocation' in navigator) {
  console.log("geolocation available");
  navigator.geolocation.getCurrentPosition(async (position) => {
  console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById('lat').textContent = lat;
  document.getElementById('lon').textContent = lon;
  //Adding actual coordinates to the map
  const marker = L.marker([lat, lon], { icon: myicon }).addTo(mymap);
  mymap.setView([lat, lon], 12);

//Making a POST request to the server
  const data = { lat, lon };
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  }

    const resp = await fetch('/api', options);
    const datum = await resp.json();
    console.log(datum);

});
} else {
  console.log('nope');
}
}
)
