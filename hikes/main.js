import * as Hikes from './hikes.js';

const hikes = document.querySelector('.hikes');

const hikesList = Hikes.hikesList;

hikesList.forEach(hikesList => {
    let hike = document.createElement('section');
    let h2 = document.createElement('h2');
    let image = document.createElement("img");
    let distance = document.createElement("p");
    let difficulty = document.createElement("p");

    h2.innerHTML = `${hikesList.name}`;
    image.setAttribute("src", `${hikesList.image}`);
    distance.innerHTML = `Distance: ${hikesList.distance}`;
    difficulty.innerHTML = `Date of birth: ${hikesList.difficulty}`;
    
    hikes.append(h2);
    hikes.append(hike);  
    hikes.append(image);
    hikes.append(distance);
    hikes.append(difficulty);

})
