class Pokemon {
    constructor({ id, nome, tipo, imagem, hp, ataque, defesa, ataqueEspecial, defesaEspecial, velocidade }) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.imagem = imagem;
        this.hp = hp;
        this.ataque = ataque;
        this.defesa = defesa;
        this.ataqueEspecial = ataqueEspecial;
        this.defesaEspecial = defesaEspecial;
        this.velocidade = velocidade;
    }
}


var url = 'https://pokeapi.co/api/v2/pokemon/1/';

fetch(url).then(response => response.json())
    .then(json => {
        var pokemon = new Pokemon({
            id: json.id,
            nome: json.name,
            tipo: json.types[0].type.name,
            imagem: json.sprites.front_default,
            hp: json.stats[0].base_stat,
            ataque: json.stats[1].base_stat,
            defesa: json.stats[2].base_stat,
            ataqueEspecial: json.stats[3].base_stat,
            defesaEspecial: json.stats[4].base_stat,
            velocidade: json.stats[5].base_stat
        });
        
        console.log(pokemon);

    }).catch(error => {
        console.error('Erro ao buscar os dados:', error);
    });



                    