const apiURL = '//swapi.dev/api/people';

fetch(apiURL)
    .then(function (data){
        return data.json();

    })
    .then(function (object){
        // console.log(object);
        const people = object['people'];
        const cards = document.querySelector('.cards');

        people.forEach(person => {
            let card = document.createElement('section');
            let name = document.createElement('h3');
            let gender = document.createElement('p');
            let birth = document.createElement('p');
            let height = document.createElement('p');

            name.textContent = person.name;
            console.log(name);

            cards.append(card);
            card.append(name);
        })
    })