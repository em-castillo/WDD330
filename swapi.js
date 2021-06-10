const apiURL = '//swapi.dev/api/people';

fetch(apiURL)
    .then(function (data){
        return data.json();

    })
    .then(function (object){
        console.log(object);
        //'results' is the array name
        let results = object['results'];
        let cards = document.querySelector(".cards");
        let next = results.next;
        console.log(next);

            results.forEach(people => {
        
                let card = document.createElement('section');
                let name = document.createElement('h3');
                let gender = document.createElement('p');
                let birth = document.createElement('p');
                let height = document.createElement('p');
                

                name.textContent = `${people.name}`;
                gender.textContent = `Gender: ${people.gender}`;
                birth.textContent = `Year of birth: ${people.birth_year}`;
                height.textContent = `Height: ${people.height}`;
                

                cards.append(card);
                card.append(name);
                card.append(gender);
                card.append(birth);
                card.append(height);
                
        })
    })

let page = 1;


function next(forward){
    if (forward) {
        page++;
    }
    else {
        page--;
    }

    const apiURL = '//swapi.dev/api/people/?page=' + page;
    fetch(apiURL)
        .then(function(data){
            return data.json();
        })
        .then(function(object){
            console.log(object);

            let results = object['results'];
            let cards = document.querySelector(".cards");
    
                results.forEach(people => {
            
                    let card = document.createElement('section');
                    let name = document.createElement('h3');
                    let gender = document.createElement('p');
                    let birth = document.createElement('p');
                    let height = document.createElement('p');
                    
    
                    name.textContent = `${people.name}`;
                    gender.textContent = `Gender: ${people.gender}`;
                    birth.textContent = `Year of birth: ${people.birth_year}`;
                    height.textContent = `Height: ${people.height}`;
                    
    
                    cards.append(card);
                    card.append(name);
                    card.append(gender);
                    card.append(birth);
                    card.append(height);
        })
    })
}