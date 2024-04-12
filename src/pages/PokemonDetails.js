import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

function PokemonDetails() {
    const [pokemon, setPokemon] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => {
                setPokemon(response.data);
            })
            .catch(error => {
                console.error("Error retrieving Pokémon details :", error);
            });
    }, [id]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="m-4 p-5 bg-green-600 shadow-md rounded-lg overflow-auto w-2/5 relative">
                <Link to="/">
                    <button className="absolute top-3 left-3 py-2 px-4 rounded bg-white text-black text-2xl"><IoIosArrowBack /></button>
                </Link>
                <img className="w-full h-52 object-cover" src={pokemon.sprites.front_default} alt={pokemon.name} />
                <div className='flex justify-around text-white'>
                    <div className="">
                        <span className='uppercase font-semibold'>Info</span>
                        <p>Name: <span className='font-semibold uppercase'>{pokemon.name}</span></p>
                        <p>Size: {pokemon.height / 10} m</p>
                        <p>Weight: {pokemon.weight / 10} kg</p>
                        <p>Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                    </div>
                    <div>
                        <span className='uppercase font-semibold'>Stats</span>
                        <ul>
                            {pokemon.stats.map(stat => (
                                <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;