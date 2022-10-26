import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemonsByName, resetLoadingState } from "../../../app/actions";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [pokemonName, setPokemonName] = useState("");
  
  function handleInputChange(e) {
    e.preventDefault();
    setPokemonName(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if ( pokemonName ) {
      dispatch(resetLoadingState())
      dispatch(getPokemonsByName(pokemonName));
      setPokemonName("");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <input
          className={styles.searchBox}
          type="text"
          value={pokemonName}
          placeholder="🔍 Search for a Pokemon!"
          onChange={handleInputChange}
        />
      </form>

      <div className={styles.newPokemonContainer}>
        <p>Or create your ideal one! </p>
        <button className='btn'>
          <Link to="/pokemons/create">New Pokemon</Link>
        </button>
      </div>
      
      </div>
  );
}

export default SearchBar;
