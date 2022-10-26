import { useEffect, useState } from "react";
import axios from 'axios';
import { formValidator } from "../pages/CreatePokemon/formValidations";
import { useNavigate } from 'react-router-dom';


const useForm = () => {
  const [values, setValues] = useState({
    name: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  })
  const [errors, setErrors] = useState({})
  const [postError, setPostError] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(formValidator(values)) 
  }, [values])
  


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues(prevState => ({...prevState, [name]:value}))
  }

  console.log("ERRORS ====>", errors)
  const handleSelect = (e) => {
    const value = e.target.value;
    const totalTypes = values.types;

    if (!totalTypes.includes(value) && totalTypes.length < 3 ) {
      const newTypes = [...totalTypes, value];
      setValues({...values, types: newTypes})
    } else {
      const filtered = totalTypes.filter(type => type !== value);
      setValues({...values, types: filtered})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.name || Object.values(errors).length) {
      setPostError("Please fill all the inputs")
    } else {
      setValues({
      name: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    })
      setPostError("Pokemon created succesfully")
      await axios.post('http://localhost:3001/pokemons', values)
      navigate('/pokemons')

    }
  }

  return { values, errors , handleChange, handleSelect, handleSubmit, postError}
}

export default useForm;