const apiURL = '//swapi.dev/api/people';

fetch(apiURL)
    .then(function (data){
        return data.json();

    })
    .then(function (object){
        // console.log(object);
        let results = object['results'];

            // for (i = 0; i < results.length; i++){
            results.forEach(people => {
        
                let card = document.createElement('section');
                let name = document.createElement('h3');
                let gender = document.createElement('p');
                let birth = document.createElement('p');
                let height = document.createElement('p');

                name.textContent = people.name;
                name.textContent = object.list[i].gender;
                name.textContent = object.list[i].birth_year;
                name.textContent = object.list[i].height;

            
                card.append(name);
                card.append(gender);
                card.append(birth);
                card.append(height);
        })
    })