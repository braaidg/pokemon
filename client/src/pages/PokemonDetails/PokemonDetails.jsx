import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPokemonById, resetLoadingState, resetPokemonDetails } from '../../app/actions';

import Loader from '../../components/Loader/Loader';
import pokeball from '../../images/pokeball.svg'
import TypePill , { typeColors } from '../../components/TypePill/TypePill'

import pokeballTitle from '../../images/pokeballTitle.png'

import styles from './PokemonDetails.module.css';

function PokemonDetails() {

    const pokemonDetails = useSelector(state => state.pokemonDetails)
    const isLoading = useSelector(state => state.isLoading)
    const {pokemonId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonById(pokemonId))
    } , [dispatch, pokemonId, isLoading])

    function handleClick() {
        dispatch(resetPokemonDetails())
        dispatch(resetLoadingState())
    }

    const error = pokemonDetails.error;
    const { name, attack, defense, height, weight, image, life, speed, types} = pokemonDetails;
    const pokemonBackground = types ? typeColors[types[0]] : typeColors[0]

    return (
    <>
    {
        !isLoading ? (
            !error ?
            
            <div className={styles.container} style={{backgroundColor: pokemonBackground }}>
                <img className={styles.pokeBall} src={pokeballTitle} alt="pokeball"/>
                <p className={styles.title}>{name}</p><br />
                <img className={styles.pokeImg} src={image || pokeball} alt={name}  />
                <div className={styles.cardDetails}>

                    <div className={styles.statsContainer}>
                        <div className={styles.statNames}>
                            <p>Attack:</p>
                            <p>Defense:</p>
                            <p>Speed:</p>
                            <p>Life:</p>
                            <p>Height:</p>
                            <p>Weight:</p>
                            <p>Types:</p>                        
                        </div>
                        <div style={{backgroundColor: "white"}}>
                            <p>{attack}/255</p>
                            <p>{defense}/255</p>
                            <p>{speed}/255</p>
                            <p>{life}/255</p>
                            <p>{height}/255</p>
                            <p>{weight}/255</p>
                            <p>
                                { types && types.map( type => (
                                    <TypePill key={type}  type={type}/>
                                ))} 
                            </p>                        
                        </div>

                    </div>

                    <div className={styles.typesContainer} >
                    </div>
            </div>

        </div>
            : <p className={styles.notFound}>{error}</p>

        ) 
        : <Loader/>
    }

    <Link to="/pokemons">
        <button className='btn' onClick={handleClick}>Return to home</button>
    </Link>
    </>
  )
}

export default PokemonDetails