const apiURL = '//swapi.dev/api/people';

fetch(apiURL)
    .then(function (data){
        return data.json();

    })
    .then(function (object){
        // console.log(object);
        //'results' is the array name
        let results = object['results'];

            results.forEach(people => {
        
                let card = document.createElement('section');
                let name = document.createElement('h3');
                let gender = document.createElement('p');
                let birth = document.createElement('p');
                let height = document.createElement('p');

                name.textContent = people.name;
                gender.textContent = `Gender: ${people.gender}`;
                birth.textContent = `Year of birth: ${people.birth_year}`;
                height.textContent = `Height: ${people.height}`;

            
                const cards = document.querySelector('.cards');
                cards.append(card);
                card.append(name);
                card.append(gender);
                card.append(birth);
                card.append(height);
        })
    })