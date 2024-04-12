import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

export default function PokemonList({ search }) {
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(12);
  const pokemonsPerPage = 12;

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count}`) 
      .then((response) => {
        setPokemons(response.data.results);
      })
      .catch((error) => {
        console.error(`Erreur lors de la récupération des données de l'API Pokémon : ${error}`);
      });
  }, [count]);

  if (pokemons.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(search));

  return (
      <div className='flex flex-col gap-4'>
        <div className="grid grid-cols-6 gap-2 px-4">
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon, index) => (
                <Cards key={index} pokemon={pokemon} />
              ))
            ) : (
              <p className='text-3xl font-semibold'>Error ! if pokemon is not available or please load on the "arrow" button</p>
            )}
        </div>
        <div className='flex items-center justify-center pb-8'>
            {search === '' && <button className='bg-green-600 text-white text-2xl px-6 py-2 rounded' onClick={() => setCount(count + pokemonsPerPage)}><MdKeyboardDoubleArrowDown /></button>}
        </div>
      </div>
  );
}