getData();

async function getData() {
const resp = await fetch('/api');
const data = await resp.json();
console.log(data);

const container = document.getElementById('entries');

for(let elt of data) {
  const root = document.createElement('p');

  if(elt.image64) {
  const image = document.createElement("img");
  image.src = elt.image64;
  root.append(image);
}

  const keyword = document.createElement('div');
  keyword.textContent = `Mood:  ${elt.keyword}`;

  const location = document.createElement('div');
  location.textContent = `Location:  ${elt.lat}, ${elt.lon}`;

  const dateString = new Date(elt.timestamp).toLocaleString()
  const date = document.createElement('div');
  date.textContent = dateString;

  root.append(keyword, location, date);
  container.appendChild(root);
}
}
