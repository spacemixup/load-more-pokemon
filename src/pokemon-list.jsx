import React, { useEffect, useState }  from 'react';
// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

const PokemonList = () => {
  // let pokeList = {};
  // type PokedexEntry = {
  //   name: String,
  //   url: String,
  // }
  const [pokedex, setPokedex] = useState([0]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [data, setPokedata] = useState([0]);


  useEffect(() => {
    getPokemon(limit, offset);
  }, [])

  // initially get first 5 items
  // limit 5, offset 0
  // limit 10, offset 5
  async function getPokemon(limit, offset) {
   const response = await fetch (`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
   const pokeData = await response.json();
   setPokedex(pokedex.concat(pokeData.results));
   setLimit(limit)
   setOffset(offset + pokeData.results.length);
   console.log(pokeData.results, "pokemonlist")
  }

  function displayPokedex() {
    if (pokedex !== null && pokedex.length > 0) {
      return pokedex.map(pokedex => {
        return (
          <div key={pokedex.name}>
            <div>{pokedex.name}</div>
            <div><img href={pokedex.url}></img></div>
          </div>
        )
      })
    }
  }


    return (
        <div className="pokemonListContainer">
          {displayPokedex()}
          <div>
            Loading {pokedex.length} of {pokedex.length}
          </div>
          <button onClick={() => getPokemon(limit+5, offset+limit)}>Load more </button>          
        </div>
    )
};

export default PokemonList;
