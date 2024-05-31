let mainTag = document.querySelector('.pokemon-list');
let mainConteudo = "";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
    .then(response => response.json())
    .then(data => {
        let pokemonNames = data.results.map(pokemon => capitalizeFirstLetter(pokemon.name));
        
        for (let i = 1; i <= 151; i++) {
            mainConteudo += `
            <div class="pokemon-card">
                <img class="pokemon-image" src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${i}.png?raw=true" alt="Pokemon ${pokemonNames[i-1]}">
                <p class="pokemon-number">#${i}</p>
                <h3 class="pokemon-name">${pokemonNames[i-1]}</h3>
            </div>
            `;
        }
    
        mainTag.innerHTML = mainConteudo;
    })
    .catch(error => console.error('Erro:', error));