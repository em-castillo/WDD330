import hikeData from "./hikes.js";

const container = document.querySelector(".hikes");

hikeData.forEach((hike) => {
  let section = document.createElement("section");
  let h2 = document.createElement("h2");
  let article = document.createElement("article");
  let div1 = document.createElement("div");
  let image = document.createElement("img");
  let div2 = document.createElement("div");
  let distance = document.createElement("p");
  let difficulty = document.createElement("p");
  let description = document.createElement("p");
  let directions = document.createElement("p");

  h2.innerHTML = `${hike.name}`;
  image.setAttribute("src", `${hike.image}`);
  image.setAttribute("alt", `${hike.alt}`);
  distance.innerHTML = `Distance: ${hike.distance}`;
  difficulty.innerHTML = `Difficulty: ${hike.difficulty}`;
  description.innerHTML = `Description: ${hike.description}`;
  directions.innerHTML = `Directions: ${hike.directions}`;

  container.append(section);
  section.append(h2);
  section.append(article);
  article.append(div1);
  div1.append(image);
  article.append(div2);
  div2.append(distance);
  div2.append(difficulty);
  div2.append(description);
  div2.append(directions);
});
