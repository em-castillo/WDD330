const apiURL = '//swapi.dev/api/people';

fetch(apiURL)
    .then(function (data){
        return data.json();

    })
    .then(function (object){
        // console.log(object);
        const people = object.list;

            for (i = 0; i < people.length; i++){
        
                let card = document.createElement('section');
                let name = document.createElement('h3');
                let gender = document.createElement('p');
                let birth = document.createElement('p');
                let height = document.createElement('p');

                name.textContent = object.list[i].name;
                console.log(name);

            
                card.append(name);
                card.append(gender);
                card.append(birth);
                card.append(height);
        }
    })