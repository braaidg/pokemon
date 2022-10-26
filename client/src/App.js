import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage'
import HomePage from './pages/HomePage/HomePage';
import NewPokemon from './pages/CreatePokemon/NewPokemon'
import Error404 from './pages/Error404/Error404'
import NavBar from './components/NavBar/NavBar'
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>

        <Route exact path="/pokemons" element={<NavBar/>}>
          <Route index element={<HomePage/>} />
          <Route path="/pokemons/create" element={<NewPokemon/>} />
          <Route path='/pokemons/:pokemonId' element={<PokemonDetails/>} />
          <Route path="*" element={<Error404/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
