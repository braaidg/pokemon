import {
  GET_ALL_POKEMONS,
  GET_POKEMONS_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  RESET_POKEMON_DETAILS,
  RESET_LOADING_STATE,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  FILTER_BY_SOURCE,
  FILTER_BY_TYPE,
  SET_CURRENT_PAGE
} from '../actions';

const INITIAL_STATE = {
  pokemons: [],
  filteredPokemons: [],
  filters: [],
  pokemonDetails: {},
  types: [],
  activeFilter: "" ,
  currentPage: 1,
  isLoading: true
};

function reducer (state= INITIAL_STATE, action) {
  switch(action.type) {
      case GET_ALL_POKEMONS:
          return {
              ...state,
              pokemons: action.payload,
              filteredPokemons: action.payload,
              isLoading: false,
          }
      case GET_POKEMONS_BY_NAME:
          return {
              ...state,
              filteredPokemons: action.payload,
              isLoading: false,
          }            
      case RESET_POKEMON_DETAILS:
          return {
              ...state,
              pokemonDetails: action.payload,
              isLoading: true,
          }   
      case RESET_LOADING_STATE:
          return {
              ...state,
              isLoading: true,
          }
      case GET_POKEMON_BY_ID:
          return {
              ...state,
              pokemonDetails: action.payload,
              isLoading: false,
          }
      case GET_TYPES:
          return {
              ...state,
              types: action.payload
          }
      case ORDER_BY_NAME:
          let filteredByName;
          if (action.payload === "A-Z") {
              filteredByName = state.filteredPokemons.sort((a,b) => a.name.localeCompare(b.name))            
          } else if (action.payload === "Z-A") {
              filteredByName = state.filteredPokemons.sort((a,b) => b.name.localeCompare(a.name));
          } else {
              filteredByName = state.pokemons;
          }
          return {
              ...state,
              activeFilter: `Name :${action.payload}`,
              filteredPokemons: filteredByName
          }
      case FILTER_BY_SOURCE:
          let filteredBySource;
          if (action.payload === "Database") {
              filteredBySource = state.pokemons.filter((pokemon) => typeof pokemon.id === "string")
          } else if (action.payload === "Api") {
              filteredBySource = state.pokemons.filter((pokemon )=> typeof pokemon.id === "number")
          } else {
              filteredBySource = state.pokemons
          }
          return { 
              ...state,
              activeFilter: `Source :${action.payload}`,
              filteredPokemons: filteredBySource
          }
      case ORDER_BY_ATTACK:
          let filteredByAttack;
          
          if (action.payload === "ASC") {
              filteredByAttack = state.filteredPokemons.sort((a,b) => a.attack - b.attack)
          } else if (action.payload === "DESC") {
              filteredByAttack = state.filteredPokemons.sort((a,b) => b.attack- a.attack)
            } else {
              filteredByAttack = state.pokemons;
          }
          return {
              ...state,
              activeFilter: `Attack :${action.payload}`,
              filteredPokemons: filteredByAttack
          }
      case FILTER_BY_TYPE:
          let filteredByTypes;
          let filter = action.payload;
          filter === "All" ? 
          filteredByTypes = state.pokemons
          : filteredByTypes = state.pokemons.filter(pokemon => pokemon.types?.includes(filter));
          return {
              ...state,
              activeFilter: `Type :${action.payload}`,
              filteredPokemons: filteredByTypes
          }
      case SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.payload
        }
      default:
          return state;
  }
}

export default reducer;