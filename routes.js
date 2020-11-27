const express = require('express');
const router = express.Router();

const pokedex = require('./pokedex');

router
    .route('')
    .get((req, res) => {

        const { name, type } = req.body;

        const pokemons = pokedex.getPokemons(name, type);

        return res.json(pokemons);
    })
    .post((req, res) => {

        const pokemon = req.body.pokemon;

        pokedex.addPokemon(pokemon);

        return res.json({

            created: true,
        });
    });

router
    .route('/:id')
    .get((req, res) => {

        const pokemon = pokedex.getLocalPokemons().find((current) => current.id === Number(req.params.id));

        return res.json(pokemon);
    })
    .patch((req, res) => {

        pokedex.updatePokemon(Number(req.params.id), req.body.pokemon);

        return res.json({

            updated: true
        });
    })
    .delete((req, res) => {

        pokedex.deletePokemon(Number(req.params.id));

        return res.json({

            deleted: true
        });
    });

module.exports = router;
