import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetLoadingState } from '../../../app/actions';
import styles from './PokemonCard.module.css'
import TypePill from '../../../components/TypePill/TypePill'
import {typeColors} from '../../../components/TypePill/TypePill'
import pokeball from '../../../images/pokeball.svg'

function PokemonCard({id, name, image, types }) {

  const dispatch = useDispatch();

  function loadingState(){
    dispatch(resetLoadingState())
  }

  const formattedTypes = types[0]?.name ? types.map(type => type.name) : types 
  const background = typeColors[formattedTypes[0]] || typeColors[formattedTypes[1]]

  return (
      <Link to={`/pokemons/${id}`} onClick={loadingState}  >
        <div className={styles.container} style={{backgroundColor: background}}>
          <img className={styles.pokeImage} src={image || pokeball} alt="pokemon"/>

          <div className={styles.informationContainer}>

            <p className={styles.pokemonTitle}>{name}</p>
            
            <div className={styles.typesContainer}>
              { 
                  formattedTypes ? formattedTypes.map((type) => (
                    <TypePill key={type} type={type} />
                )) : <p className={styles.pokemonTypes}>No types found</p>
              }
            </div>
          </div>
        </div>
      </Link>
  )
}

export default PokemonCard;