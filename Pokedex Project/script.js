var requestURL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

var nomePokemon = [];

request.onload = function() {
    var pokemons = request.response;
    listaNomes(pokemons);
    
    let mainTag = document.querySelector('.pokemon-list');
    let mainConteudo = "";
    
    for (let i = 1; i <= 151; i++) {
        mainConteudo += `
        <div class="pokemon-card">
            <img class="pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" alt="Pokemon ${nomePokemon[i-1]}">
            <p class="pokemon-number">#${i.toString().padStart(3, '0')}</p>
            <h3 class="pokemon-name">${nomePokemon[i-1]}</h3>
        </div>
        `;
    }
    
    mainTag.innerHTML = mainConteudo;
}

function listaNomes(jsonObj) {
    var pokemons = jsonObj["results"];

    for (var i = 0; i < pokemons.length; i++) {
        nomePokemon.push(capitalizeFirstLetter(pokemons[i].name)); 
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}