let listaPokemon = [];

function criaCards() {
    let requestURL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function() {
        let pokemons = request.response;
        listaNomes(pokemons);
        
        let mainTag = document.getElementById('main-content');
        let mainConteudo = "";
        
        for (let i = 1; i <= 151; i++) {
            mainConteudo += `
            <div class="pokemon-card">
                <img class="pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" alt="Pokemon ${listaPokemon[i-1]}">
                <p class="pokemon-number">#${i.toString().padStart(3, '0')}</p>
                <h3 class="pokemon-name">${listaPokemon[i-1]}</h3>
            </div>
            `;
        }
        
        mainTag.innerHTML = mainConteudo;
    }
}

function listaNomes(jsonObj) {
    let pokemons = jsonObj["results"];

    for (let i = 0; i < pokemons.length; i++) {
        listaPokemon.push(capitalizeFirstLetter(pokemons[i].name)); 
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

function pesquisar() {
    let input = document.getElementById("search-input").value.toLowerCase();

    for (let i = 0; i < listaPokemon.length; i++) {
        if (listaPokemon[i].toLowerCase().includes(input)) {
            document.querySelectorAll('.pokemon-card')[i].style.display = "inline-flex";
        } else {
            document.querySelectorAll('.pokemon-card')[i].style.display = "none";
        }
    }
}

document.getElementById("search-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        pesquisar();
    }
});

criaCards();