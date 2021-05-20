import Hikes from './hikes.js';

const hikes = document.querySelector('.hikes');

const hikesList = Hikes();

hikesList.forEach(hike => {
    let hikes = document.createElement('section');
    let h2 = document.createElement('h2');
    let image = document.createElement("img");
    let distance = document.createElement("p");
    let difficulty = document.createElement("p");

    h2.innerHTML = `${hikesList.name}`;
    image.setAttribute("src", `${hikesList.image}`);
    distance.innerHTML = `Distance: ${hikesList.distance}`;
    difficulty.innerHTML = `Date of birth: ${hikesList.difficulty}`;
    
    hikesList.appendChild(h2);
    hikes.appendChild(hike);  
    hikesList.appendChild(image);
    hikesList.appendChild(distance);
    hikesList.appendChild(difficulty);

})
