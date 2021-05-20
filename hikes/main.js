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
    birthDate.innerHTML = `Date of birth: ${hikesList.difficulty}`;
    
    hikesList.append(h2);
    hikes.append(hike);  
    hikesList.append(image);
    hikesList.append(distance);
    hikesList.append(difficulty);

})
