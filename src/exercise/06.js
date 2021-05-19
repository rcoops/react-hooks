// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)

  const getPokemon = React.useCallback(async (pokemonName) => {
    try {
      return await fetchPokemon(pokemonName)
    } catch (e) {
      console.log(e)
    }
  }, [])

  React.useEffect(() => {
    (async () => {
      if (pokemonName) {
        setPokemon(await getPokemon(pokemonName))
      }
    })()
  }, [pokemonName, setPokemon, getPokemon])
  
  
  
  
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  return (
    pokemonName ? (pokemon ? <PokemonDataView pokemon={pokemon} /> : <PokemonInfoFallback name={pokemonName} />) : 'Submit a pokemon'
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
