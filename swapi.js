const apiURL = 'https://swapi.dev/api/people/1/';

fetch(apiURL)
    .then(function (data){
        return data.json();

    })
    .then(function (object){
        console.log(object);
    })