import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cards({ pokemon }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    axios.get(pokemon.url)
      .then((response) => {
        setPokemonDetails(response.data);
      })
      .catch((error) => {
        console.error(`Erreur lors de la récupération des détails du Pokémon : ${error}`);
      });
  }, [pokemon]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[100%] rounded overflow-hidden shadow-lg m-2 bg-red-300">
      <img className="w-full" src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <div className="px-6 py-4 bg-white">
        <h1 className="font-bold text-xl mb-2 uppercase">{pokemonDetails.name}</h1>
        <div className='flex flex-col gap-4'>
            <p className='font-semibold text-sm'>Num : <span className='bg-green-900 rounded px-2 text-center text-white'>{pokemonDetails.id}</span></p>
            <p className='font-semibold text-sm'>Type : <span className='bg-red-500 rounded px-2 py-[3px] text-center text-white'>{pokemonDetails.types.map((type) => type.type.name).join(', ')}</span></p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 bg-white">
        <Link to={`/pokemon/${pokemonDetails.name}`}>
            <button className="bg-green-500 rounded w-full py-2 text-xl font-semibold text-white mr-2 mb-2">Details</button>
        </Link>
      </div>
    </div>
  );
}