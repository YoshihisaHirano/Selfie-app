//Adding a map to the page
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let firstTime = true;

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
  navigator.geolocation.getCurrentPosition(async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById('lat').textContent = lat;
  document.getElementById('lon').textContent = lon;
  //Adding map with actual coordinates
  if(firstTime) {
  const mymap = L.map('mapid').setView([lat, lon], 12);
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);
  const marker = L.marker([lat, lon], { icon: myicon }).addTo(mymap);
}
//Making a POST request to the server
  const keyword = document.getElementById('input').value;
  const data = { lat, lon, keyword };
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
    firstTime = false;
});
} else {
  console.log('nope');
}
}
)
