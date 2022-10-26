import axios from 'axios';

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"; 
export const GET_POKEMONS_BY_NAME = "GET_POKEMONS_BY_NAME";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID"; 
export const GET_TYPES = "GET_TYPES"; 

export const RESET_LOADING_STATE = "RESET_LOADING_STATE"; 
export const RESET_POKEMON_DETAILS = "RESET_POKEMON_DETAILS"; 

export const FILTER_BY_TYPE = "FILTER_BY_TYPE"; 
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";  

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";


export function getAllPokemons() {
    return async function(dispatch) {
        let data = (await axios.get('http://localhost:3001/pokemons')).data;
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: data
        })
    }
}

export function getPokemonsByName(pokemon) {
    return async function(dispatch) {
        let data = (await axios.get(`http://localhost:3001/pokemons?name=${pokemon}`)).data;
        return dispatch({
            type: GET_POKEMONS_BY_NAME,
            payload: data
        })
    }
}

export function getPokemonById(id) { 
    return async function(dispatch) {
        try {
            let data = (await axios.get(`http://localhost:3001/pokemons/${id}`)).data;
            return dispatch({
                type: GET_POKEMON_BY_ID,
                payload: data
            })
        } catch(e) {
            return dispatch({
                type: GET_POKEMON_BY_ID,
                payload: {error: e.response.data.Error}
            }) 
        }

    }
}

export const getTypes = () => {
    return async(dispatch) => {
        try {
            const data = (await axios.get("http://localhost:3001/types")).data;
            return dispatch({
                type: GET_TYPES,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function resetPokemonDetails() {
    return {
        type: RESET_POKEMON_DETAILS,
        payload: {}
    };
}

export function resetLoadingState() {
    return {
        type: RESET_LOADING_STATE,
        payload: {}
    }
}


export const filterByType = (filter) => {
    return {
        type: FILTER_BY_TYPE,
        payload: filter
    }
}

export const filterBySource = (filter) => {
    return {
        type: FILTER_BY_SOURCE,
        payload: filter
    }
}


export const orderByName = (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
}

export const orderByAttack = (order) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: order
    }
}

export const setCurrentPage = (pageNumber) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: pageNumber
    }
}