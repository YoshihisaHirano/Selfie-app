const mymap = L.map('mapid').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const myicon = L.icon({
  iconSize: [35, 35],
  iconUrl: './pug.png',
  iconAnchor: [17, 17]
});


if('geolocation' in navigator) {
  console.log("geolocation available");
  navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
  document.getElementById('lat').textContent = position.coords.latitude;
  document.getElementById('lon').textContent = position.coords.longitude;
  const marker = L.marker([position.coords.latitude, position.coords.longitude], { icon: myicon }).addTo(mymap);
  mymap.setView([position.coords.latitude, position.coords.longitude], 12);
});
} else {
  console.log('nope');
}
