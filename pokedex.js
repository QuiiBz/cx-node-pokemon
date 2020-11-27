const fs = require('fs');

const today = new Date();
const BASE_JSON = 'pokedex.json';
const JSON_NAME = `pokedex-${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}.json`;

class Pokedex {

    constructor() {

        this.localPokemons = this.loadPokemons();
    }

    loadPokemons() {

        let json;

        try {

            json = JSON.parse(fs.readFileSync(JSON_NAME).toString());

        } catch (e) {

            fs.writeFileSync(JSON_NAME, fs.readFileSync(BASE_JSON));

            json = [];
        }

        return json;
    }

    savePokemons() {

        const json = JSON.stringify(this.localPokemons, null, 2);

        fs.writeFileSync(JSON_NAME, json);
    }

    addPokemon(pokemon) {

        this.localPokemons.push(pokemon);

        this.savePokemons();
    }

    deletePokemon(id) {

        const index = this.localPokemons.findIndex((current) => current.id === id);
        this.localPokemons.splice(index, 1);

        this.savePokemons();
    }

    getPokemons(name, type) {

        if(!name && !type)
            return this.localPokemons;

        const pokemons = this.localPokemons.filter((current) => {

            let nameMatch = true;
            let typeMatch = true;

            if(name)
                nameMatch = Object.values(current.name).includes(name);

            if(type)
                typeMatch = current.type.includes(type);

            return nameMatch && typeMatch;
        });

        return pokemons;
    }

    updatePokemon(id, newPokemon) {

        const pokemon = this.localPokemons.find((current) => current.id === id);
        Object.assign(pokemon, newPokemon);

        this.savePokemons();
    }

    getLocalPokemons() {

        return this.localPokemons;
    }
}

module.exports = new Pokedex();
