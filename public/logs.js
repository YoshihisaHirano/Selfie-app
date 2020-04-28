getData();

const selfie = [];
//console.log(selfie);

document.getElementById('mood').addEventListener('click', (event) => {
  sortData((a,b) => {
    if(b.mood > a.mood) return -1;
    else return 1;
  })
});

document.getElementById('time').addEventListener('click', event => {
  sortData((a,b) => b.time - a.time);
});

function sortData(compare) {
  for(let ent of selfie) {
    ent.itm.remove();
  }
  selfie.sort(compare);
  for(let item of selfie) {
    document.body.appendChild(item.itm);
  }
}

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

  selfie.push({ itm: root, time: elt.timestamp, mood: elt.keyword});
}
}
