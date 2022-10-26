import React, { useEffect } from 'react'


import { useDispatch, useSelector } from 'react-redux';
import { 
  getAllPokemons, 
  getTypes,
  setCurrentPage
} from '../../app/actions';

import styles from './HomePage.module.css'

import SearchBar from './components/SearchBar'
import PokemonCard  from './components/PokemonCard';
import Loader from '../../components/Loader/Loader'
import Pagination from './components/Pagination'
import Filters from './components/Filters';

function HomePage() {

  const dispatch = useDispatch()
  
  const allPokemons = useSelector((state)=> state.filteredPokemons);
  const allTypes = useSelector((state) => state.types);
  const isLoading = useSelector((state) => state.isLoading);
  
  const activeFilter = useSelector((state) => state.activeFilter)

  const currentPage = useSelector(state => state.currentPage)
  const lastPokemonOnPage = currentPage * 12;
  const firstPokemonOnPage = lastPokemonOnPage - 12;
  
  
  useEffect(()=>{
    dispatch(getAllPokemons());
    dispatch(getTypes());
  },[dispatch]);
  
const pokemonsData = allPokemons?.length > 1 ? allPokemons.slice(firstPokemonOnPage, lastPokemonOnPage) : [allPokemons];

const handlePaginationChange = (numberOfPage) => {
  dispatch(setCurrentPage(numberOfPage))
}

console.log(allPokemons)
  return (
    <>
    <div className={styles.container}>
      <SearchBar/>
      <Filters types={allTypes} />

      { activeFilter && <p className={styles.activeFilter}>Filtering by {activeFilter}</p> }

      <div className={styles.cardsContainer}>
        { 
          !isLoading ? (
            allPokemons.length ? pokemonsData.map(pokemon => (
              <PokemonCard 
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon?.image}
                types={pokemon.types}
              />))
          : <p className={styles.notFound}>No Pokemon Found!</p>
          ) 
            : <Loader/>
        }
      </div>
    </div>
    <Pagination 
      changePage={handlePaginationChange} 
      numberOfPages={ Math.ceil(allPokemons.length/12) } />
    </>
  )
}

export default HomePage;