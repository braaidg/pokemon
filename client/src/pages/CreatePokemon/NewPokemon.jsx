import styles from './NewPokemon.module.css'
import pokeball from '../../images/pokeball.svg'
import useForm from '../../hooks/useForm'
import TypePill, {typeColors} from '../../components/TypePill/TypePill'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTypes } from '../../app/actions'


const NewPokemon = () => {
  const { handleChange, values, errors, handleSelect, handleSubmit, postError} = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  const typesList = useSelector(state => state.types);

  const {name, attack ,defense, life, speed, height, weight, types, image} = values;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pokemonPreview} style={{backgroundColor: typeColors[types[0]] || "white"}}>
          <h2>Pokemon preview</h2>
          <img src={ image || pokeball} alt="pokeball" width="200"/>
          <p>Name: {name || "No name specified" }</p>
          <p>Attack → {attack || 0}</p>
          <p>Defense → {defense || 0}</p>
          <p>Life → {life || 0}</p>
          <p>Speed → {speed || 0}</p>
          <p>Height → {height || 0} cm</p>
          <p>Weight → {weight || 0} kg</p>
          <p>Types ↓ (Max = 3)</p>
          <div className={styles.typesContainer}>
            {
              types.length ? types.map(type => (
                  <TypePill key={type} type={type} /> 
              ))
              : <span>No types selected</span>
            }  
          </div>
        </div>

        <div className={styles.formContainer}>
          <p className={styles.formTitle}>Make your own pokemon!</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input className={styles.formInput} type="text" name="name" onChange={handleChange}/>
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
              <label>Life</label>
              <input className={styles.formInput} type="number" name="life" onChange={handleChange}/>
              {errors.life && <p>{errors.life}</p>}
            </div>
            <div>
              <label>Attack</label>
              <input className={styles.formInput} type="number" name="attack" onChange={handleChange}/>
              {errors.attack && <p>{errors.attack}</p>}
            </div>
            <div>
              <label>Defense</label>
              <input className={styles.formInput} type="number" name="defense" onChange={handleChange} />
              {errors.defense && <p>{errors.defense}</p>}
            </div>
            <div>
              <label>Speed</label>
              <input className={styles.formInput} type="number" name="speed" onChange={handleChange} />
              {errors.speed && <p>{errors.speed}</p>}
            </div>
            <div>
              <label>Height</label>
              <input className={styles.formInput} type="number" name="height" onChange={handleChange} />
              {errors.height && <p>{errors.height}</p>}
            </div>
            <div>
              <label>Weight</label>
              <input className={styles.formInput} type="number" name="weight" onChange={handleChange} />
              {errors.weight && <p>{errors.weight}</p>}
            </div>
            <div>
              <label>Image</label>
              <input className={styles.formInput} type="text" name="image" onChange={handleChange}/>
              {errors.image && <p>{errors.image}</p>}
            </div>
            <div>
              <label>Types</label>
              <select className={styles.selectContainer}  defaultValue="Pokemon Type" onChange={handleSelect}>
                <option disabled>Pokemon Type</option>
                {typesList.map(type => (
                  <option key={type.name} value={type.name}>{type.name}</option>
                ))}
              </select>
              {errors.types && <p>{errors.types}</p>}
            </div>
            {postError ? <p className={styles.postError}>{postError}</p> : null}
            <button className='btn'>Create</button>
          </form>
        </div>
    </div>
      <Link to="/pokemons"><button className='btn'>Go to homepage</button></Link>
    </>
  )
}

export default NewPokemon;