import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Filter from './components/Filter';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetails';

function App() {
  const [search, setSearch] = useState(''); // Déplacer l'état de la recherche ici

  return (
    <Router>
      <Filter search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" exact element={<PokemonList search={search} />} /> {/* Passer l'état de la recherche en tant que props */}
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
    </Router>
  );
}

export default App;